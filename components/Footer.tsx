import Link from "next/link"
export default function Footer(){
    return(
      <div id = "Footer">
      <div className = "flex flex-col ">
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded  ">
          <div className = "flex flex-col items-center">
          <a className="link link-hover bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full " href="https://github.com/hellOoSaksit">Github</a>
          </div>
          <nav className="grid grid-flow-col gap-4">
            {/* <a className="link link-hover">Contact</a> */}
          </nav> 
          <aside>
            <p>ผลงานชิ้นนี้เป็นผลงานสำหรับการเรียนรู้ และหาที่ฝึกงานปี 3</p>
          </aside>
        </footer>
        </div>
      </div>
    )
}

