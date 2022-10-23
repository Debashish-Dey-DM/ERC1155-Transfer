import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {

        const { name,
            description,
            amount,
            newAddress
        } = req.body;
        const credit = await prisma.credit.create({
            data: {
                name: name,
                description: description,
                amount: Number(amount),
                image: "test",
            }
        })
        const getUser = await prisma.user.findFirst({
            where: {
                address: newAddress
            }
        })
        const credits = await prisma.credit.findMany();
        const credLength = credits.length;
        const creditId = credits[credLength - 1].credit_id;

        const useeToCredit = await prisma.userToCredit.create({
            data: {
                credit_id: creditId,
                user_id: getUser?.user_id ?? 0,
                amount: Number(amount)
            }
        })

        return res.json(useeToCredit);


    }
)
export default handler;