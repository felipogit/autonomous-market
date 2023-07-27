import { Request, Response } from "express";
import { Product } from "./interfaces";
import markt from "./database";

const create = (req: Request, res: Response): Response => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
   
    const newProduct: Product = {
        ...req.body,
        id: markt.length + 1,
        expirationDate
    };

    markt.push(newProduct);

    return res.status(201).json(newProduct);
};

const read = (req: Request, res: Response): Response => {
    const total = markt.reduce((prev: number, ac: Product): number => {
        return  prev + ac.price
    },0 )
    return res.status(200).json({ total: total, products:markt });
}

const retrieve = (req: Request, res: Response): Response => {
    const foundProduct: Product | undefined = markt.find(
        (s: Product): boolean => s.id === Number(req.params.id)
    )

    if (!foundProduct) {
        return res.status(404).json({ error: "Product not found" })
    }

    return res.status(200).json(foundProduct)
}

const destroy = (req: Request, res: Response): Response => {
    const { id } = req.params;
    const productIndex: number = markt.findIndex(
        (v: Product): boolean => v.id === Number(id)
        )
    
        if(productIndex === -1) {
            return res.status(404).json({message: "Product not found."})
        }

        markt.splice(productIndex, 1)

    return res.status(204).json()
}

const partialUpdate = (req: Request, res: Response): Response => {
    const { id } = req.params;
    const productIndex: number = markt.findIndex(
        (v: Product): boolean => v.id === Number(id)
        );
    
    const updateProduct = (markt[productIndex] = {
        ...markt[productIndex],
        ...req.body,
    })

    return res.status(200).json(updateProduct)
}




export default { create, read, retrieve, destroy, partialUpdate };