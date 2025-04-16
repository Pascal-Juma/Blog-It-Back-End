import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const client = new PrismaClient();

export const register = async (req, res) => {
    const { firstName, lastName, emailAddress, username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try{
        const newUser = await client.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                username,
                password: hashedPassword
            }
        })
        res.status(201).json({ message: "User created successfully", newUser});
    }catch(e){
        res.status(500).json({
            message: "Something went wrong. Please try again later"
        })
    }
}

export const signin =  async (req, res) => {
    try{
        const {identifier, password} = req.body;
        const user = await client.user.findFirst({
            where: {
                OR: [{emailAddress: identifier},
                    {username: identifier},
                ]
            }
        })

        if(!user){
            return res.status(401).json({
                message: "Wrong signin Credentials"
            })
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(401).json({
                message: "Wrong signin Credentials"
            })
        }
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        res.status(200).cookie("Token", token,{
            httpOnly: true,
            secure: true,
            sameSite: 'None'
          }).json({ id: user.id,
            firstName: user.firstName, lastName: user.lastName, createdAt: user.createdAt
        })
    }catch(e){
        res.status(500).json({
            message: "Something went wrong. Please try again later"
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await client.user.findFirst({
            where: { id: userId },
        });
        if (user) {
            return res.status(200).json(user);
        }
        res.status(404).json({ message: "User not found" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, emailAddress, username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const updatedUser = await client.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                emailAddress,
                username,
                password: hashedPassword
            }
        });

        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong. Please try again later" });
    }
};

