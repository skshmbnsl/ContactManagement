import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  mob: string;
  status: string;
}

interface State {
  contacts: Contact[];
}

const initialState: State = {
  contacts: localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts") || "[]") : [],
};

export default function reducer(state = initialState, action: { type: string; payload: any }): State {
  switch (action.type) {
    case ADD_CONTACT: {
      const { first_name, last_name, mob } = action.payload;
      
      if (!first_name || !last_name || !mob) {
        alert("Oh! You missed required input. Please fill in all fields.");
        return state;
      }
      
      if (state.contacts.some(contact => contact.mob === mob)) {
        alert("Contact with the same mobile number already exists.");
        return state;
      }
    
      const newContact: Contact = {
        id: state.contacts.length > 0 ? state.contacts[state.contacts.length - 1].id + 1 : 1,
        first_name,
        last_name,
        mob,
        status: "active", // Assuming default status is "active"
      };
    
      const updatedContacts = [...state.contacts, newContact];
    
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    
      alert("Contact saved.");
    
      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    
    case REMOVE_CONTACT: {
      const updatedContacts = state.contacts.filter((contact) => contact.id !== action.payload.id);
      
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      return {
        ...state,
        contacts: updatedContacts,
      };
    }

    case EDIT_CONTACT: {
      const { id, first_name, last_name, mob } = action.payload;

      if (!first_name || !last_name || !mob) {
        alert("Input fields cannot be left empty.");
        return state;
      }

      const updatedContacts = state.contacts.map((contact) => {
        if (contact.id === id) {
          return { ...contact, first_name, last_name, mob };
        }
        return contact;
      });

      localStorage.setItem("contacts", JSON.stringify(updatedContacts));

      alert("Contact details updated.");

      return {
        ...state,
        contacts: updatedContacts,
      };
    }

    default:
      return state;
  }
}
