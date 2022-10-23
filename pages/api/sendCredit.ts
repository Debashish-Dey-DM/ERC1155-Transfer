import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {

        const { from,
            to, credit_Id, amount, id } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                address: from
            }
        })
        const Request = await prisma.request.update({
            where: {
                request_id: Number(id)
            },
            data: {
                status: "Transfered",
            }
        })
        const prevCredit = await prisma.credit.findUnique({
            where: {
                credit_id: Number(credit_Id)

            }
        })
        const updatedAmount = prevCredit?.amount - amount;
        const Credit = await prisma.credit.update({
            where: {
                credit_id: Number(credit_Id)
            },
            data: {
                amount: updatedAmount
            }
        })
        const UserToCredit = await prisma.userToCredit.findFirst({
            where: {
                // user_id: user?.user_id,
                // credit_id: Number(credit_Id)
                AND: [
                    {
                        user_id: user?.user_id
                    },
                    {
                        credit_id: Number(credit_Id)
                    }
                ]
            },
            // data: {
            //     amount: updatedAmount
            // }

        })
        const UpdateUserToCredit = await prisma.userToCredit.update({
            where: {
                id: UserToCredit?.id
            },
            data: {
                amount: updatedAmount
            }

        })

        await prisma.addressToCredit.create({
            data: {
                credit_id: Number(credit_Id),
                address: from,
                amount: Number(amount)
            }
        })

        return res.json({
            from,
            to, credit_Id, amount, id, UserToCredit
        });



    }
)
export default handler;