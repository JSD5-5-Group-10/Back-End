import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { AiOutlineAlignLeft } from "react-icons/ai";

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
            <div>
                <button onClick={toggleSidebar} className='text-black'> 
                    <AiOutlineAlignLeft size={40} />
                </button>

                <div className={`sidebar ${isOpen ? 'w-1/3' : 'hidden'}  sidebar fixed top-0 bottom-0 lg:left-0 p-2 overflow-auto  bg-white text-black shadow-lg sm:w-1/4`}>
                    <button onClick={toggleSidebar} className='text-black' >
                        <AiOutlineAlignLeft size={40} />
                        </button>
                    <h1 className=" text-indigo-100  text-center">MENU</h1>
                    <hr className="my-2 text-gray-600" />
                    <div>
                        <ul className=" text-indigo-100">
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E6E1FF] text-black ">
                                <Link to="/">Home</Link>
                            </li>
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E6E1FF] text-black">setting</li>
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E6E1FF] text-black">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className=" p-2.5 mt-3 flex items-end rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E6E1FF] text-black">
                                <Link to="/Registration">Registration</Link>
                            </li>
                        </ul>
                        <hr className="my-2 text-gray-600" />
                        <div className="">
                            <button onClick={toggleDropdown}
                                className=" text-[15px] ml-4 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer  hover:bg-[#E6E1FF] text-black">
                                exercise content
                            </button>

                        </div>
                        <div className={`${isHidden ? 'hidden' : ''
                            } p-2.5 mt-2 flex items-end px-4 duration-300 w-4/5 `}>
                            <ul>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-[#E6E1FF] text-black">all content</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-[#E6E1FF] text-black">Yoga</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-[#E6E1FF] text-black">running</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-[#E6E1FF] text-black ">Thai Boxing</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-[#E6E1FF] text-black">weight training</li>
                                <li className="p-2 cursor-pointer mt-1 rounded-md hover:bg-[#E6E1FF] text-black">Aerobics</li>

                            </ul>
                        </div>
                        <div className=' flex justify-center'>
                        <button className=" h-10 px-5  text-indigo-100 transition-colors duration-150 bg-[#7D5CF5] rounded-lg focus:shadow-outline hover:bg-indigo-800">
                            <Link to="/login">Login</Link>
                        </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )


}
