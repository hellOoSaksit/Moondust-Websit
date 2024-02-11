import React , {useState} from "react";
import type { GetStaticPropsContext , GetStaticPropsResult} from 'next'


type PageParams = {
    id : String;
}
type ContentPageProps = {
    post: Post;
}

type Post = {
    _id : String;
    email : String;
    password : String;
    role : String;
    username : String;
    name: String;
}

type ResponseFromServer = {
    _id : String;
    email : String;
    password : String;
    role : String;
    username : String;
    name: String;
}

export async function getStaticProps({
    params
}: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {

        let response = await fetch("http://localhost:3000/api/getAccount_ID?id=" + params?.id)

        let responseFromServer: ResponseFromServer = await response.json()
        return{
            props:{
                post:{  
                        _id: responseFromServer._id,
                        email: responseFromServer.email,
                        password: responseFromServer.password,
                        role: responseFromServer.role,
                        username: responseFromServer.username,
                        name: responseFromServer.name
                    }
            }
        }
    } catch(error) {
        console.log("error" , error);
        return{
            props: {
                post: {
                    _id : "",
                    email : "",
                    password : "",
                    role : "",
                    username : "",
                    name: "",
                }
            }
        }
    }
}

export async function getStaticPaths() {
    let posts = await fetch("http://localhost:3000/api/getAccount");

    let postFromServer: [Post] = await posts.json();

    return {
        paths: postFromServer.map((post) => {
            return {
                params: {
                    id: post._id
                }
            }
        }),
        fallback: false
    }
}

export default function EditPosts({
    post: {
        _id,email,password,role,username,name
    }
}){

    const [postEmail, setpostEmail] = useState(email);
    const [postPassword, setpostPassword] = useState(password);
    const [postRole, setpostRole] = useState(role);
    const [postUsername, setpostUsername] = useState(username);
    const [postName, setpostName] = useState(name);
    const [postNotification, setpostNotification] = useState("");

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        if (postEmail&&postName&&postPassword&&postRole&&postUsername){
           try {
            let response = await fetch("http://localhost:3000/api/editAccount?id=" + _id,{
                method : "POST",
                body: JSON.stringify({
                    email : postEmail,
                    password : postPassword,
                    role : postRole,
                    username : postUsername,
                    name : postName,
                }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
            response = await response.json();
            console.log(postEmail);
            
            setpostEmail("");
            setpostPassword("");
            setpostRole("");
            setpostUsername("");
            setpostName("");
            setpostNotification("SS");
           } catch (errorMessage : any) {
                setpostNotification(errorMessage)
           }
        }else{
            return setpostNotification("All fields are required!");
        }
    }

    return(
        <form className="flex justify-center items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            {postNotification && <div>{postNotification}</div>}
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                <label htmlFor="title" className="flex justify-center items-center font-bold text-xl py-1">Account Management</label>
                <label htmlFor="title" className="flex justify-center items-center font-bold text-xl py-1">Edit Mode</label>
                <div className="flex justify-center items-center">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={postEmail ? postEmail : ""}
                        onChange={(e) => setpostEmail(e.target.value)}
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-center items-center py-3">
                    <input
                        type="text"
                        placeholder="UserName"
                        name="username"
                        value={postUsername ? postUsername : ""}
                        onChange={(e) => setpostUsername(e.target.value)}
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-center items-center">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={postPassword ? postPassword : ""}
                        onChange={(e) => setpostPassword(e.target.value)}
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="flex justify-center items-center py-3">
                    <input
                        type="text"
                        placeholder='Name EX:"Mr:Admin"'
                        name="name"
                        value={postName ? postName :""}
                        onChange={(e) => setpostName(e.target.value)}
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={postRole ? postRole : postRole}
                    onChange={(e) => setpostRole(e.target.value)}
                >
                    <option value="Member">Member</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                </select>

                <div className="py-3 flex justify-center items-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Edit Account
                    </button>
                </div>
            </div>
        </div>
    </form>
    );
}