import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {

        const { from,
            to, credit_Id, amount } = req.body;
        const Request = await prisma.request.create({
            data: {
                From: from,
                To: to,
                Credit_Id: Number(credit_Id),
                amount: Number(amount),
            }
        })


        return res.json(Request);



    }
)
export default handler;