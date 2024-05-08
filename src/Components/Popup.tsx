import React from 'react';

interface PopupProps {
    close: () => void;
    el: {
        id: string;
        first_name: string;
        last_name: string;
        mob: string;
        status: string;
    };
}

const Popup: React.FC<PopupProps> = ({ close, el }) => {
    return (
        <div className="fixed top-0    text-black left-0 w-full h-full  bg-opacity-20 bg-black flex items-center justify-center">
            <div className="bg-yellow-500 drop-shadow-md w-1/3 h-50 rounded-md p-4 ">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-medium">Contact Details</h2>
                    <button className="text-gray-100 px-2 rounded-md bg-red-500 hover:text-gray-800" onClick={() => close()}>
                        Close
                    </button>
                </div>
                <div key={el.id} className="bg-yellow-300  m-4 p-4 text-black">
                    <div className="w-3/4 m-auto  ">
                        <img className="w-full rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV_GYskU23TuYAGdMi6zqMQDC6Ow1jy5N_kdiufK4b1g&s" alt="" />
                        <div className="p-4">
                        </div>
                    </div>
                    <div className="text-left ">
                        <p>First Name : {el.first_name}</p>
                        <p>Last Name  : {el.last_name}</p>
                        <p>Mobile   : {el.mob}</p>
                        <p>Status     : {el.status === "active" ? "Active" : "Inactive"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;

