import { Component } from "react";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";

// Import actions
import {UpdateContactList } from "../../Actions/ContactListActions";

// Import Api service
import API from "../../Services/APIService";

// Import styles
import "./AddContact.css";


class AddContact extends Component {

    state = {
        Name: "",
        Phone: "",
        Email: "",
        Gender: "",
        Status: "",
        Avatar: null,
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


    onCreateContact = (e) => {
        e.preventDefault();
        const { Name, Phone, Email, Gender, Status, Avatar } = this.state
        const { List, UpdateContactList } = this.props;
        const newContact = {
            Id: uuidv4(),
            Name,
            Phone,
            Email,
            Gender,
            Status,
            Avatar
        }
        // const tmpList = [...List];
        const tmpList = List.slice();
        tmpList.unshift(newContact);

        API.UpdateDatabase(tmpList).then(() => {
            UpdateContactList(tmpList);
            this.setState({
                IsRedirect: true
            })
        })
    }

    render() {
        console.log("PROPS ",this.props)
        let { Gender, Avatar, IsRedirect } = this.state;

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
                        <form onSubmit={this.onCreateContact}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Name</label>
                                <input required type="text" className="form-control" name="Name" onChange={this.onGetName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Phone</label>
                                <input required type="tel" className="form-control" name="Phone" onChange={this.onGetPhone} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Email1">Email address</label>
                                <input required type="email" className="form-control" aria-describedby="emailHelp" name="Email" onChange={this.onGetEmail} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Status</label>
                                <select className="form-control" onChange={this.onGetStatus} >
                                    <option defaultValue>Choose...</option>
                                    <option value="Work">Work</option>
                                    <option value="Family">Family</option>
                                    <option value="Private">Private</option>
                                    <option value="Friends">Friends</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Gender</label>
                                <select className="form-control" onChange={this.onGetGender} >
                                    <option defaultValue>Choose...</option>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Avatar">Avatar</label>
                                <input required type="number" min="0" max="99" name="Avatar" onChange={this.onGetAvatar} className="form-control" aria-describedby="emailHelp" />
                            </div>
                            <button type="submit" className="btn btn-primary">Add new contact</button>
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
    const { List } = ContactListReducer;
    return { List };
}

const mapDispatchToProps = {
    UpdateContactList
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);