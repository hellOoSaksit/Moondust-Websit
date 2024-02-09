import Link from "next/link"
import Image from "next/image"
export default function Navbar(){
    return(
<div className="bg-gray-100 font-sans w-full  m-0">
	<div className="bg-white shadow">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <div>\
        <a href="/">
        <Image
            priority
            src="/img/Logo.svg"
            height={60}
            width={60}
            alt="Moondust Cafe"
        />
        </a>
        </div>

        <div className="hidden sm:flex sm:items-center">
          <a href="/" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">หน้าหลัก</a>
          
        </div>

        <div className="hidden sm:flex sm:items-center">
          
          <a href="/loginFrom" className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600">เข้าสู่ระบบ</a>
        </div>

      </div>
      {/* หน้าจอขนาดเล็ก */}
      <div className="block sm:hidden bg-white border-t-2 py-2">
        <div className="flex flex-col">
          <a href="/" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">หน้าหลัก</a>
          <div className="flex justify-between items-center border-t-2 pt-2">
            {/* <a href="#" className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">เข้าสู่ระบบ</a> */}
            <a href="/" className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">เข้าสู่ระบบ</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}