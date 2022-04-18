import React, { Component, Fragment } from 'react';
import axios from 'axios';
// import { FaStar } from 'react-icons/fa';
import { Table, Button, Input } from 'reactstrap';

class Customer_actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemName: '',
            ItemQuantity: '',
            Added_items: [],
            Searched_items: [],
            Searched_ItemName: '',
            Searched_VendorName: '',
            ordered_ItemQuantity: '',
            ordered_ItemName: '',
            Ordered_items: [],
            rating_items: [],
            Orders: [],
            id: null,
            deletedItem: '',
            originalquantityofordereditem: 0,
            VendorName: '',
            ItemPrice: 0,
            IsDispatched: 0,
            Rating: 0,
            Rating_itemname: '',
            Status_Items: [],
            del: 0,
            Rating_reviewitemname: '',
            Rating_reviewvendorname: '',
            review: '',
            Ratingreview: 0,
            avg_vendor: '',
            avg: []
        }
        this.handle_add_Submit = this.handle_add_Submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handle_delete_Submit = this.handle_delete_Submit.bind(this);
        this.handle_search_submit = this.handle_search_submit.bind(this);
        this.handle_order_submit = this.handle_order_submit.bind(this);
        this.update = this.update.bind(this);
        // this.handle_status = this.handle_status.bind(this);
        this.status_update = this.status_update.bind(this);
        this.rating = this.rating.bind(this);
        this.addreview = this.addreview.bind(this);
        // this.avgrating = this.avgrating.bind(this);
    }

    componentDidMount() {
        this.handle_view_Submit();
        this.handle_view_orders();
        this.handle_status();
        this.tobereviewditems();
    };

    // avgrating() {
    //     const here = {
    //         OrderedVendorName: this.state.avg_vendor
    //     };
    //     axios({
    //             url: 'http://localhost:5000/api/review',
    //             method: 'PUT',
    //             data: here

    //         })
    //         .then((response) => {
    //             this.setState({ avg: response.data });
    //             console.log("Data reviewd:", this.state.review);
    //             let it=0
    //             for(it=0;it<avg.length;)
    //         })
    //         .catch((err) => {
    //             console.log("Error", err);
    //         });
    // }
    tobereviewditems() {
        const here_data = {
            OrderedCustomer: localStorage.getItem('username'),
            OrderedItemName: this.state.Rating_itemname,
            OrderedVendor: this.state.Rating_vendorname
        }
        axios({
                url: 'http://localhost:5000/api/myorders/rating',
                method: 'PUT',
                data: here_data
            })
            .then((response) => {
                this.setState({ rating_items: response.data });
                console.log("Data viewed jkl");
            })
            .catch(() => {
                console.log("Error");
            });
    }
    rating() {
        const here_data = {
            OrderedCustomer: localStorage.getItem('username'),
            OrderedItemName: this.state.Rating_itemname,
            Rating: this.state.Rating,
            OrderedVendor: this.state.Rating_vendorname
        }
        axios({
                url: 'http://localhost:5000/api/rating',
                method: 'POST',
                data: here_data
            })
            .then((response) => {
                console.log("Data viewed jkl");
            })
            .catch(() => {
                console.log("Error");
            });
    }
    addreview() {
        const here_data = {
                OrderedCustomer: localStorage.getItem('username'),
                OrderedItemName: this.state.Rating_reviewitemname,
                Rating: this.state.Ratingreview,
                OrderedVendor: this.state.Rating_reviewvendorname,
                Review: this.state.review
            }
            // // const added_item = {
            // //     ItemName: this.state.Rating_reviewitemname,
            // //     VendorName: this.state.Rating_reviewvendorname
            // // };
            // // axios({
            // //         url: 'http://localhost:5000/api/items/cancel',
            // //         method: 'PUT',
            // //         data: added_item
            // //     })
            // //     .then((response) => {
            // //         console.log("me", response);
            //         if (response.IsDispatched == 1) {
        axios({
                url: 'http://localhost:5000/api/review',
                method: 'POST',
                data: here_data
            })
            .then((response) => {
                console.log("Data viewed resd", response);
            })
            .catch((err) => {
                console.log("Errorrev", err);
            });
        // }
        // })
        // .catch(() => {
        // console.log("Error");
        // });
    }

    status_update(here) {
        let it = 0;
        console.log("su", here.length);
        console.log("su" + here);
        while (it < here.length) {
            console.log(it);
            // if(here){
            if (here[it][2] == 0 && here[it][5] == 1) {
                console.log("dis" + here[2] + here[5]);
                const ordered_item = {
                    ordered_ItemName: here[it][1],
                    ordered_VendorName: here[it][3],
                    // quantity:here[2],
                    OrderedStatus: "Dispatched"
                        // id:here[it][0]
                };
                axios({
                        url: 'http://localhost:5000/api/myorders',
                        method: 'PUT',
                        data: ordered_item
                    })
                    .then((response) => {
                        console.log("Updated to dispatched state");
                    })
                    .catch(() => {
                        console.log("Error");
                    });

            } else if (here[it][2] == 0 && here[it][5] == 0) {
                console.log("pla" + here[it][2] + here[it][5]);
                const ordered_item = {
                    ordered_ItemName: here[it][1],
                    ordered_VendorName: here[it][3],
                    // quantity:here[2],
                    OrderedStatus: "Placed"
                        // id:here[it][0]
                };
                console.log("dekh" + ordered_item.id);
                axios({
                        url: 'http://localhost:5000/api/myorders',
                        method: 'PUT',
                        data: ordered_item
                    })
                    .then((response) => {
                        console.log("Updated to Placed state");
                    })
                    .catch((err) => {
                        console.log("Error1:" + err);
                    });
                // }  
            } else if (here[it][2] == 0 && here[it][5] == 2) {
                console.log("pla" + here[it][2] + here[it][5]);
                const ordered_item = {
                    ordered_ItemName: here[it][1],
                    ordered_VendorName: here[it][3],
                    // quantity:here[2],
                    OrderedStatus: "Placed"
                        // id:here[it][0]
                };
                console.log("dekh" + ordered_item.id);
                axios({
                        url: 'http://localhost:5000/api/myorders',
                        method: 'PUT',
                        data: ordered_item
                    })
                    .then((response) => {
                        console.log("Updated to Placed state");
                    })
                    .catch((err) => {
                        console.log("Error1:" + err);
                    });
                // }  
            }
            it = it + 1;
        }
    }
    handle_status() {
        let here = [];
        axios({
                url: 'http://localhost:5000/api/items',
                method: 'GET'
            })
            .then((response) => {
                this.setState({ Status_Items: response.data });
                console.log("New:" + this.state.Status_Items);
                this.state.Status_Items.map(function(d, idx) {
                    here.push(Object.values(d));
                    // console.log(here);
                    // console.log(here.length);
                    // console.log(here[0][0]);
                })
                let it = 0;
                console.log("su", here.length);
                console.log("su" + here);
                while (it < here.length) {
                    console.log(it);
                    // if(here){
                    if (here[it][2] == 0 && here[it][5] == 1) {
                        console.log("dis" + here[2] + here[5]);
                        const ordered_item = {
                            ordered_ItemName: here[it][1],
                            ordered_VendorName: here[it][3],
                            // quantity:here[2],
                            OrderedStatus: "Dispatched"
                                // id:here[it][0]
                        };
                        axios({
                                url: 'http://localhost:5000/api/myorders',
                                method: 'PUT',
                                data: ordered_item
                            })
                            .then((response) => {
                                console.log("Updated to dispatched state");
                            })
                            .catch(() => {
                                console.log("Error");
                            });

                    } else if (here[it][2] == 0 && here[it][5] == 0) {
                        console.log("pla" + here[it][2] + here[it][5]);
                        const ordered_item = {
                            ordered_ItemName: here[it][1],
                            ordered_VendorName: here[it][3],
                            // quantity:here[2],
                            OrderedStatus: "Placed"
                                // id:here[it][0]
                        };
                        console.log("dekh" + ordered_item.id);
                        axios({
                                url: 'http://localhost:5000/api/myorders',
                                method: 'PUT',
                                data: ordered_item
                            })
                            .then((response) => {
                                console.log("Updated to Placed state");
                            })
                            .catch((err) => {
                                console.log("Error1:" + err);
                            });
                        // }  
                    } else if (here[it][5] == 2) {
                        console.log("pla" + here[it][2] + here[it][5]);
                        const ordered_item = {
                            ordered_ItemName: here[it][1],
                            ordered_VendorName: here[it][3],
                            // quantity:here[2],
                            OrderedStatus: "Cancelled"
                                // id:here[it][0]
                        };
                        console.log("dekh" + ordered_item.id);
                        axios({
                                url: 'http://localhost:5000/api/myorders',
                                method: 'PUT',
                                data: ordered_item
                            })
                            .then((response) => {
                                console.log("Updated to Placed state");
                            })
                            .catch((err) => {
                                console.log("Error1:" + err);
                            });
                        // }  
                    }
                    it = it + 1;
                }
                // this.status_update(here);
            })
            .catch((err) => {
                console.log("Error", err);
            });

    };
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handle_add_Submit(event) {
        const added_item = {
            ItemName: this.state.ItemName,
            ItemQuantity: this.state.ItemQuantity
        };

        axios({
                url: 'http://localhost:5000/api/customers_requests',
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

    handle_view_Submit() {
        axios({
                url: 'http://localhost:5000/api/customers_requests',
                method: 'GET'
            })
            .then((response) => {
                this.setState({ Added_items: response.data });
                console.log("Data viewed");
            })
            .catch(() => {
                console.log("Error");
            });
    }
    handle_view_orders() {
        const added_item = {
            OrderedCustomer: localStorage.getItem('username'),
            type: "view"
        };
        axios({
                url: 'http://localhost:5000/api/myorders',
                method: 'DELETE',
                data: added_item
            })
            .then((response) => {
                this.setState({ Orders: response.data });
                console.log("Data viewed");
                console.log(added_item.OrderedCustomer);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    handle_delete_Submit = () => {
        const deleted_item = {
            deletedItem: this.state.deletedItem,
            Searched_VendorName: this.state.VendorName
        };

        axios({
                url: 'http://localhost:5000/api/customers_requests/',
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

    handle_search_submit = (event) => {
        const searched_item = {
            Searched_ItemName: this.state.Searched_ItemName
        };
        axios({
                url: 'http://localhost:5000/api/customers_requests/search',
                method: 'PUT',
                data: searched_item
            })
            .then((response) => {
                console.log(response.data[0]);
                this.setState({ Searched_items: response.data });
                console.log("ActDataa :" + this.state.Searched_items[0]);
                // this.forceUpdate();
            })
            .catch(() => {
                console.log("Error");
            });
        event.preventDefault();
    }

    update = () => {
            // if (this.state.OrderedItemQuantity >= this.state.originalquantityofordereditem) {
            const deleted_item = {
                deletedItem: this.state.ordered_ItemName,
                Searched_VendorName: this.state.VendorName
            };
            axios({
                    url: 'http://localhost:5000/api/customers_requests/',
                    method: 'DELETE',
                    data: deleted_item
                })
                .then(() => {
                    console.log("Data deleted");
                })
                .catch(() => {
                    console.log("Error in del");
                });

            const ordered_item = {
                ordered_ItemName: this.state.ordered_ItemName,
                ordered_ItemQuantity: this.state.ordered_ItemQuantity,
                Searched_VendorName: this.state.VendorName,
                ItemPrice: this.state.ItemPrice,
                OrderedStatus: "Waiting",
                OrderedCustomer: localStorage.getItem('username')
            };
            axios({
                    url: 'http://localhost:5000/api/myorders',
                    method: 'POST',
                    data: ordered_item
                })
                .then((response) => {
                    this.setState({ Ordered_items: Object.values(response.data) });
                    console.log("actord_Data :" + response.data.OrderedItemName + response.data.OrderedItemQuantity);
                })
                .catch(() => {
                    console.log("Error");
                });

            const added_item = {
                ItemName: this.state.ordered_ItemName,
                ItemQuantity: this.state.originalquantityofordereditem - this.state.ordered_ItemQuantity,
                VendorName: this.state.VendorName,
                ItemPrice: this.state.ItemPrice,
                IsDispatched: this.state.IsDispatched
            };
            console.log("check:" + added_item.ItemQuantity)
            axios({
                    url: 'http://localhost:5000/api/customers_requests',
                    method: 'POST',
                    data: added_item
                })
                .then(() => {
                    console.log("Data added");
                    this.handle_view_Submit();
                    this.handle_status();
                })
                .catch(() => {
                    console.log("Error");
                });
        }
        // }

    handle_order_submit = (event) => {

        const searched_item = {
            Searched_ItemName: this.state.ordered_ItemName,
            Searched_VendorName: this.state.VendorName
        };
        axios({
                url: 'http://localhost:5000/api/customers_requests',
                method: 'PUT',
                data: searched_item
            })
            .then((response) => {
                console.log(response.data[0]);
                console.log(response.data[0].ItemName);
                console.log(response.data[0].ItemQuantity);
                console.log(response.data[0].ItemPrice);
                this.setState({ IsDispatched: response.data[0].IsDispatched });
                this.setState({ originalquantityofordereditem: parseInt(response.data[0].ItemQuantity) })
                this.setState({ ItemPrice: parseInt(response.data[0].ItemPrice) });
                console.log(" qua:" + this.state.originalquantityofordereditem);
                // if(this.state.originalquantityofordereditem>this.state.OrderedItemQuantity)
                // {
                if (this.state.ordered_ItemQuantity <= response.data[0].ItemQuantity) {
                    console.log("correct");
                    this.update();
                }
                // }
            })
            .catch((err) => {
                console.log("Error", err);
            });
        event.preventDefault();
    }

    render() {
            return ( <
                div > {
                    /* <form onSubmit={this.handle_add_Submit}>
                                        <input 
                                            type="string" 
                                            name="ItemName" 
                                            placeholder="ItemName" 
                                            value={this.state.ItemName} 
                                            onChange={this.handleChange} 
                                            required>
                                        </input>
                                        <input 
                                            type="number" 
                                            name="ItemQuantity" 
                                            placeholder="ItemQuantity" 
                                            value={this.state.ItemQuantity} 
                                            onChange={this.handleChange} 
                                            required>
                                        </input>
                                        <input 
                                            type="number" 
                                            name="VendorName" 
                                            placeholder="VendorName" 
                                            value={this.state.VendorName} 
                                            onChange={this.handleChange} 
                                            required>
                                        </input>
                                        <Button type="submit">Add Item</Button>
                                    </form> */
                } { /* <Button onClick={this.View_items}>View Items</Button> */ } <
                form onSubmit = { this.handle_order_submit } >
                <
                input type = "string"
                name = "ordered_ItemName"
                placeholder = "ordered_ItemName"
                value = { this.state.ordered_ItemName }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                input type = "number"
                name = "ordered_ItemQuantity"
                placeholder = "ordered_ItemQuantity"
                value = { this.state.ordered_ItemQuantity }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                input type = "string"
                name = "VendorName"
                placeholder = "VendorName"
                value = { this.state.VendorName }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                Button type = "submit" > Place Order < /Button> < /
                form > {
                    /* <form onSubmit={this.handle_delete_Submit}>
                                        <input 
                                            type="string" 
                                            name="deletedItem" 
                                            placeholder="deletedItem" 
                                            value={this.state.deletedItem} 
                                            onChange={this.handleChange} 
                                            required>
                                        </input>
                                        <Button type="submit">Delete Item</Button>
                                    </form> */
                } <
                form onSubmit = { this.handle_search_submit } >
                <
                input type = "string"
                name = "Searched_ItemName"
                placeholder = "Searched_ItemName"
                value = { this.state.Searched_ItemName }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                Button type = "submit" > Search Item < /Button> < /
                form > {
                    /* <div>
                                        {this.state.Added_items.map(function(d, idx){
                                        return (<li key={idx}>{"Item:"+d.ItemName},{"Quantity:"+d.ItemQuantity}</li>)
                                        })}
                                    </div> */
                } <
                form onSubmit = { this.rating } >
                <
                input type = "string"
                name = "Rating_itemname"
                placeholder = "Rating_itemname"
                value = { this.state.Rating_itemname }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                input type = "Rating"
                name = "Rating"
                placeholder = "Rating"
                value = { this.state.Rating }
                onChange = { this.handleChange }
                required >
                <
                /input>  <
                input type = "string"
                name = "Rating_vendorname"
                placeholder = "Vendor"
                value = { this.state.Rating_vendorname }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                Button type = "submit" > Rating < /Button> < /
                form >
                <
                form onSubmit = { this.addreview } >
                <
                input type = "string"
                name = "Rating_reviewitemname"
                placeholder = "Rating_itemname"
                value = { this.state.Rating_reviewitemname }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                input type = "number"
                name = "Ratingreview"
                placeholder = "Rating"
                value = { this.state.Ratingreview }
                onChange = { this.handleChange }
                required >
                <
                /input>  <
                input type = "string"
                name = "Rating_reviewvendorname"
                placeholder = "Vendor"
                value = { this.state.Rating_reviewvendorname }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                input type = "string"
                name = "review"
                placeholder = "review"
                value = { this.state.review }
                onChange = { this.handleChange }
                required >
                <
                /input> <
                Button type = "submit" > Review < /Button> < /
                form >
                <
                div > < h5 > Search Results < /h5>< Table size = "sm"
                bordered dark >
                <
                thead >
                <
                tr >
                <
                th > # < /th> <
                th > Item < /th> <
                th > Quantity Left < /th> <
                th > Vendor < /th> <
                th > Price < /th>  < /
                tr > <
                /thead> <
                tbody > {
                    this.state.Searched_items.map(function(d, idx) {
                            const here = Object.values(d);
                            return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> < td > {  here[1] } < /td > < td > { here[2] } < /td > < td > { here[3] } < /td > < td > { here[4] } < /td > < /tr > < /Fragment > )
                            })
                    } < /tbody></Table > <
                    /div> <
                    div > < h5 > My Orders < /h5>< Table size = "sm"
                    bordered dark >
                    <
                    thead >
                    <
                    tr >
                    <
                    th > # < /th> <
                    th > Item < /th> <
                    th > Quantity Ordered < /th> <
                    th > Vendor < /th> <
                    th > Price < /th> <
                    th > Status < /th> < /
                    tr > <
                    /thead> <
                    tbody > {
                        this.state.Orders.map(function(d, idx) {
                            const here = Object.values(d);
                            return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> < td > {  here[1] } < /td > < td > { here[2] } < /td > < td > {  here[3] } < /td > < td > { here[4] } < /td > < td > { here[5] } < /td > < /tr > < /Fragment > )
                        })
                    } < /tbody></Table > <
                    /div>   <
                    h5 > Orders to be rated < /h5> <
                    div > < Table size = "sm"
                    bordered dark >
                    <
                    thead >
                    <
                    tr >
                    <
                    th > # < /th> <
                    th > Item < /th> <
                    th > Quantity Left < /th> <
                    th > Vendor < /th> <
                    th > Price < /th>  < /
                    tr > <
                    /thead> <
                    tbody > {
                        this.state.rating_items.map(function(d, idx) {
                                const here = Object.values(d);
                                return ( < Fragment > < tr key = { idx } > < td > { idx + 1 } < /td> < td > {  here[1] } < /td > < td > { here[2] } < /td > < td > { here[3] } < /td > < td > { here[4] } < /td > < /tr > < /Fragment > )
                                })
                        } < /tbody></Table > <
                        /div>                < /
                        div >

                    );
                }
            }

            export default Customer_actions;