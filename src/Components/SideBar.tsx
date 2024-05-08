import React from "react";
import { Link } from "react-router-dom";
import contact from "../utils/contact-book.png";
import bar from "../utils/bar-chart.png";

const Sidebar: React.FC = () => {
    return (
        <div className="flex border-r-2">
            <div className="flex pt-16 text-2xl flex-col text-black font-bold p-4 h-screen bg-yellow-500 shadow w-60">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl mt-4 font-bold">Dashboard</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link
                                    to="/"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <img src={contact} alt="" />
                                    <span>Contacts</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <img src={bar} alt="" />
                                    <span>Charts And Maps</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
