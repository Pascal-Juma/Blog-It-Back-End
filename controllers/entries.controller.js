import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createEntry = async (req, res) => {
    try{
    const authorId = req.user.id;
    const { title, description, content } = req.body;
    const newEntry = await client.entry.create({
        data: {
            title, description, content, authorId
        }
    })
    res.status(201).json(newEntry);
    }catch(e){
        console.log(e)
        res.status(500).json({ message: "Something went wrong. Please try again later"})
    }
} 

export const getEntry = async (req, res) => {
    try{
        const authorId = req.user.id;
        const { entryId }= req.params;
        const entry = await client.entry.findFirst({
            where: {
                authorId, id: entryId, isDeleted: false
            }
        })
        if(entry){
            return res.status(200).json(entry);
        }
        res.status(404).json({ message: "Blog not found"})
    }catch(e){
        res.status(500).json({ message: "Something went wrong. Please try again later"})
    }
}

export const viewBlogs = async (req, res) => {
    try{
        const authorId = req.user.id;
        const entries = await client.entry.findMany({
            where: {
                AND: [{ authorId }, { isDeleted: false}]
            }
        })
        res.status(200).json(entries)
    }catch(e){
        res.status(500).json({ message: "Something went wrong. Please try again later"})
    }
}

export const updateBlog = async (req, res) => {
    try{
        const authorId = req.user.id;
        const { entryId }= req.params;
        const { title, description, content } = req.body;
        const updatedBlog = await client.entry.update({
            where: {
                authorId, id: entryId
            },
            data: {
                title, description, content
            }
        })
        res.status(200).json({ message: "Blog updated successfully", updatedBlog});
    }catch(e){
        res.status(500).json({ message: "Something went wrong. Please try again later"})
    }
}

export const deleteBlog = async (req, res) => {
    try{
        const authorId = req.user.id;
        const { entryId }= req.params;
        await client.entry.update({
            where: {
                authorId, id: entryId
            },
            data: {
                isDeleted: true
            }
        })
        res.status(200).json({ message: "Blog deleted successfully"});
    }catch(e){
        res.status(500).json({ message: "Something went wrong. Please try again later"})
    }
}