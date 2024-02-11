import clientPromise from '../../lib/mongodb'

export default async (req, res) => {
    try {

        const client = await clientPromise;
        const db = client.db("Moondust");
        const { 
            email,
            password,
            role,
            username,
            name
        } = req.body;

        const post = await db.collection("User").insertOne({
            email,
            password,
            role,
            username,
            name
        })

        res.json(post);

    } catch(e) {
        console.error(e);
        throw new Error(e).message;
    }
}