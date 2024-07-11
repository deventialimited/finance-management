import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '/images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  console.log(props.sidebarOpen);
  return (
    <header className="sticky top-0 z-999 flex flex-col w-full  bg-[#fbfbfb] backdrop-filter backdrop-blur-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block bg-[#f0f0f0] lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out  ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out  ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="flex-shrink-0 hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        <div className="hidden w-max lg:block">
          <h3 className="text-sm font-semibold flex items-center text-[#656565]">
            <img src="/images/icon/icon-sun.svg" className="mx-2" />{' '}
            <span>Good Morning</span>
          </h3>
          <h3 className="ml-4 text-lg font-bold  text-[#251147]">
            Carmeron Williamson
          </h3>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Search field */}
            <div className="hidden max-w-64 sm:block">
              <form
                action="https://formbold.com/s/unique_form_id"
                method="POST"
              >
                <div className="relative py-3 rounded-2xl  bg-[#f0f0f0]">
                  <button className="absolute right-5 top-1/2 -translate-y-1/2">
                    <svg
                      className=" fill-black"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                        fill=""
                      />
                    </svg>
                  </button>

                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent placeholder:text-black pl-12 pr-4  focus:outline-none text-black xl:w-125"
                  />
                </div>
              </form>
            </div>
            <Link
            to={'/add-debts'}
              className="relative flex w-max items-center cursor-pointer justify-center rounded-full py-2 px-3 bg-[#71299d] text-white"
            >
              + Add New Debts
            </Link>
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}
            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
