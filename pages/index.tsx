import { Button , Modal ,Input } from '@rewind-ui/core';
import React, { useState } from 'react';

export default function Home() 
{
  const [open, setOpen] = useState(false);
  return (
    <>
      
      <Modal size="md" open={open} onClose={() => setOpen(false)}>
            <div className='flex flex-col border bg-white rounded-md shadow-sm divide-y divide-gray-100 border-gray-100 w-full'>
              <div className='flex-row items-center p-5 text-base rounded-t-md flex justify-between'>
                <div className='flex flex-col'>
                    <h3 className='text-xl text-gray-800 font-bold'>Add User</h3>
                    <span className='text-gray-500'>เพิ่มชื่อผู้ใช้</span>
                </div>
                <div>
                <button type='button' className='inline-flex items-center justify-center enabled:cursor-pointer focus:outline-none transition duration-150 ease-in-out data-[has-left-element=true]:rounded-l-none data-[has-right-element=true]:rounded-r-none data-[has-left-element=true]:h-auto data-[has-right-element=true]:h-auto focus:z-20 border antialiased focus:ring-gray-100 text-sm rounded-lg shadow-none focus:ring focus:ring-offset-1 w-8 h-8 text-gray-800 border-gray-100 bg-white focus:bg-gray-50 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-50/50 disabled:hover:bg-gray-50'
                aria-disabled="false"
                >
                <svg xmlns='http://www.w3.org/2000/svg' width = '1em' height='1em' fill ='currentColor'
                viewBox='0 0 256 256'>
                  <path d = "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
                  </path>
                </svg>
                </button>
                </div>
              </div>
                <div className='box-border  p-4 border-4'>
                <Input type="text" tone='light' size='md' radius='lg' placeholder='ชื่อผู้ใช้' ></Input>
                </div>
            </div>
      </Modal>
      <Button onClick={() => setOpen(true)}>Click me!</Button>
    </>
  );
}
