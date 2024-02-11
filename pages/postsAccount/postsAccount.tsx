import { React, useState } from 'react';

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    // const [error, setError] = useState("");
    // const [message, setMessage] = useState("");
    const [notification, setNotification] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (email && password && role && username && name) {
            try {
                let checkDuplicateResponse = await fetch("http://localhost:3000/api/getAccount", {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        username
                    }),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }
                });

                if (checkDuplicateResponse.ok) {
                    let checkDuplicateData = await checkDuplicateResponse.json();
                    if (checkDuplicateData && checkDuplicateData.some(user => user.email === email || user.username === username)) {
                        setNotification(
                            <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                <span class="font-medium">แจ้งเตือน!</span> มี Username หรือ Email ในระบบ
                            </div>
                      </div>
                        )
                    } else {
                        let response = await fetch("http://localhost:3000/api/addAccount", {
                            method: "POST",
                            body: JSON.stringify({
                                email,
                                password,
                                role,
                                username,
                                name
                            }),
                            headers: {
                                Accept: "application/json, text/plain, */*",
                                "Content-Type": "application/json"
                            }
                        });

                        let data = await response.json();

                        if (response.ok) {
                            setEmail("");
                            setPassword("");
                            setRole("");
                            setUsername("");
                            setName("");
                            setNotification(
                            <div class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <div>
                                        <span class="font-medium">สำเร็จ !</span> เพิ่มชื่อผู้ใช้เรียบร้อย.
                                    </div>
                            </div>
                            );
                        } else {
                            setNotification(                    
                            <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                            <span class="font-medium">แจ้งเตือน!</span> เกิดข้อผิดพลาดขณะเพิ่มผู้ใช้
                            </div>
                        </div>);
                        }
                    }
                } 
            } catch (errorMessage) {
                setNotification(
                    <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>
                        <span class="font-medium">แจ้งเตือน!</span> เกิดข้อผิดพลาดขณะเพิ่มผู้ใช้
                        </div>
                    </div>
              );
            }
        } else {
            setNotification(
                <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div>
                    <span class="font-medium">แจ้งเตือน!</span> กรอกข้อมูลให้ครบ
                    </div>
              </div>
            );
        }
    };

    return (
        <form className="flex justify-center items-center">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5  block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                {notification && <div>{notification}</div>}
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                    <label htmlFor="title" className="flex justify-center items-center font-bold text-xl py-5">Account Management</label>

                    <div className="flex justify-center items-center">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-center items-center py-3">
                        <input
                            type="text"
                            placeholder="UserName"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-center items-center">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="flex justify-center items-center py-3">
                        <input
                            type="text"
                            placeholder='Name EX:"Mr:Admin"'
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
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
                            Add Account
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
