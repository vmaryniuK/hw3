export const UpdateContactList = ContactList => {
  return {
    type: "UPDATE_CONTACT_LIST",
    payload: ContactList
  };
};

export const GetCurrentContact = (currentContact) => {
  return{
    type: "GET_CURRENT_CONTACT",
    payload: currentContact
  }
}   

