import { Request, Response } from 'express';
import { PrismaClient, Product } from '@prisma/client';
import { Productschema } from '../types';
const prisma = new PrismaClient();

export const Createprod = async (req: Request, res: Response) => {
    try {
        const { success } = Productschema.safeParse(req.body)
        if (!success) {
            return res.status(404).json({
                error: "Inavlid output type",
            })
        }
        const { name, price } = req.body;
        const createdProduct: Product = await prisma.product.create({
            data: {
                name: name,
                price: price,
            },
        });

        res.status(200).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};