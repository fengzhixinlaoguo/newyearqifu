// AI API调用模块 (Streaming Support)

async function streamFortuneAI(wish, fortuneData, callbacks) {
    const { onContent, onDone, onError } = callbacks;
    console.log('[AI-API] Starting stream request...', { wish, fortuneData });

    try {
        const response = await fetch('/api/fortune', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wish,
                fortuneData
            })
        });

        console.log('[AI-API] Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            // console.log('[AI-API] Received chunk:', chunk.length, 'bytes');
            buffer += chunk;

            const lines = buffer.split('\n\n');
            buffer = lines.pop(); // 保留最后一个可能不完整的块

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith(':')) continue; // Skip heartbeats

                if (trimmed.startsWith('data: ')) {
                    const dataStr = trimmed.slice(6);
                    if (dataStr === '[DONE]') {
                        console.log('[AI-API] Stream done');
                        if (onDone) onDone();
                        return;
                    }

                    try {
                        const data = JSON.parse(dataStr);
                        if (data.type === 'ai_content') {
                            if (onContent) onContent(data.content);
                        }
                    } catch (e) {
                        console.warn('[AI-API] Parse error:', e, dataStr);
                    }
                }
            }
        }
    } catch (error) {
        console.error('[AI-API] Stream error:', error);
        if (onError) onError(error);
    }
}
