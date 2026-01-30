import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const DAILY_LIMIT = 2000;

export async function checkRateLimit(): Promise<{ success: boolean; host?: string }> {
    const date = new Date().toISOString().split('T')[0];
    const key = `weather_api_usage:${date}`;

    try {
        const currentUsage = await redis.incr(key);

        if (currentUsage === 1) {
            await redis.expire(key, 86400);
        }

        if (currentUsage > DAILY_LIMIT) {
            return { success: false };
        }

        return { success: true };
    } catch (error) {
        console.error('Redis Rate Limit Error:', error);
        return { success: false };
    }
}
