import { Sidebar, useSidebar, Overlay } from '@rewind-ui/core';
import { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();
  useEffect(() => {
    if (!session) {
      setExpanded(false);
    }
  }, [session]);
  return (

    <div className="relative flex flex-row w-full h-full min-h-screen">
      {session ? (  // ตรวจสอบสถานะ session
        <Sidebar
          color="gray"
          onToggle={(state) => {
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
              <Sidebar.Nav.Section.Item
                label="Logout"
                as={Link}
                asProps={{ href: '/_Login' }}
                onClick={() => signOut()}
                active={false} 
              />
            </Sidebar.Nav.Section>

            <Sidebar.Nav.Section>
              <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
              <Sidebar.Nav.Section.Item
                label="Clients"
                href="#"
              />
              <Sidebar.Nav.Section.Item
                label="Users"
                as="button"
              >
                <Sidebar.Nav.Section isChild>
                  <Sidebar.Nav.Section.Item
                    label="Account Management"
                    as={Link}
                    asProps={{ href: '/_Admin/tableAccount' }}
                    active={false}  // ตั้งค่าตามความเหมาะสม
                  />
                  <Sidebar.Nav.Section.Item
                    label="Add New Account"
                    as={Link}
                    asProps={{ href: '/_Admin/postsAccount/postsAccount' }}
                    active={false}  // ตั้งค่าตามความเหมาะสม
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
      ) : null}

      <main
        className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${
            expanded ? 'md:ml-64' : 'md:ml-0'
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
          <img
            className=""
            src="https://github.com/hellOoSaksit/Moondust-Websit/assets/79570387/f806c19a-13f3-40f7-8222-e8fe07c94718"
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
        <div className="flex flex-col flex-grow"> {/* เพิ่ม class ใหม่นี้ */}
            <div className="flex-grow" />
            <div className="flex sticky bottom-0 items-center bg-white w-full min-h-[4rem] px-8">
            <span>Footer</span>
            </div>
        </div>
      </main>
    </div>
  );
}
