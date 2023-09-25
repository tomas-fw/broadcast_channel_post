// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { setCookie } from '@/lib/setCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            setCookie(res, 'token', '');
            res.status(200).json({ success: true });
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
