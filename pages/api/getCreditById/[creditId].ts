import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const id = req.query.creditId as string;
        const Credits = await prisma.credit.findUnique({
            where: {
                credit_id: Number(id)
            }
        })
        return res.json(Credits);

    }
)
export default handler;