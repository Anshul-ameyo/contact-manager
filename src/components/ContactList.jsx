import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
  // const deleteContactHandler = (id) => {
  //   props.removeContactHandler(id);
  // };

  const inputElement = useRef("");

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        removeContactHandler={props.removeContactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    //console.log(inputElement.current.value);
    props.searchKeyword(inputElement.current.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right floated">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search ">
        <div className="ui icon input fluid">
          <input
            ref={inputElement}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.searchTerm}
            onChange={getSearchTerm}
          />
          <i className="search icon" />
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts Available"}
      </div>
    </div>
  );
};

export default ContactList;
