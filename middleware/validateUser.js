import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function validateUser(req, res, next) {
    const { emailAddress, username } = req.body;
    try{
        const emailExists = await client.user.findFirst({
            where: {
                emailAddress
            }
        })
        if(emailExists){
            return res.status(400).json({
                message: "Email Address already taken"
            })
        }
        const usernameExists = await client.user.findFirst({
            where: {
                username
            }
        })
        if(usernameExists){
            return res.status(400).json({
                message: "The username is already taken"
            })
        }
        next();
    }catch(e){
        res.status(500).json({
            message: "Something went wrong. Please try again later"
        })
    }
}
export default validateUser;