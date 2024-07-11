import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import UserOne from '/images/user/user-01.png';
import UserTwo from '/images/user/user-02.png';
import UserThree from '/images/user/user-03.png';
import UserFour from '/images/user/user-04.png';

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
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

  // close if the esc key is pressed
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
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#71299d] text-[#757575]"
        to="#"
      >
               <span
          className={`absolute top-2.5 right-2 z-1 h-1.5 w-1.5 border border-white rounded-full bg-[#ce493c] ${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
        </span>

        <img src="/images/icon/icon--sidebar-chart.svg"/>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm   shadow-default bg-white sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-[#757575]">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4.5 border-t px-4.5 py-3  border-strokedark hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserTwo} alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium  text-[#757575]">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t px-4.5 py-3  border-strokedark hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserOne} alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium  text-[#757575]">
                  Robert Jhon
                </h6>
                <p className="text-sm">Can you share your offer?</p>
                <p className="text-xs">10min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t px-4.5 py-3  border-strokedark hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserThree} alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium  text-[#757575]">
                  Henry Dholi
                </h6>
                <p className="text-sm">I cam across your profile and...</p>
                <p className="text-xs">1day ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t px-4.5 py-3  border-strokedark hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserFour} alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium  text-[#757575]">
                  Cody Fisher
                </h6>
                <p className="text-sm">I’m waiting for you response!</p>
                <p className="text-xs">5days ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-4.5 border-t px-4.5 py-3  border-strokedark hover:bg-meta-4"
              to="/messages"
            >
              <div className="h-12.5 w-12.5 rounded-full">
                <img src={UserTwo} alt="User" />
              </div>

              <div>
                <h6 className="text-sm font-medium  text-[#757575]">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
