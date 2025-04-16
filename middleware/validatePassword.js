import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
        
const client = new PrismaClient();
        
async function validatePassword(req, res, next) {
    const { oldpass} = req.body; 

    if (!oldpass) {
        return res.status(400).json({ message: "Old password is required to proceed." });
    }

    try {
        const userId = req.user.id;
        const user = await client.user.findFirst({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(oldpass, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}

export default validatePassword;