// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { setCookie } from '@/lib/setCookie';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    data: {
        email: string;
        id: string;
        name: string;
    };
    success: boolean;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            setCookie(res, 'token', '123');
            res.status(200).json({
                success: true,
                data: { email: 'johndoe@email.com', id: '123', name: 'John Doe' },
            });
            break;
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
