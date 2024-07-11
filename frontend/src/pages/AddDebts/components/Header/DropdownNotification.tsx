import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const notifications = [
  {
    id: 1,
    name: 'John Doe',
    message: 'John Doe has accepted your bid of $25 on their project for the web application',
    time: '1 day',
    img: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'Hannah Smith',
    message: 'Hannah Smith has declined your bid of $15 hourly rate for the mobile app',
    time: '1 day',
    img: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    name: 'Jack Howard',
    message: 'Jack Howard viewed your bid of $30 on their project',
    time: '2 day',
    img: 'https://via.placeholder.com/50',
  },
];

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        to="#"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#71299d] text-[#757575]"
      >
        <span
          className={`absolute top-3 right-3 z-1 h-1.5 w-1.5 border border-white rounded-full bg-[#ce493c] ${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
        </span>
        <img src="/images/icon/icon-notification.svg" alt="Notification Icon" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-2.5 flex w-75 flex-col rounded-lg shadow-lg bg-white sm:right-0 sm:w-90 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-xl font-semibold uppercase text-[#545454]">Notifications</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto max-h-64">
          {notifications.map((notification) => (
            <li key={notification.id} className="border-t border-[#c5c4c4] hover:bg-gray-100">
              <Link className="flex items-center gap-4 px-4.5 py-3" to="#">
                <img className="w-12 h-12 rounded-full" src={notification.img} alt={notification.name} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">{notification.name}</p>
                  <p className="text-sm text-[#757575]">{notification.message}</p>
                </div>
                <p className="text-xs text-[#565555]">{notification.time}</p>
              </Link>
            </li>
          ))}
        </ul>
          <Link
            className="block text-center rounded-b-lg py-3 text-sm font-medium bg-[#e4f0f2] text-[#000] hover:bg-gray-100"
            to="/notifications"
          >
            View All
          </Link>
      </div>
    </li>
  );
};

export default DropdownNotification;
