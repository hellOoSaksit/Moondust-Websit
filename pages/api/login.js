import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("Moondust");
        const { username } = req.body;
    
        const account = await db.collection("User").findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });
    
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
    
}