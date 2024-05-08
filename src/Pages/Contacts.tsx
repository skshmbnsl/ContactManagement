import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "../Components/Popup";
import { removeContact } from "../Redux/action";

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
  mob: string;
}

const Contacts: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [singleContact, setSingleContact] = useState<Contact | undefined>(
    undefined
  );
  const [data, setData] = useState<any>(undefined);

  const AllContacts: Contact[] = useSelector((store: any) => store.contacts);
  const dispatch = useDispatch();

  const togglePopup = (contact: Contact) => {
    setSingleContact(contact);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
   
  }, [dispatch, AllContacts.length]);

  return (
    <div className="justify-center pt-16 text-gray-50 p-4 w-full">
      <div className="m-4">
        <button className="rounded-full bg-green-600 p-2 text-2xl">
          <Link to="/contact_form">Create Contact</Link>
        </button>
      </div>
      {AllContacts.length === 0 && (
        <div className="m-auto w-fit p-4 align-middle text-blue-500 justify-center">
          <h1 className="text-3xl">
            No Contact Found Please add contact using <br /> Create Contact
            Button
          </h1>
        </div>
      )}
<div
    id="contact_list"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
>
    {AllContacts.map((el: Contact) => (
    <div
        key={el.id}
        className="bg-yellow-950 rounded-3xl shadow-md m-4 p-4 text-yellow-100"
    >
        <div onClick={() => togglePopup(el)} className="w-full m-auto">
        
        <div className="p-4">
            {isOpen && <Popup close={() => togglePopup(data)} el={el} />}
            
        </div>
        <div className="text-left" >
            <p>First Name : {el.first_name}</p>
            <p>Last Name : {el.last_name}</p>
            <p>Status : {el.status === "active" ? "Active" : "Inactive"}</p>
        </div>
        </div>
        <div className="flex justify-between my-2">
        <Link to={`edit/${el.id}`}>
            <button className="rounded p-2 bg-green-600 text-black">
            <img src="https://img.icons8.com/?size=256&id=88584&format=png" height="20px" width="20px" alt="" />
            </button>
        </Link>
        <button
            onClick={() => dispatch(removeContact(el.id))}
            className="rounded p-2 bg-red-600 w-mid text-white"
        >
            <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" height="20px" width="20px" alt="" />
        </button>
        </div>
    </div>
    ))}
</div>
        
      </div>
    
  );
};

export default Contacts;
