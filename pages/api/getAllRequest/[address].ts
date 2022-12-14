import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const address = req.query.address as string;
        const Requests = await prisma.request.findMany({
            where: {
                To: address,
                status: "pending"
            }
        })
        return res.json(Requests);

    }
)
export default handler;