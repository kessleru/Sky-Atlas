import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkRateLimit } from './utils/rateLimit.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Missing lat or lon parameters' });
    }

    const limitCheck = await checkRateLimit();
    if (!limitCheck.success) {
        return res.status(429).json({ error: 'Daily API limit reached' });
    }

    // Debug logging
    console.log('API Key Check (Weather):', {
        OPENWEATHER: process.env.OPENWEATHER_API_KEY ? 'Set' : 'Unset',
        VITE: process.env.VITE_API_KEY ? 'Set' : 'Unset'
    });

    const apiKey = process.env.OPENWEATHER_API_KEY || process.env.VITE_API_KEY;
    if (!apiKey) {
        console.error('Server configuration error: Missing API Key');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // Forward the request to OpenWeatherMap
        const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&lang=pt_br&appid=${apiKey}`
        );

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        const data = await response.json();

        // Cache control to save even more requests? 
        // OpenWeather recommends 10 mins usually.
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');

        return res.status(200).json(data);
    } catch (error) {
        console.error('Weather API Error:', error);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
