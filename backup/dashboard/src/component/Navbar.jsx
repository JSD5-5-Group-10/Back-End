import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
export default function Navbar() {

    const [isHidden, setIsHidden] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsHidden(!isHidden);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav>
            <div className=''>
            <button onClick={toggleSidebar} className='text-black' >openNav</button>
                
                <div className={`sidebar ${isOpen ? 'w-1/3' : 'hidden'}  sidebar fixed top-0 bottom-0 lg:left-0 p-2 overflow-auto text-center bg-gray-900 text-white`}>
                <button onClick={toggleSidebar} className='text-white' >close Nav</button>
                    <h1 className=" text-indigo-100">MENU</h1>
                    <hr className="my-2 text-gray-600" />
                    <div>
                        <ul className=" text-indigo-100">
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ">
                                Home
                            </li>
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">setting</li>
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                            <Link to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                        <hr className="my-2 text-gray-600" />
                        <div className="">
                            <button onClick={toggleDropdown}
                                className=" text-[15px] ml-4 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-blue-600 text-white">
                                exercise content
                            </button>

                        </div>
                        <div className={`${isHidden ? 'hidden' : ''
                            } p-2.5 mt-2 flex items-end px-4 duration-300 w-4/5 `}>
                            <ul>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-gray-600 text-gray-200">all content</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-gray-600 text-gray-200">Yoga</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-gray-600 text-gray-200">running</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-gray-600 text-gray-200 ">Thai Boxing</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-gray-600 text-gray-200">weight training</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-gray-600 text-gray-200">Aerobics</li>

                            </ul>
                        </div>
                        <button className=" h-10 px-5  text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                        <Link to="/login">Login</Link>
                        </button>

                    </div>
                </div>
            </div>
        </nav>
    )


}
