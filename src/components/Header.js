
import logo from "../assets/keep_2020q4_48dp.png";
import { FaSearch } from "react-icons/fa";
import { AddNoteContainer } from "./AddNoteContainer";
import Sidebar from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";



function Header({menuOpen, setMenuOpen}) {
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("Menu Opened: ", menuOpen);
  }

 function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }
  const [searchTerm, setSearchTerm] = useState("");
const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false);

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 font-sans " style={{ position: "sticky", top: 0, zIndex: 1000 , backgroundColor:"#202124" }}>
      
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
       
       <div className="flex items-center justify-around w-full"> 
       
      
   
        <div className="ml-24 w-full flex justify-normal items-center p-1   rounded-lg shadow-md border  mr-24"
      style={{
        backgroundColor: isFocusedOnSearch ? "#ffffff" : "#202124",
        color: "#fff", 
      }}>
        <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        
        <input
            value={searchTerm}
            onChange={handleSearchTermChange}
            onFocus={() => setIsFocusedOnSearch(true)}
            onBlur={() => setIsFocusedOnSearch(false)}
            type="text"
            className="w-full text-lg font-medium p-2 bg-transparent dark:text-white border-none focus:outline-none"
            placeholder="Search"
          />
        </div>
        
        </div>
        <div className="Grid grid-cols-3 gap-0">
          <div></div>
          </div>
          {/*right side stuff*/}
          <div class="grid grid-cols-5 gap-1 ">
              <span >ma</span>
              <span>ma</span>
              <span>ma</span>
              <span>ma</span>
              <span>ma</span>
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
