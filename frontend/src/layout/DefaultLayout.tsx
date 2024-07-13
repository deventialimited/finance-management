import React, { useState, ReactNode } from 'react';
// import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import ChatIcon from '../../public/images/icon/Message.svg';
import {useSidebarStore} from "../Store Management/useSidebarStore"
const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <div className="bg-[#151515] relative text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main className=" bg-[#101010] lg:p-8 lg:pl-0">
            <div className="mx-auto max-w-screen-2xl md:rounded-2xl 2xl:max-w-[2000px] bg-[#ffff] min-h-screen p-2 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}

    </div>
  );
};

export default DefaultLayout;
