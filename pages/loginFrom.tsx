import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push('/'); // Redirect to '/dashboard' after successful login
    } else {
      const data = await response.json();
      console.error(data.message);
      document.getElementById('ErrorUsersname').innerHTML = "ชื่อผู้ใช้ หรือ หรัสผ่านผิด";
    }
  };

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
