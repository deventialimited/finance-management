import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import UserOne from '/images/user/user-01.png';

const DropdownList = ({dropDownoptions,selectedOption,setSelectedOption}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
    <div className="relative py-3 px-3 w-max lg:block">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between gap-2"
        to="#"
      >
            <h3 className="text-xl font-bold text-black">
           {selectedOption}
            </h3>
        <img className={`${dropdownOpen ? "rotate-180":null} transition-all duration-200 ease-in-out`} src='/images/icon/icon-black-arrow-down.svg'/>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute z-20 right-0 left-0 mt-4 flex w-max flex-col rounded-sm  shadow-default  bg-white ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
         <div className="relative">
      <div className="bg-white text-black font-medium">
        {
          dropDownoptions?.map((item,idx)=>(
            <h3 onClick={()=>{
              setDropdownOpen(!dropdown)
              setSelectedOption(item)
            }} key={idx} className="flex py-3 cursor-pointer hover:bg-[#d9d8d7] px-3 items-center">
              {item}
        </h3>
          ))
        }
      </div>
    </div>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownList;
