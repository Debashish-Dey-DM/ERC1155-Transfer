import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const account = req.query.account as string;
        const Credits = await prisma.addressToCredit.findMany({
            where: {
                address: account
            }
        })
        return res.json(Credits);

    }
)
export default handler;