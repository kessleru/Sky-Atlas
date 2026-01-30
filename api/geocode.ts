import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit } from './utils/rateLimit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Missing query parameter (q)' });
    }

    const limitCheck = await checkRateLimit();
    if (!limitCheck.success) {
        return res.status(429).json({ error: 'Daily API limit reached' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${apiKey}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();
        res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // Cache geocoding for a day
        return res.status(200).json(data);
    } catch (error) {
        console.error('Geocode API Error:', error);
        return res.status(500).json({ error: 'Failed to fetch geocode data' });
    }
}
