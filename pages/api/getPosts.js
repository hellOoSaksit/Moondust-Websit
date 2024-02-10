import clientPromise from "../../lib/mongodb";

export default async (req,res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Moondust");

        const posts = await db.collection("Posts").find({}).limit(20).toArray();

        res.json(posts);
    } catch (error) {
        console.erro(error);
        throw new Error(error).message;
    }
}