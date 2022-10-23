import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../lib/prisma";
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.post(
    async (req, res) => {

        const { name,
            description,
            address,
            type } = req.body;
        const organization = await prisma.user.create({
            data: {
                name: name,
                description: description,
                address: address,
                type: type

            }
        })
        
        
        return res.json(organization);



    }
)
export default handler;