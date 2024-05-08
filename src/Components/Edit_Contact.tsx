import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editContact } from '../Redux/action';

interface Contact {
    id: string;
    first_name: string;
    last_name: string;
    status: string;
    mob: string;
}

const EditContact: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const allContacts = useSelector((state: { contacts: Contact[] }) => state.contacts);
    const [form, setForm] = useState<Contact>({} as Contact);
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'mob') {
            if (!/^\d+$/.test(value)) {
                setError('Mobile number must contain only numbers.');
            } else if (value.length !== 10) {
                setError('Mobile number must be 10 digits.');
            } else {
                setError('');
            }
        }

        setForm({ ...form, [name]: value });
    };

    const handleSave = () => {
        // Check if there's an error before dispatching the action
        if (!error) {
            dispatch(editContact({ ...form, id: form.id }));
        }
    };

    useEffect(() => {
        const contact = allContacts.find((el: Contact) => el.id == id);
        if (contact) {
            setForm(contact);
        } else {
            console.log("Contact not found");
        }
    }, [allContacts, id]);

    return (
        <div className="w-1/2 mx-auto my-4 pt-16">
            <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
            <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="first-name">
                    First Name
                </label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-md"
                    id="first-name"
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="last-name">
                    Last Name
                </label>
                <input
                    className="w-full border border-gray-400 p-2 rounded-md"
                    id="last-name"
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="last-name">
                    Mobile Number
                </label>
                <input
                    className={`w-full border border-gray-400 p-2 rounded-md ${error ? 'border-red-500' : ''}`}
                    id="last-name"
                    type="text"
                    name="mob"
                    value={form.mob}
                    onChange={handleChange}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="status">
                    Status
                </label>
                <select
                    className="w-full border border-gray-400 p-2 rounded-md"
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
            >
                Save Contact
            </button>
        </div>
    );
};

export default EditContact;
