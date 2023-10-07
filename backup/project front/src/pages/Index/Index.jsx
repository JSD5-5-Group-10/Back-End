import React from "react";
import { Outlet, Link } from "react-router-dom";

export const Index = () => {
    return (
        <>
            <div className=" w-[400px] md:w-[768px] lg:w-[1024px]">
                <div class="text-center font-bold text-xl md:text-sm"> 
                <h1 className="m-auto pr-40 sm:pr-80 md:pr-60">INDEX</h1>
                </div>
                <footer class="fixed bottom-10 ml-16 md:ml-48 lg:ml-80">
                    <div className="inline-flex m-auto ">
                        <button class="px-4 py-2  bg-[#c0bcd5] text-white rounded-md hover:bg-[#7D5CF5] shadow-lg m-auto">
                        <Link to="/ActivityForm">Add Activity</Link>
                        </button>
                    </div>
                </footer>
            </div>
        </>
    );
};
