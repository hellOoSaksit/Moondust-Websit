import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
    try {

        const client = await clientPromise;
        const db = client.db("Moondust");
        const { title, content } = req.body;

        const post = await db.collection("Posts").insertOne({
            title,
            content
        })

        res.json(post);

    } catch(e) {
        console.error(e);
        throw new Error(e).message;
    }
}