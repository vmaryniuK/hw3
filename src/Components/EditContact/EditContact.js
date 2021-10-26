import { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Import actions
import { GetCurrentContact } from "../../Actions/ContactListActions";

// Import services
import API from "../../Services/APIService";


// Import styles
// import "./AddContact.css";


class EditContact extends Component {

    state = {
        Id: this.props.CurrentContact.Id,
        Name: this.props.CurrentContact.Name,
        Phone: this.props.CurrentContact.Phone,
        Email: this.props.CurrentContact.Email,
        Gender: this.props.CurrentContact.Gender,
        Status: this.props.CurrentContact.Status,
        Avatar: this.props.CurrentContact.Avatar,
        IsRedirect: false
    }

    onGetName = (e) => {
        const name = e.target.value;
        this.setState({
            Name: name
        })
    }

    onGetPhone = (e) => {
        const phone = e.target.value;
        this.setState({
            Phone: phone
        })
    }

    onGetEmail = (e) => {
        const email = e.target.value;
        this.setState({
            Email: email
        })
    }

    onGetGender = (e) => {
        const gender = e.target.value;
        this.setState({
            Gender: gender
        })
    }

    onGetStatus = (e) => {
        const status = e.target.value;
        this.setState({
            Status: status
        })
    }

    onGetAvatar = (e) => {
        const avatar = e.target.value;
        this.setState({
            Avatar: avatar
        })
    }


    onEditContact = (e) => {
        e.preventDefault();
        const { Id, Name, Phone, Email, Gender, Status, Avatar } = this.state
        const { GetCurrentContact, List } = this.props;
        const editedContact = {
            Id,
            Name,
            Phone,
            Email,
            Gender,
            Status,
            Avatar
        }

        const index = List.findIndex(elem => elem.Id === Id);
        let tmpList = List.slice();
        
        tmpList[index] = editedContact;
        API.UpdateDatabase(tmpList).then(() => {
            GetCurrentContact(editedContact);
            this.setState({
                IsRedirect: true
            })
        })
    }



    render() {

        let { Gender, Avatar, IsRedirect, Name, Phone, Email, Status } = this.state;
        let avatarNumber = Avatar;
        if (IsRedirect === true) {
            return <Redirect to="/" />
        }

        if ((Avatar == null || Avatar == "") || Gender == "") {
            Avatar = "https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
        }
        else {
            Avatar = `https://api.randomuser.me/portraits/${Gender}/${Avatar}.jpg`
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <form onSubmit={this.onEditContact}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Name</label>
                                <input required type="text" className="form-control" defaultValue={Name} name="Name" onChange={this.onGetName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Phone</label>
                                <input required type="tel" className="form-control" defaultValue={Phone} name="Phone" onChange={this.onGetPhone} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email1">Email address</label>
                                <input required type="email" className="form-control" defaultValue={Email} aria-describedby="emailHelp" name="Email" onChange={this.onGetEmail} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Status</label>
                                <select className="form-control" onChange={this.onGetStatus} defaultValue={Status} >
                                    <option defaultValue>Choose...</option>
                                    <option value="Work">Work</option>
                                    <option value="Family">Family</option>
                                    <option value="Private">Private</option>
                                    <option value="Friends">Friends</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Gender</label>
                                <select className="form-control" onChange={this.onGetGender} defaultValue={Gender}>
                                    <option defaultValue>Choose...</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Avatar">Avatar</label>
                                <input required type="number" min="0" max="99" defaultValue={avatarNumber} name="Avatar" onChange={this.onGetAvatar} className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                    <div className="col-4">
                        <img src={Avatar} className="img-thumbnail avatar" alt="..." />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ContactListReducer}) => {
    const { CurrentContact, List } = ContactListReducer;
    return { CurrentContact, List };
}

const mapDispatchToProps = {
    GetCurrentContact
}

export default  connect(mapStateToProps,mapDispatchToProps)(EditContact);