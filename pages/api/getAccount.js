import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Moondust");

        const posts = await db.collection("User").find({}).toArray();

        res.json(posts);
    } catch (error) {
        console.error(error);
        throw new Error(error).message;
    }
}
