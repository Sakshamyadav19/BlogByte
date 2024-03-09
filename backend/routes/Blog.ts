import express,{ Router,Request,Response} from 'express'
import { middleware } from '../middleware/Middleware'
import { PrismaClient } from '@prisma/client'
import { statusCode } from '../utils/helper'
const prisma = new PrismaClient()

const blogRouter:Router=express.Router()

interface CustomRequest extends Request {
    userId?: number|undefined; // Add userId property as optional
  }
  

interface Blog{
    id:Number
    title:String,
    description:String,
    userId:Number
}


blogRouter.post('/create',middleware,async(req:CustomRequest,res:Response)=>{
    try{
        if (req.userId === undefined) {
            // Handle the case where userId is undefined
            return res.status(statusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
          }

        const newBlog:Blog=await prisma.blog.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                userId: req.userId,
            }
        })
        res.status(statusCode.OK).json({message:"Blog Created",blogId:newBlog.id})
    }
    catch{
        res.status(statusCode.BAD_REQUEST).json({message:"Upload Failed"})
    }

})

blogRouter.get('/allblogs',middleware,async(req:CustomRequest,res:Response)=>{
    try{
        const blogsWithUsers = await prisma.blog.findMany({
            include: {
              author: {
                select: {
                    name: true,
                    email: true,
                  },
              }, // Include the associated user information
            },
          });
          res.json({blogs:blogsWithUsers})
    }
    catch{
        res.status(statusCode.BAD_REQUEST).json({message:"Try Again Later"})
    }
})

blogRouter.get('/userblogs',middleware,async(req:CustomRequest,res:Response)=>{
    try{
        const blogsWithUsers = await prisma.blog.findMany({
            where:{userId:req.userId},
            include: {
              author: {
                select: {
                    name: true,
                    email: true,
                  },
              }, // Include the associated user information
            },
          });
          res.json({blogs:blogsWithUsers})
    }
    catch{
        res.status(statusCode.BAD_REQUEST).json({message:"Try Again Later"})
    }
})

blogRouter.get('/getblog',middleware,async(req:CustomRequest,res:Response)=>{
    const blogId:number=Number(req.query.id);

    try{
        const blog = await prisma.blog.findUnique({
            where:{id:blogId}
        })

       res.json({blog:blog})
    }
    catch{
        res.status(statusCode.BAD_REQUEST).json({message:"Try Again Later"})
    }
})




export  default blogRouter


/*

post blog
get blog
get all blogs
update blog
 */


