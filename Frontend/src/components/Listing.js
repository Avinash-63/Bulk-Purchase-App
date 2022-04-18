import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table, Button, Input } from 'reactstrap';

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemName: '',
            ItemQuantity: '',
            Added_items: [],
            Vendor_name: localStorage.getItem('username'),
            ItemPrice: null,
            Deleted_item: '',
            dispatch_item: '',
            Status_Items: [],
            dispatched_items: [],
            cancelled_items: [],
            ready_to_dispatch: [],
            review: [],
            Deleted_VendorName: localStorage.getItem('username'),
            id: null
        }
        this.handle_add_Submit = this.handle_add_Submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handle_dispatch = this.handle_dispatch.bind(this);
        this.handle_cancel = this.handle_cancel.bind(this);
        this.handle_delete_Submit = this.handle_delete_Submit.bind(this);
    }

    componentDidMount() {
        this.handle_view_Submit();
        this.add_dispatcheditems();
        this.add_cancelleditems();
        this.add_readytodispatchitems();
        this.getreview();
    };

    getreview() {
        const here = {
            OrderedVendorName: localStorage.getItem('username')
        };
        axios({
                url: 'http://localhost:5000/api/review',
                method: 'PUT',
                data: here

            })
            .then((response) => {
                this.setState({ review: response.data });
                console.log("Data reviewd:", this.state.review);
            })
            .catch((err) => {
                console.log("Error", err);
            });
    }
    add_readytodispatchitems() {
        const added_item = {
            VendorName: localStorage.getItem('username'),
            IsDispatched: 0
        };
        axios({
                url: 'http://localhost:5000/api/items/dispatch',
                method: 'PUT',
                data: added_item
            })
            .then((response) => {
                this.setState({ ready_to_dispatch: response.data })
            })
    }
    add_dispatcheditems() {
        const added_item = {
            VendorName: localStorage.getItem('username'),
            IsDispatched: 1
        };
        axios({
                url: 'http://localhost:5000/api/items/dispatch',
                method: 'PUT',
                data: added_item
            })
            .then((response) => {
                this.setState({ dispatched_items: response.data })
            })
    }

    add_cancelleditems() {
        const added_item = {
            VendorName: localStorage.getItem('username'),
            IsDispatched: 2
        };
        axios({
                url: 'http://localhost:5000/api/items/dispatch',
                method: 'PUT',
                data: added_item
            })
            .then((response) => {
                this.setState({ cancelled_items: response.data })
            })
    }

    handle_dispatch() {
        let here = [];
        let j = 0;
        const added_item = {
            ItemName: this.state.dispatch_item,
            VendorName: localStorage.getItem('username')
        };
        axios({
                url: 'http://localhost:5000/api/items/cancel',
                method: 'PUT',
                data: added_item
            })
            .then((response) => {
                console.log("meq", response.IsDispatched);
                if (response.IsDispatched != 2) {
                    const added_item = {
                        ItemName: this.state.dispatch_item,
                        VendorName: localStorage.getItem('username'),
                        IsDispatched: 1
                    };
                    axios({
                            url: 'http://localhost:5000/api/items',
                            method: 'PUT',
                            data: added_item
                        })
                        .then(() => {
                            console.log("Data Dispatched");
                            // this.handle_view_Submit();
                        })
                        .catch(() => {
                            console.log("Error");
                        });
                    // event.preventDefault();
                }
            })
    }

    handle_cancel() {
        let here = [];
        let j = 0;
        const added_item = {
            ItemName: this.state.dispatch_item,
            VendorName: localStorage.getItem('username')
        };
        axios({
                url: 'http://localhost:5000/api/items/cancel',
                method: 'PUT',
                data: added_item
            })
            .then((response) => {
                console.log("meq", response.IsDispatched);
                if (response.IsDispatched != 1) {
                    const added_item = {
                        ItemName: this.state.cancel_item,
                        VendorName: localStorage.getItem('username'),
                        IsDispatched: 2
                    };
                    axios({
                            url: 'http://localhost:5000/api/items',
                            method: 'PUT',
                            data: added_item
                        })
                        .then(() => {
                            console.log("Data Cancelled");
                            // this.handle_view_Submit();
                        })
                        .catch(() => {
                            console.log("Error");
                        });
                }
            })

        // event.preventDefault();
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handle_add_Submit(event) {
        const added_item = {
            ItemName: this.state.ItemName,
            ItemQuantity: this.state.ItemQuantity,
            VendorName: localStorage.getItem('username'),
            ItemPrice: this.state.ItemPrice,
            IsDispatched: 0
        };

        axios({
                url: 'http://localhost:5000/api/items',
                method: 'POST',
                data: added_item
            })
            .then(() => {
                console.log("Data added");
                this.handle_view_Submit();
            })
            .catch(() => {
                console.log("Error");
            });
        event.preventDefault();
    }

    handle_view_Submit(event) {
        axios({
                url: 'http://localhost:5000/api/items',
                method: 'GET'
            })
            .then((response) => {
                this.setState({ Added_items: response.data });
                console.log("Data viewed");
            })
            .catch(() => {
                console.log("Error");
            });
        // event.preventDefault();
    }

    // View_items = () => {
    //         const data = this.state.Added_items;

    //         if (!data.length) return null;
    //         return ( <
    //             div > {
    //                 data.map(function(d, idx) {
    //                         return ( < li key = { idx } > { d.ItemName } < /li>)
    //                         })
    //                 } <
    //                 /div>
    //             );
    //         }

    handle_delete_Submit = () => {
        const deleted_item = {
            ItemName: this.state.Deleted_item,
            VendorName: localStorage.getItem('username')
        };

        axios({
                url: 'http://localhost:5000/api/items/',
                method: 'DELETE',
                data: deleted_item
            })
            .then((response) => {
                console.log("Data deleted");
            })
            .catch(() => {
                console.log("Error");
            });
    }

    render() {
        return ( <
            div >
            <
            form onSubmit = { this.handle_add_Submit } >
            <
            input type = "string"
            name = "ItemName"
            placeholder = "ItemName"
            value = { this.state.ItemName }
            onChange = { this.handleChange }
            required >
            <
            /input> <
            input type = "number"
            name = "ItemQuantity"
            placeholder = "ItemQuantity"
            value = { this.state.ItemQuantity }
            onChange = { this.handleChange }
            required >
            <
            /input> <
            input type = "string"
            name = "Vendor_name"
            placeholder = "Vendor_name"
            value = { this.state.Vendor_name }
            onChange = { this.handleChange }
            required >
            <
            /input> <
            input type = "number"
            name = "ItemPrice"
            placeholder = "ItemPrice"
            value = { this.state.ItemPrice }
            onChange = { this.handleChange }
            required >
            <
            /input> <
            Button type = "submit" > Add Item < /Button> < /
            form > { /* <Button onClick={this.View_items}>View Items</Button> */ } <
            form onSubmit = { this.handle_delete_Submit } >
            <
            input type = "string"
            name = "Deleted_item"
            placeholder = "ItemName"
            value = { this.state.Deleted_item }
            onChange = { this.handleChange }
            required >
            <
            /input> <
            input type = "string"
            name = "Deleted_VendorName"
            placeholder = "Vendor_name"
            value = { this.state.Deleted_VendorName }
            onChange = { this.handleChange }
            required >
            <
            /input> <
            Button type = "submit" > Delete Item < /Button> < /
            form >

            <
            form onSubmit = { this.handle_dispatch } >
            <
            input type = "string"
            name = "dispatch_item"
            placeholder = "dispatch_item"
            value = { this.state.dispatch_item }
            onChange = { this.handleChange }
            required >
            <
            /input ><
            Button type = "submit" > Dispatch Item < /Button>  < /
            form >
            <
            form onSubmit = { this.handle_cancel } >
            <
            input type = "string"
            name = "cancel_item"
            placeholder = "cancel_item"
            value = { this.state.cancel_item }
            onChange = { this.handleChange }
            required >
            <
            /input ><
            Button type = "submit" > Cancel Item < /Button>  < /
            form >
            <
            div > < h5 > Items Ready to dispatch < /h5>< Table size = "sm"
            bordered dark >
            <
            thead >
            <
            tr >
            <
            th > # < /th> <
            th > Item < /th> < /
            tr > <
            /thead> <
            tbody > {
                this.state.ready_to_dispatch.map(function(d, idx) {
                    return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> < td > {  d.ItemName } < /td > < /tr > < /Fragment > )
                })
            } < /tbody></Table > <
            /div> <
            div > < h5 > Dispatched Items < /h5>< Table size = "sm"
            bordered dark >
            <
            thead >
            <
            tr >
            <
            th > # < /th> <
            th > Item < /th> < /
            tr > <
            /thead> <
            tbody > {
                this.state.dispatched_items.map(function(d, idx) {
                    return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> < td > {  d.ItemName } < /td > < /tr > < /Fragment > )
                })
            } < /tbody></Table > <
            /div>  <
            div > < h5 > Reviews on Dispatched Items < /h5>< Table size = "sm"
            bordered dark >
            <
            thead >
            <
            tr >
            <
            th > # < /th> <
            th > Item < /th><
            th > Rating < /th><
            th > Review < /th> < /
            tr > <
            /thead> <
            tbody > {
                this.state.review.map(function(d, idx) {
                    return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> < td > {  d.OrderedItemName } < /td > < td > { d.Rating } < /td > < td > {  d.Review } < /td > < /tr > < /Fragment > )
                })
            } < /tbody></Table > <
            /div>  <
            div > < h5 > Cancelled Items < /h5>< Table size = "sm"
            bordered dark >
            <
            thead >
            <
            tr >
            <
            th > # < /th> <
            th > Item < /th> < /
            tr > <
            /thead> <
            tbody > {
                this.state.cancelled_items.map(function(d, idx) {
                    return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> <td>{  d.ItemName }</td > < / tr></Fragment > )
                })
            } < /tbody></Table > <
            /div> 

            <
            /
            div >
        );
    }
}

export default Listing;