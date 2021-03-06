import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import history from "./history";
import { Redirect } from "react-router";
// export const test = true;

export default class CustomerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerName: '',
            CustomerPasswd: '',
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
            CustomerName: this.state.CustomerName,
            CustomerPasswd: this.state.CustomerPasswd
        };

        axios({
                url: 'http://localhost:5000/api/Customers/login',
                method: 'POST',
                data: added_item
            })
            .then((res) => {
                // console.log("Data added", res);
                // this.setState({ loggedin: true });
                if (res.status == 200) {
                    localStorage.setItem('customertoken', res.data);
                    localStorage.setItem('username', this.state.CustomerName);
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
        if (localStorage.getItem('customertoken') !== '') {
            return <Redirect to = "/Customers_actions" / >
        }
        return ( <
            div >
            <
            form onSubmit = { this.handle_Submit } >
            <
            input type = "string"
            name = "CustomerName"
            placeholder = "CustomerName"
            value = { this.state.CustomerName }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            input type = "string"
            name = "CustomerPasswd"
            placeholder = "CustomerPasswd"
            value = { this.state.CustomerPasswd }
            onChange = { this.handleChange }
            required >
            <
            /input>  <
            button type = "submit" > Customer Login < /button>  < /
            form > <
            /div>
        );
    }
}