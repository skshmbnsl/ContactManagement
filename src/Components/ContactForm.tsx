import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from "react-redux";
import { addContact } from '../Redux/action';

const ContactForm: React.FC = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mob: "",
    status: "active"
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    if (name === 'mob') {
      if (!/^\d+$/.test(value)) {
        setError('Mobile number must contain only numbers.');
      } else if (value.length !== 10) {
        setError('Mobile number must be 10 digits.');
      } else {
        setError(null);
      }
    }
  };

  const handleSave = () => {
    if (error) {
      return;
    }

    dispatch(addContact(form));
  };

  return (
    <div className="w-1/2 mx-auto my-4 pt-16">
      <h2 className="text-2xl font-bold mb-4">Create Contact</h2>
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
        {error && <p className="text-red-500">{error}</p>}
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
        className="bg-yellow-500 hover:bg-orange-700 text-red-500 font-bold py-2 px-4 rounded"
        onClick={handleSave}
        disabled={!!error}
      >
        Save Contact
      </button>
    </div>
  );
};

export default ContactForm;
