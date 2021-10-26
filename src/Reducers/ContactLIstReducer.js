const initialState = {
  List: [],
  CurrentContact: ""
};

const ContactListReducer = (state = initialState, action) => {
  console.log("ContactListReducer ", action.payload);
  switch (action.type) {
    case "UPDATE_CONTACT_LIST":
      return {
        ...state,
        List: action.payload
      };
    case "GET_CURRENT_CONTACT":
      return{
        ...state,
        CurrentContact: action.payload
      }
    default:
      return state;
  }
};

export default ContactListReducer;
