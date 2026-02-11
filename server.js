try { require('dotenv').config(); } catch (e) { }
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // 提供静态文件

// ⚠️ 重要:API key存储在环境变量中,不要提交到Git
// 智谱 AI GLM-4-Flash 免费模型配置
const API_KEY = process.env.ZHIPU_API_KEY || 'your-zhipu-api-key-here';
const API_ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const MODEL = 'GLM-4-Flash';

if (process.env.ZHIPU_API_KEY) {
    console.log('✅  成功: 已从环境变量加载智谱 API Key');
    console.log('🔑 API_KEY:', API_KEY.slice(0, 8) + '******' + API_KEY.slice(-6));
    console.log('🤖 使用模型: GLM-4-Flash (免费)');
} else if (API_KEY === 'your-zhipu-api-key-here') {
    console.error('⚠️  错误: 智谱 API Key 未配置！');
    console.error('📝 请按以下步骤配置:');
    console.error('   1. 访问 https://open.bigmodel.cn/ 注册并获取 API Key');
    console.error('   2. 编辑 .env 文件，设置 ZHIPU_API_KEY=你的API Key');
    console.error('   3. 重新启动服务器');
}

// 灵签数据库
const fortunes = {
    '上上签': [
        { poem: '春来花发映阳台，万里书香自此开', meaning: '龙腾虎跃上云霄' },
        { poem: '彩凤呈祥瑞气浓，龙飞凤舞乐融融', meaning: '一举成名在其中' }
    ],
    '上吉签': [
        { poem: '根深叶茂花发时，春来万物尽相宜', meaning: '万里书香在其中' },
        { poem: '一举成名在其中，龙腾虎跃上云霄', meaning: '春来花发映阳台' }
    ],
    '中吉签': [
        { poem: '提携叶茂待春风，一举成名在其中', meaning: '龙腾虎跃上云霄' },
        { poem: '根深叶茂花发时，春来万物尽相宜', meaning: '万里书香在其中' }
    ]
};

// Puppeteer 浏览器实例池
let browser;

async function getBrowser() {
    if (!browser) {
        console.log('启动 Puppeteer 浏览器...');
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
    }
    return browser;
}

// API路由: 生成分享图片
app.post('/api/render-card', async (req, res) => {
    try {
        const { level, poem, wish, analysis } = req.body;

        console.log('收到渲染请求:', { level, poem, wish });

        if (!level || !poem || !wish) {
            console.error('缺少必要参数');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const poemLines = poem.split('|');
        const poem1 = poemLines[0] || '';
        const poem2 = poemLines[1] || '';

        const browser = await getBrowser();
        const page = await browser.newPage();

        // 监听浏览器日志
        page.on('console', msg => console.log('Browser Console:', msg.text()));
        page.on('pageerror', err => console.error('Browser Error:', err));

        // 设置视口
        await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 });

        // 加载模板 content
        const templatePath = path.join(__dirname, 'render.html');
        console.log(`Loading template content from: ${templatePath}`);
        const templateContent = fs.readFileSync(templatePath, 'utf-8');

        // 使用 setContent 注入 HTML
        // timeout 60s, waitUntil networkidle0
        await page.setContent(templateContent, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        console.log('模板加载完毕,注入数据...');

        // 注入数据并等待字体加载
        await page.evaluate(async (data) => {
            if (typeof renderData === 'function') {
                renderData(data);
                // 显式等待字体加载
                await document.fonts.ready;
                console.log('数据注入成功且字体已加载');
            } else {
                console.error('renderData function not found!');
                throw new Error('renderData not found');
            }
        }, { level, poem1, poem2, wish, analysis });

        console.log('等待渲染完成标记...');
        await page.waitForSelector('.render-complete', { timeout: 30000 });

        // 额外延迟确保渲染稳定
        await new Promise(r => setTimeout(r, 500));

        // 截图
        console.log('开始截图...');
        const element = await page.$('#render-container');
        if (!element) {
            throw new Error('#render-container not found');
        }

        const imageBuffer = await element.screenshot({ type: 'png' });
        console.log('截图完成');

        await page.close();

        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);

    } catch (error) {
        console.error('图片生成失败:', error);
        res.status(500).json({ error: 'Image generation failed', details: error.message });

        // 异常处理: 重启浏览器
        if (browser) {
            try { await browser.close(); } catch (e) { }
            browser = null;
        }
    }
});

// API路由: 生成灵签 (流式响应)
app.post('/api/fortune', async (req, res) => {
    try {
        const { wish } = req.body;

        if (!wish || wish.trim().length === 0) {
            return res.status(400).json({ error: '请输入您的愿望' });
        }

        // 1. 获取灵签信息 (优先使用前端传来的,否则随机)
        let fortuneData = req.body.fortuneData;

        if (!fortuneData) {
            // 后端随机生成(兼容旧逻辑)
            const levels = Object.keys(fortunes);
            const randomLevel = levels[Math.floor(Math.random() * levels.length)];
            const levelFortunes = fortunes[randomLevel];
            const fortune = levelFortunes[Math.floor(Math.random() * levelFortunes.length)];

            fortuneData = {
                level: randomLevel,
                poem: fortune.poem,
                meaning: fortune.meaning
            };
        }

        // 准备SSE头部
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 禁用 Nagle 算法,确保立即发送
        if (req.socket && req.socket.setNoDelay) {
            req.socket.setNoDelay(true);
        }
        res.flushHeaders?.(); // 尝试立即发送头部

        // 立即发送心跳包
        res.write(': ping\n\n');

        // 2. 调用AI生成解析 (Stream Mode)
        const systemPrompt = `你是一位国学大师。请根据用户愿望和签文进行解读。
请按以下格式输出(不要使用Markdown,不要输出JSON):

【简短寄语】
(这里写40字以内的精辟解读,适合印在海报上)

【详细解签】
(这里写200字左右的详细解读,包含运势分析、五行建议和开运指南,语气温暖诚恳)`;

        const userPrompt = `愿望:${wish}\n签文:${fortuneData.level} - ${fortuneData.poem}\n${fortuneData.meaning}`;

        console.log(`[${new Date().toISOString()}] Calling AI stream...`);
        const aiResponse = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                stream: true, // 开启流式
                temperature: 0.8
            })
        });

        if (!aiResponse.ok) {
            throw new Error(`AI API 调用失败: ${aiResponse.status}`);
        }

        console.log(`[${new Date().toISOString()}] AI Stream started`);

        const decoder = new TextDecoder("utf-8");
        let buffer = '';

        // 使用 for await 直接遍历流
        for await (const chunk of aiResponse.body) {
            // console.log(`[${new Date().toISOString()}] Received chunk size: ${chunk.length}`);

            const textChunk = decoder.decode(chunk, { stream: true });
            buffer += textChunk;

            const lines = buffer.split('\n');
            buffer = lines.pop(); // 保留不完整的末尾

            let hasSentData = false;
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || trimmed === 'data: [DONE]') continue;

                if (trimmed.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(trimmed.slice(6));
                        const content = data.choices[0]?.delta?.content || '';
                        if (content) {
                            const streamMessage = JSON.stringify({
                                type: 'ai_content',
                                content: content
                            });
                            res.write(`data: ${streamMessage}\n\n`);
                            hasSentData = true;
                        }
                    } catch (e) {
                        // ignore
                    }
                }
            }

            // 如果这一轮有数据发送,强制刷新
            if (hasSentData && res.flush) {
                res.flush();
            }
        }

        // 处理剩余 buffer
        if (buffer.trim()) {
            // 通常剩余的都是不完整的或者结束标记,暂时忽略
        }

        res.write('data: [DONE]\n\n');
        res.end();
        console.log(`[${new Date().toISOString()}] Stream finished`);

    } catch (error) {
        console.error('生成灵签失败:', error);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: '生成灵签失败,请稍后重试'
            });
        } else {
            console.error('Error after headers sent:', error.message);
            res.end();
        }
    }
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
const server = app.listen(PORT, () => {
    console.log(`✅ 祈福服务已启动: http://localhost:${PORT}`);
    console.log(`📝 祈福功能: 访问浏览器打开上方地址即可使用`);
});

// 优雅退出
process.on('SIGINT', async () => {
    if (browser) {
        console.log('关闭 Puppeteer...');
        await browser.close();
    }
    server.close(() => {
        console.log('服务器已停止');
        process.exit(0);
    });
});
