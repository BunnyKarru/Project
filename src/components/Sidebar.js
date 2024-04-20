import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
<nav className="fixed top-0 left-0 h-16 w-full flex items-center bg-white shadow">
  <div className="logo flex items-center ml-4 mb-1">
    <i className="bx bx-menu menu-icon text-gray-700 text-2xl mr-2" onClick={toggleSidebar}>
      <svg height="32px" id="Layer_1" style={{ enableBackground: 'new 0 0 32 32' }} viewBox="0 0 32 32" width="32px">
        <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
      </svg>
    </i>
    <span className="logo-name text-violet-600 text-lg font-bold">Admin Panel</span>
  </div>
  <div className="ml-auto mr-4 relative">
    <div className="flex items-center">
      <div className="user-icon bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer relative group">
        <svg className="w-6 h-6 text-gray-700 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m14-4a4 4 0 00-8 0m8 0a4 4 0 00-8 0m8 0h2m-10 4a2 2 0 104 0h-4z"></path>
        </svg>
        <div className="hidden absolute top-12 right-0 bg-white shadow-lg rounded-md p-2 text-gray-700 group-hover:block">
          <button className="text-sm text-blue-500 ml-1 hover:underline" >Logout</button>
        </div>
      </div>
      <div className="ml-2">
        <span className="text-sm font-semibold">Username</span>
      </div>
    </div>
  </div>
</nav>



      <div className={`sidebar fixed top-0 left-0 h-full w-64 bg-white shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out`} onClick={toggleSidebar}>
        <div className="sidebar-content flex flex-col justify-between h-full py-8 px-4">
          <ul className="lists">
            <li className="list hover:bg-violet-400 rounded-lg">
              {/* Replace anchor tag with Link */}
              <Link to="" className="nav-link flex items-center py-2 px-3 rounded-md text-violet-600">
                <i className="bx bx-home-alt icon text-violet-600 mr-2"></i>
                <span className="link text-gray-900">Projects</span>
              </Link>
            </li>
            <li className="list hover:bg-violet-400 rounded-lg">
              {/* Replace anchor tag with Link */}
              <Link to="/tasksheet" className="nav-link flex items-center py-2 px-3 rounded-md text-violet-600">
                <i className="bx bx-bar-chart-alt-2 icon text-violet-600 mr-2"></i>
                <span className="link text-gray-900">TaskSheet</span>
              </Link>
            </li>
            <li className="list hover:bg-violet-400 rounded-lg">
              {/* Replace anchor tag with Link */}
              <Link to="/calender" className="nav-link flex items-center py-2 px-3 rounded-md text-violet-600">
                <i className="bx bx-bar-chart-alt-2 icon text-gray-800 mr-2"></i>
                <span className="link text-gray-900">Calender</span>
              </Link>
            </li>
            <li className="list hover:bg-violet-400 rounded-lg">
              {/* Replace anchor tag with Link */}
              <Link to="/user" className="nav-link flex items-center py-2 px-3 rounded-md text-violet-600">
                <i className="bx bx-bar-chart-alt-2 icon text-gray-800 mr-2"></i>
                <span className="link text-gray-900">User</span>
              </Link>
            </li>
            {/* Add other list items here */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
