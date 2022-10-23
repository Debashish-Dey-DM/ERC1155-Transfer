import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const id = req.query.id as string;
        const userToCredits = await prisma.userToCredit.findMany({
            where: {
                credit_id: Number(id)
            }
        })
        return res.json(userToCredits);

    }
)
export default handler;