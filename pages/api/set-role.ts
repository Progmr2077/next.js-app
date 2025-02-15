import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { role } = req.query;

    res.setHeader('Set-Cookie', serialize('role', String(role), { path: '/' }));
    res.end(`Role set to ${role}`);
}