import { Response,Request, NextFunction } from "express";
import { statusCode } from "../utils/helper";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_TOKEN:string|undefined = process.env.JWT_SECRET

if (!JWT_TOKEN) {
    console.error('JWT_TOKEN environment variable is not set.');
    process.exit(1)
}


export const middleware=(req:Request,res:Response,next:NextFunction)=>{

    let token = req.headers.authorization;

    if(!token){
        return res.status(statusCode.FORBIDDEN).json({message:"Unauthorized"});
    }
    token = token.split(" ")[1];
    
     try{

        const decodedPayload = jwt.verify(token, JWT_TOKEN) as JwtPayload;
        const userId: string = decodedPayload.userId;

        if(userId)
        {
            (req as any).userId = userId;
            next()
        }
        else
        return res.status(statusCode.FORBIDDEN).json({message:"Unauthorized"});
     }
     catch{
        return res.status(statusCode.FORBIDDEN).json({message:"Unauthorized"});
     }
}