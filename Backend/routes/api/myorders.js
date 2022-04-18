const express = require('express');
const router = express.Router();

//Item model
const orders = require('../../models/orders');

//GET request
router.get('/', (req, res) => {
    orders.find()
        // .then((items) =>
        //     console.log(items) res.json(items))
        .then((items) => {
            console.log('Data: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

// POST request
router.post('/', (req, res) => {
    console.log("item:" + req.body.ordered_ItemName);
    const neworder = new orders({
        OrderedItemName: req.body.ordered_ItemName,
        OrderedItemQuantity: req.body.ordered_ItemQuantity,
        OrderedVendorName: req.body.Searched_VendorName,
        OrderedItemPrice: req.body.ItemPrice,
        OrderedStatus: req.body.OrderedStatus,
        OrderedCustomer: req.body.OrderedCustomer
    });
    neworder.save().then(item => {
        res.json(item);
    });
    // const original_quantity = null;
    // Item.findOne({ ItemName: req.body.ordered_ItemName })
    //     .then((items) => {
    //         console.log('ord_Data: ', items);
    //         original_quantity = items.ItemQuantity;
    //         // res.json(items);
    //     })
    //     .catch((error) => {
    //         console.log('error: ', error);
    //     });
    // const newItem = new Item({
    //     ItemName: req.body.ordered_ItemName,
    //     ItemQuantity: original_quantity - req.body.ordered_ItemQuantity
    // });
    // Item.findOneAndDelete({ ItemName: req.body.ordered_ItemName })
    //     .then(() => {
    //         console.log('deleted ');
    //     })
    //     .catch((error) => {
    //         console.log('error: ', error);
    //     });

});

//DELETE request
router.delete('/', (req, res) => {
    console.log(req);
    if (req.body.type == 'view') {
        orders.find({ OrderedCustomer: req.body.OrderedCustomer })
            // .then(item => item.remove().then(() => res.json({ success: true })))
            // .catch(err => res.status(404).json({ success: false }));
            .then((items) => {
                console.log('Data: ', items);
                res.json(items);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    }
});

router.put('/', (req, res) => {
    console.log("item:" + req.body.id);
    // orders.findOneAndUpdate({ _id: req.body.id }, { $set: { OrderedStatus: req.body.OrderedStatus } }, { new: true }, function(err, doc) {
    // if (err) {
    // console.log("Something wrong when updating data!");
    // }
    // })
    // orders.findOneAndDelete({ _id: req.body.id })
    // .then(() => console.log("yayy"))
    // .catch((err) => console.log(err));
    // orders.updateMany({ OrderedItemName: req.body.ordered_ItemName, OrderedVendorName: req.body.ordered_VendorName }, { $set: { OrderedStatus: req.body.OrderedStatus } })
    //     .then((res) => {
    //         console.log("Finally");
    //     })
    //     .catch((error) => {
    //         console.log('error: ', error);
    //     });
    orders.find({ OrderedItemName: req.body.ordered_ItemName, OrderedVendorName: req.body.ordered_VendorName })
        // .then((items) =>
        //     console.log(items) res.json(items))
        .then((items) => {
            // console.log('Datahere: ', items);
            // console.log('Datahereafter: ', items[0]);
            // console.log('Datahereafterrrrrr: ', items.length);
            if (req.body.OrderedStatus == "Cancelled") {
                if (req.body.todelete == 0) {
                    return;
                }
            }
            res.json(items);
            let i = 0;
            for (i = 0; i < items.length; i++) {
                console.log(items[i].id);
                orders.findOneAndUpdate({ _id: items[i]._id }, { $set: { OrderedStatus: req.body.OrderedStatus } })
                    .then(() => {
                        // console.log("Updated") 
                    })
            }
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.put('/rating', (req, res) => {
    orders.find({ OrderedCustomer: req.body.OrderedCustomer, OrderedStatus: "Placed" })
        // .then((items) =>
        //     console.log(items) res.json(items))
        .then((items) => {
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

module.exports = router;