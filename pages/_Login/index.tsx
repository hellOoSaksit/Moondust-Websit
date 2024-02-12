import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

const handleSignInWithGitHub = async () => {
  const session = await signIn('github');
};

const Login: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    if (session) {
      const router = useRouter();
      router.push('/_Admin/tableAccount');
      return null;
    }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
  };
  

  return (
    <div className="flex justify-center items-center px m-6">
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8 block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow ">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto  w-auto"
        src="https://github.com/hellOoSaksit/Moondust-Websit/assets/79570387/f806c19a-13f3-40f7-8222-e8fe07c94718"
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
        <div>        
        <button onClick={handleSignInWithGitHub} className="py-2 px-4 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792">
            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
          </svg>
            Login with GitHub
          </button>
        </div>
      </form>
    </div>
      <a className="text-red-600" >
      GitHub Login : OK || Register : Waiting
      </a>
  </div>
  </div>
  
  );
};

export default Login;
