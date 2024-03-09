import express,{Router} from 'express'
import zod from 'zod';
import {PrismaClient} from '@prisma/client'
import { statusCode } from '../utils/helper';
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient();

const authRouter:Router=express.Router()
const JWT_TOKEN:string|undefined = process.env.JWT_SECRET

if (!JWT_TOKEN) {
    console.error('JWT_TOKEN environment variable is not set.');
    process.exit(1)
}

const signUpValidate = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
})
const signinValidate = zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})

type User = {id:number}& zod.infer<typeof signUpValidate>


authRouter.post("/signup",async(req,res)=>{

    const {success}=signUpValidate.safeParse(req.body);

    const user: User | null = await prisma.user.findUnique({
        where: { email: req.body.email },
    });

    if(user){
        return res.status(statusCode.UNAUTHORIZED).json({message:'User already exists'})
    }

    if(success){

        try{

            const newUser:User=await prisma.user.create({
                data:req.body
            })
            
            const token:String = jwt.sign({userId:newUser.id},JWT_TOKEN)

            return res.status(statusCode.OK).json({token:token});
        }
        catch{
            return res.status(statusCode.BAD_REQUEST).json({meassage:"Account creation failed"})
        }
    }

    return res.status(statusCode.BAD_REQUEST).json({message:"Invalid inputs"})

})

authRouter.post('/signin',async(req,res)=>{
    const {success}=signinValidate.safeParse(req.body);

    const user: User | null = await prisma.user.findUnique({
        where: { email: req.body.email },
    });
    if(success){
        if(user){
            const token:String = jwt.sign({userId:user.id},JWT_TOKEN)
            return res.status(statusCode.OK).json({token:token});
        }
        else{
            return res.status(statusCode.BAD_REQUEST).json({meassage:"Invalid Creds"})
        }
    }

    return res.status(statusCode.BAD_REQUEST).json({message:"Invalid inputs"})

})



export  default authRouter