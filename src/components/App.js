import "./App.css";
import AddContact from "./AddContact";
import Header from "./Header";
import ContactList from "./ContactList";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
// import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts"; //key for localStorage
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // /*API CALL FOR FIRST TIME RETRIEVING DATA FROM SERVER*/
  // useEffect(() => {
  //   const getAllContacts = async () => {
  //     const allContacts = await retrieveContacts();
  //     if (allContacts) {
  //       setContacts(allContacts);
  //     }
  //   };
  //   getAllContacts();
  // }, []);

  ///* API CALLS FOR CRUD OPERATIONS */
  // const retrieveContacts = async () => {
  //   const response = await api.get("/contacts");
  //   return response.data;
  // };

  // const addContactHandler = async (contact) => {
  //   const request = {
  //     id: uuid(),
  //     ...contact,
  //   };

  //   const response = await api.post("/contacts", request);
  //   setContacts([...contacts, response.data]);
  // };

  // const removeContactHandler = async (id) => {
  //   await api.delete(`/contacts/${id}`);
  //   const newContactList = contacts.filter((contact) => {
  //     return contact.id !== id;
  //   });
  //   setContacts(newContactList);
  // };

  // const updateContactHandler = async (contact) => {
  //   const response = await api.put(`/contacts/${contact.id}`, contact);
  //   const { id } = response.data;
  //   setContacts(
  //     contacts.map((contact) => {
  //       return contact.id === id ? { ...response.data } : contact;
  //     })
  //   );
  // };

  /* SEARCHING DATA */
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  /* ADDING DATA IN localStorage */
  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  /* REMOVING DATA IN localStorage */
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  /* UPDATING DATA IN localStorage */
  const updateContactHandler = (updatedContact) => {
    setContacts(
      contacts.map((item) => {
        return item.id === updatedContact.id ? { ...updatedContact } : item;
      })
    );
  };

  /* FETCH DATA FROM localStorage FOR FIRST TIME */
  useEffect(() => {
    const retrieveContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  /*  SAVING DATA LOCALLY IN BROWSER */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                removeContactHandler={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            exact
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/contact/:id"
            exact
            render={(props) => <ContactDetail {...props} />}
          />

          <Route
            path="/edit"
            exact
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
