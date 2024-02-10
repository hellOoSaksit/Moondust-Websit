import { React, useState } from 'react';

export default function Index() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && content) {
            try {
                let response = await fetch("http://localhost:3000/api/addPosts", {
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        content
                    }),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }
                });

                // ใช้ await เพื่อรอ JSON response
                let data = await response.json();

                // ตรวจสอบสถานะของ response
                if (response.ok) {
                    setTitle("");
                    setContent("");
                    setError("");
                    setMessage("Post added successfully!");
                } else {
                    // ข้อผิดพลาดจาก server
                    setError(data.error || "An error occurred while adding the post.");
                }
            } catch (errorMessage) {
                // ข้อผิดพลาดจาก network
                setError(errorMessage.message || "An error occurred while adding the post.");
            }
        } else {
            setError("All fields are required!");
        }
    };

    return(
        <form className = 'flex justify-center items-center'>
            <div className= 'flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'>
            {error ? <div className = 'alert-error'>{error}</div> : null}
            {message?<div className = 'alert-message'>{message}</div> : null}
            <div className = "max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <label htmlFor="title" className = "flex justify-center items-center font-bold text-xl py-5 ">Title</label>

                    <div className = "flex justify-center items-center ">
                        <input type="text"
                        placeholder='Title of the post'
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        />
                    </div>

                    <div className='flex justify-center items-center py-3'>
                        <textarea className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' cols="20" rows="8" placeholder='Content of the post'
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <div className = "py-3 flex justify-center items-center">
                        <button tpye = 'submit' onClick={handleSubmit} className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                            Add post
                        </button>
                    </div>
                    </div>
            </div>
        </form>
    );
}