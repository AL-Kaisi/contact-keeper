import React, { useReducer } from "react";
import axios from "axios";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  GET_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  FILTER_CONTACT,
  CONTACT_ERROR,
} from "../types";
import contactContext from "./contactContext";

const ContactState = (props) => {
  const initalState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initalState);
  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

   //Update Contact
   const updateContact = async contact => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
  
        dispatch({ type: UPDATE_CONTACT, payload: res.data });
      } catch (err) {
        dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
      }

  
  };



  //Clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

 

  //Filiter contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  //Clear Filiter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
