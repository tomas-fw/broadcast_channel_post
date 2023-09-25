import { NextApiResponse } from 'next';

export const setCookie = (res: NextApiResponse, name: string, value: string, options = {}) => {
    const isProduction = process.env.NODE_ENV === 'production';

    const defaultOptions = {
        path: '/',
        expires: value ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) : new Date(0),
        // uncomment once we move all api calls to server side
        // httponly: true,
        secure: isProduction ? true : undefined,
        sameSite: isProduction ? 'none' : undefined,
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const formattedOptions = Object.entries(mergedOptions)
        .filter(([, val]) => val !== undefined)
        .map(([key, val]) => `${key}=${val}`)
        .join('; ');

    const cookie = `${name}=${value}; ${formattedOptions}`;

    res.setHeader('Set-Cookie', cookie);
};
