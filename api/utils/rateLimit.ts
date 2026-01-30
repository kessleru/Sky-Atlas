import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const DAILY_LIMIT = 2000;

export async function checkRateLimit(): Promise<{ success: boolean; host?: string }> {
    const date = new Date().toISOString().split('T')[0];
    const key = `weather_api_usage:${date}`;

    try {
        const currentUsage = await redis.incr(key);

        // Set expiration for 24 hours to keep Redis clean
        if (currentUsage === 1) {
            await redis.expire(key, 86400);
        }

        if (currentUsage > DAILY_LIMIT) {
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Redis Rate Limit Error:', error);
        // Fail open if Redis is down, or fail closed? 
        // Usually fail open for reliability unless cost is critical. 
        // Given the user wants to avoid card charges, let's fail closed or log heavily.
        // But for a simple usage, returning true (allow) might be safer for UX if Redis fails.
        // However, the prompt specifically says "nao descontar do meu cartao" (don't charge my card),
        // so we should probably prioritize blocking if we can't be sure.
        // But if Redis keys aren't set, this will throw.
        return { success: false };
    }
}
