import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UpdateContactList, GetCurrentContact } from "../../../../Actions/ContactListActions";
import API from "../../../../Services/APIService";

const ContactItem = ({
  Id,
  Name,
  Avatar,
  Phone,
  Email,
  Status,
  Gender,
  UpdateContactList,
  GetCurrentContact,
  List
}) => {
  const image = `https://api.randomuser.me/portraits/${Gender}/${Avatar}.jpg`;

  let statusColor = "";
  switch (Status) {
    case "Friend":
      statusColor = "lab lab-warning";
      break;
    case "Work":
      statusColor = "lab lab-success";
      break;
    case "Family":
      statusColor = "lab lab-primary";
      break;
    case "Private":
      statusColor = "lab lab-danger";
      break;
    default:
  }

  const onStateChange = Id => {
    const index = List.findIndex(elem => elem.Id === Id);
    const contact = List[index];
    switch (contact.Status) {
      case "Friend":
        contact.Status = "Work";
        break;
      case "Work":
        contact.Status = "Family";
        break;
      case "Family":
        contact.Status = "Private";
        break;
      case "Private":
        contact.Status = "Friend";
        break;
      default:
    }

    const tmpList = List.slice();
    tmpList[index] = contact;
    API.UpdateDatabase(tmpList).then(() => {
      UpdateContactList(tmpList);
    })
  };

  const onDelete = Id => {
    const index = List.findIndex(elem => elem.Id === Id);
    let tmpList = List.slice();
    const partOne = tmpList.slice(0, index);
    const partTwo = tmpList.slice(index + 1);
    tmpList = [...partOne, ...partTwo];
    API.UpdateDatabase(tmpList).then(() => {
      UpdateContactList(tmpList);
    })
  };

  const onEditContact = (Id) => {
    const index = List.findIndex(elem => elem.Id === Id);
    let tmpList = List.slice();
    const currentContact = tmpList[index];
    GetCurrentContact(currentContact)
  }

  return (
    <div className="unit">
      <div className="field name">
        <div className="check">
          <input id="cb2" name="cb1" type="checkbox" />
          <label htmlFor="cb2"></label>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
        <div>
          <img src={image} alt="image" className="avatar" /> {Name}
        </div>
        <div className={statusColor} onClick={() => {onStateChange(Id)}}>{Status}</div>
      </div>
      <div className="field phone">{Phone}</div>
      <div className="field email">{Email}</div>
      <div className="contactIcons">
        <Link to="/edit-contact">
          <i className="far fa-edit fa-2x" onClick={() => onEditContact(Id)}></i>
        </Link>
        <i className="far fa-trash-alt fa-2x" onClick={() => onDelete(Id)}></i>
      </div>
    </div>
  );
};

const mapStateToProps = ({ ContactListReducer }) => {
  const { List } = ContactListReducer;
  return { List };
};

const mapDispatchToProps = {
  UpdateContactList, GetCurrentContact
};


export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
