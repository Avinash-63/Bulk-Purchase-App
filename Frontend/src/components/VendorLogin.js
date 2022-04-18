import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import history from "./history";
import { Redirect } from "react-router";
// export const test = true;

export default class VendorLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VendorName: '',
            VendorPasswd: '',
            loggedin: false
        }
        this.handle_Submit = this.handle_Submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handle_Submit(event) {
        const added_item = {
            VendorName: this.state.VendorName,
            VendorPasswd: this.state.VendorPasswd
        };

        axios({
                url: 'http://localhost:5000/api/Vendors/login',
                method: 'POST',
                data: added_item
            })
            .then((res) => {
                // console.log("Data added", res);
                // this.setState({ loggedin: true });
                if (res.status == 200) {
                    localStorage.setItem('usertoken', res.data);
                    localStorage.setItem('username', this.state.VendorName);
                    window.location.reload(false);
                }
                // history.push('/Items_actions');

            })
            .catch(() => {
                alert("Eneterd Credentials are incorrect...");
                console.log("Error");
                this.setState({ loggedin: false });
            });
        event.preventDefault();
    }

    render() {
        if (localStorage.getItem('usertoken') !== '') {
            return <Redirect to = "/items_actions" / >
        }
        return ( <
            div >
            <
            form onSubmit = { this.handle_Submit } >
            <
            input type = "string"
            name = "VendorName"
            placeholder = "VendorName"
            value = { this.state.VendorName }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            input type = "string"
            name = "VendorPasswd"
            placeholder = "VendorPasswd"
            value = { this.state.VendorPasswd }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            button type = "submit" > Vendor Login < /button>  < /
            form > <
            /div>
        );
    }
}