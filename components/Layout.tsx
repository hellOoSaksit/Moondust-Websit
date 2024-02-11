import { Sidebar, useSidebar, Overlay } from '@rewind-ui/core';
import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useCookies } from 'react-cookie';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

export default function Layout({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [cookies] = useCookies(['username', 'role']);
  const sidebar = useSidebar();

  useEffect(() => {
    // เพิ่มการตรวจสอบสถานะการเข้าสู่ระบบทุกครั้งที่ expanded หรือ mobile เปลี่ยน
    if (expanded || mobile) {
      const isAuthenticated = cookies.username && cookies.role;
      if (!isAuthenticated) {
        // ถ้ายังไม่ได้เข้าสู่ระบบ ให้ redirect ไปที่หน้า Login
        window.location.href = "/";
      }
    }
  }, [expanded, mobile, cookies.username, cookies.role]);

  return (

<div className="relative flex flex-row w-full h-full min-h-screen">
      <Sidebar
        color="gray"
        onToggle={(state: SidebarState) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="absolute"
      >
        <Sidebar.Head>
          <Sidebar.Head.Title>Moondust Dashboard</Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item  label="Login" href="/" active />
            {/* <Sidebar.Nav.Section.Item icon={<RocketLaunch />} label="Login" href="/" active /> */}
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item  label="Clients" href="#" />
            <Sidebar.Nav.Section.Item  label="Users" as="button">
            {/* <Sidebar.Nav.Section.Item icon={<Briefcase />} label="Clients" href="#" />
            <Sidebar.Nav.Section.Item icon={<Users />} label="Users" as="button"> */}
              <Sidebar.Nav.Section isChild>
                <Sidebar.Nav.Section.Item
                  // icon={<span className="w-1 h-1 rounded bg-transparent" />}
                  label="Account"
                  href="/tableAccount"
                />
                <Sidebar.Nav.Section.Item
                  // icon={<span className="w-1 h-1 rounded bg-transparent" />}
                  label="Add new"
                  href="/postsAccount/postsAccount"
                />
              </Sidebar.Nav.Section>
            </Sidebar.Nav.Section.Item>

          </Sidebar.Nav.Section>


        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className="flex flex-col justify-center items-center text-sm">
            <span className="font-semibold">Saksit Chuenmaiwaiy </span>
            <span>version 0.0.1</span>
          </div>
        </Sidebar.Footer>
      </Sidebar>

      <main
        className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${
          expanded ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        {mobile && (
          <Overlay
            blur="none"
            onClick={() => {
              sidebar.toggleMobile();
            }}
            className="md:hidden z-40"
          />
        )}
        <header className="flex flex-row sticky top-0 px-8 items-center bg-white border-b border-b-gray-100 w-full shadow-sm min-h-[4rem]">
          {/* <Image src="/img/Logo.svg" width={100} height={100} alt="Rewind-UI" className="your-class-name" /> */}
          <img
            className=""
            src="img/Logo.svg"
            alt="Moondust"
            width={100}
            height={100}
          />
          <Button
            onClick={() => {
              sidebar.toggleMobile();
            }}
            size="sm"
            color="white"
            // icon
            className="ml-auto flex md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
              <path
                className="opacity-50"
                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </Button>
        </header>


            {children}



        <div className="flex sticky bottom-0 items-center bg-white w-full min-h-[4rem] px-8">
          <span>Footer</span>
        </div>
      </main>
    </div>
  );
}
