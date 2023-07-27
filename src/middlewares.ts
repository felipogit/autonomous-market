import { NextFunction, Request, Response } from "express";
import markt from "./database";
import { Product } from "./interfaces";

const nameExists = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { name } = req.body;
    if(!name) return next();

    const foundProduct: Product | undefined = markt.find(
        (p: Product): boolean => p.name === name
        )
    
    if(foundProduct){
        return res.status(409).json({message: "Product already registered."})
    }

    return next()
}

const idExists = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const productIndex: number = markt.findIndex(
        (v: Product): boolean => v.id === Number(id)
        );

    if(productIndex === -1){
        return res.status(404).json({message: "Product not found."})
    }

    return next()
}

export default { nameExists, idExists }