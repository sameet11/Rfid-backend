import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RfidSchema } from '../types';
const prisma = new PrismaClient();

export const AddRfid = async (req: Request, res: Response) => {
    try {
        const { rfidID, productID } = req.body;
        const { success } = RfidSchema.safeParse(req.body);
        if (!success) {
            return res.status(404).json(
                { error: "Invlid input" }
            )
        }

        const Rfid = await prisma.rfid.create({
            data: {
                product_id: productID,
                id: rfidID,
            }
        })

        if (Rfid) {
            res.status(200).json(Rfid);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export const Getproductdetails = async (req: Request, res: Response) => {
    try {
        const { rfidID } = req.body;
        if (typeof (rfidID) != 'string') {
            return res.status(404).json(
                { error: "Invlid input" }
            )
        }

        const rfid = await prisma.rfid.findFirst({
            where: {
                id: rfidID,
            }
        })
        if (rfid) {
            const product = await prisma.product.findFirst({
                where: {
                    id: rfid.product_id,
                }
            })
            if (product) {
                res.status(200).json(product);
            }
        }
    }
    catch (error) {
        res.status(500).json({
            error: "internal server error"
        })
    }
}
export const Updatepayment = async (req: Request, res: Response) => {
    try {
        const rfidID = req.query.rfidID;
        if (typeof (rfidID) != 'string') {
            return res.status(404).json(
                { error: "Invlid input" }
            )
        }
        const rfid = await prisma.rfid.update({
            where: {
                id: rfidID,
            },
            data: {
                payment_status: true
            }
        })
        if (rfid) {
            return res.status(200).json({ msg: "payment successfull" });
        }
    } catch (error) {
        res.status(500).json({
            error: "internal server error"
        })
    }
}
export const Paymentstatus = async (req: Request, res: Response) => {
    try {
        const rfidID = req.query.rfidID;
        if (typeof (rfidID) != 'string') {
            return res.status(404).json(
                { error: "Invlid input" }
            )
        }

        const rfid = await prisma.rfid.findFirst({
            where: {
                id: rfidID,
            }
        })
        if (rfid) {
            if (rfid.payment_status === true) {
                res.status(200).json({ msg: "payment done" });
            }
            else {
                res.status(200).json({ msg: "payment not done" });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: "internal server error"
        })
    }
}