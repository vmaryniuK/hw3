import { useEffect } from "react";
import ContactItem from "./ContactItem/ContactItem";
import { connect } from "react-redux";
import API from "../../../Services/APIService";
// Import Actions
import { UpdateContactList } from "../../../Actions/ContactListActions";

const ContactList = ({ List, UpdateContactList }) => {
  useEffect(() => {
    API.GetContactList().then(data => {
      UpdateContactList(data);
    });
  }, []);

  const contact = List.map(item => {
    return <ContactItem key={item.Id} {...item} {...item} />;
  });

  return (
    <section>
      {contact.length > 0 ? (
        contact
      ) : (
        <p className="emptyList">Contact list is empty!</p>
      )}
    </section>
  );
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return { List };
};

const mapDispatchToProps = {
  UpdateContactList
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
