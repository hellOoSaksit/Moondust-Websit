import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req,res) =>{
    try{
        const client = await clientPromise;
        const db = client.db("Moondust");
        const { id } = req.query;
        const {email,password,role,username,name} = req.body;
        const post = await db.collection("User").updateOne({
            _id: ObjectId(id)
        },
        {
            $set: {
                email : email,
                password : password,
                role : role,
                username : username,
                name : name,
            }
        }
    )
        res.json(post);
    }catch(error){
        console.error(error);
        throw new Error(erro).message;
    }}