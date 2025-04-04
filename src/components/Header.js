import logo from "../assets/keep_2020q4_48dp.png";
import { FaSearch, FaUser } from "react-icons/fa";
import { FiSettings, FiList, FiRefreshCcw } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Header({ menuOpen, setMenuOpen }) {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false);

  return (
    <nav
      className="border-gray-200 fixed px-2 sm:px-4 py-2.5 dark:bg-gray-900 font-sans "
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#202124",
      }}
    >
      <div className="flex flex-row  items-center font-sans">
        <div className="flex flex-row items-center justify-between">
          {/* menu toggle */}
          <div className="flex items-center m-2">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 rounded-full hover:bg-gray-800 "
            >
              <Bars3Icon className="h-6 w-6 text-white " />
            </button>
          </div>
          <div>
            <a href="/" className="flex items-center rounded">
              <img src={logo} className="h-8 sm:h-10" alt="Keep Logo" />
              <span className="self-center text-xl font-thin whitespace-nowrap text-white">
                Keep
              </span>
            </a>
          </div>
        </div>
        {/* Search bar */}
        <div className="hidden md:flex items-center justify-around w-full">
          <div
            className="ml-24 w-full flex justify-normal items-center p-1   rounded-lg shadow-md border-none  mr-24"
            style={{
              backgroundColor: isFocusedOnSearch
                ? "#ffffff"
                : "oklch(43.9% 0 0)",
            }}
          >
            <div
              className={`${
                isFocusedOnSearch ? "hover:bg-stone-100" : "hover:bg-stone-500"
              } rounded-full m-1 ml-3 w-8 h-8 flex items-center justify-center`}
            >
              <IoIosSearch
                className="w-5 h-5 text-sm "
                style={{
                  color: !isFocusedOnSearch ? "white" : "black",
                }}
              />
            </div>

            <input
              tabIndex={0}
              value={searchTerm}
              onChange={handleSearchTermChange}
              onFocus={() => setIsFocusedOnSearch(true)}
              onBlur={() => setIsFocusedOnSearch(false)}
              type="text"
              className="w-full text-white text-lg font-medium p-2 bg-transparent focus:text-gray-800 border-none focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        {/*right side stuff*/}
        <div className="grid grid-cols-4 gap-5 mr-5 flex-end ">
          <div>
            <button type="button" className="rounded h-8 w-8 hover:bg-zinc-600">
              <FiRefreshCcw
                className="w-7 h-7 text-gray-500 hover:text-white"
                title="Refresh"
              />
            </button>
          </div>
          <div>
            <button type="button" className="rounded h-8 w-8 hover:bg-zinc-600">
              <FiList
                className="w-7 h-7 text-gray-500 hover:text-white"
                title="Refresh"
              />
            </button>
          </div>
          <div>
            <button type="button" className="rounded h-8 w-8 hover:bg-zinc-600">
              <FiSettings
                className="w-7 h-7 text-gray-500 hover:text-white"
                title="Refresh"
              />
            </button>
          </div>
          <div>
            <button type="button" className="rounded h-8 w-8 hover:bg-zinc-600">
              <FaUser
                className="w-7 h-7 text-gray-500 hover:text-white"
                title="Refresh"
              />
            </button>
          </div>
        </div>

        {/*<div
          className="hidden w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a className="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:text-amber-500 dark:text-gray-400 dark:hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a className="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:text-amber-500 dark:text-gray-400 dark:hover:text-white">
                About
              </a>
            </li>
          </ul>
        </div>*/}
      </div>
      <hr className="border-gray-500 dark:border-gray-700 mt-2" />
    </nav>
  );
}

export default Header;
