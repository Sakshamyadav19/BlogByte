import express,{ Router,Request,Response} from 'express'
import { middleware } from '../middleware/Middleware'
import { PrismaClient } from '@prisma/client'
import { statusCode } from '../utils/helper'
const prisma = new PrismaClient()

const blogRouter:Router=express.Router()





export  default blogRouter


/*

post blog
get blog
get all blogs
update blog
 */


