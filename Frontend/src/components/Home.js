import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
export default class Home extends Component {
    customer(e){
        e.preventDefault();
        localStorage.setItem('usermode','customer');
    }
    vendor(e){
        e.preventDefault();
        localStorage.setItem('usermode','vendor');
    }
    render() {
        return (
        <div >
            <Button onClick={this.customer.bind(this)} > Customer </Button>  
            <Button onClick={this.vendor.bind(this)} > vendor </Button>  
        </div>
        );
        };
};