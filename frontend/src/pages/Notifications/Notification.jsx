import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { MdLockOutline } from 'react-icons/md';
import { useSidebarStore } from '../../Store Management/useSidebarStore';
import Header from './components/Header';
const data = [
  {
    id: 0,
    icon: '',
    name: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consec.',
    time: 'Just Now',
  },
  {
    id: 1,
    icon: '',
    name: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consec.',
    time: 'Just Now',
  },
  {
    id: 2,
    icon: '',
    name: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consec.',
    time: 'Just Now',
  },
  {
    id: 3,
    icon: '',
    name: 'Lorem ipsum',
    desc: 'Lorem ipsum dolor sit amet consec.',
    time: 'Just Now',
  },
  {
    id: 4,
    icon: <MdLockOutline size={24} />,
    name: 'Password Update successfully',
    desc: 'Your password has been updated successfully',
    time: 'Yesterday',
  },
];
const Notification = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  return (
    <DefaultLayout>
      {/* <!-- ===== Header Start ===== --> */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Header End ===== --> */}
      <div className="flex flex-col gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className=" flex justify-between items-center p-3 border-b border-[#A2A1A81A]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F1EEFE] rounded-full text-[#7152F3] items-center flex justify-center">
                {item.icon}
              </div>
              <div>
                <div className="text-black font-bold">{item.name}</div>
                <div className='text-[#868686]'>{item.desc}</div>
              </div>
            </div>
            <div className='text-[#868686]'>{item.time}</div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Notification;
