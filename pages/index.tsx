import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { sign } from 'jsonwebtoken';


const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    // ส่งข้อมูลล็อกอินไปยัง API route
    try {
    
      let response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })  // Include the username in the request body
      });
    
      const data = await response.json();
    
      if (response.ok) {
        if (data && data.username) {
          // console.log('Login successful');
          // console.log('Username:', data.username);
          // console.log('Role:', data.role);

          setCookie('username', data.username, 1); 
          setCookie('role',data.role, 1);
          router.push('/tableAccount');
        } else {
          console.error('Invalid response format. Missing username.');
        }
      } else {
        console.error('Login failed:', data ? data.message : 'Unknown error');
      }
    } catch (error) {
      console.error("An error occurred while logging in", error);
    }
    
  };
  
  function setCookie(name: string, value: string, days: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
  
    const cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
  }

  // Add a return statement to return JSX
  return (
    <div className="flex justify-center items-center">
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto  w-auto"
        src="img/Logo.svg"
        alt="Moondust"
        width={200}
      />
     
      
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        เข้าสู่ระบบด้วย ไอดี
      </h2>
    </div>
    <a><h2 id = 'ErrorUsersname'></h2></a>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            ชื่อผู้ใช้
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              รหัสผ่าน
            </label>
            <div className="text-sm">
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value = {password}
              onChange = {(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
            >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>

      <a className="text-red-600" >
        เว็บไซต์เป็นการใช้รหัสภายในโปรติดต่อคนดูแล
      </a>
    </div>
  </div>
  </div>
  
  );
};

export default Login;
