const express = require('express');
const router = express.Router();

//Item model
const rate = require('../../models/review');

//GET request
router.get('/', (req, res) => {
    rate.find()
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

router.put('/', (req, res) => {
    rate.find({ OrderedVendorName: req.body.OrderedVendorName })
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
// router.post('/', (req, res) => {
//     console.log("item:" + req.body.ordered_ItemName);
//     const neworder = new orders({
//         OrderedItemName: req.body.ordered_ItemName,
//         OrderedItemQuantity: req.body.ordered_ItemQuantity,
//         OrderedVendorName: req.body.Searched_VendorName,
//         OrderedItemPrice: req.body.ItemPrice,
//         OrderedStatus: req.body.OrderedStatus,
//         OrderedCustomer: req.body.OrderedCustomer
//     });
//     neworder.save().then(item => {
//         res.json(item);
//     });
// });

//DELETE request
// router.delete('/', (req, res) => {
//     console.log(req);
//     if (req.body.type == 'view') {
//         orders.find({ OrderedCustomer: req.body.OrderedCustomer })
//             // .then(item => item.remove().then(() => res.json({ success: true })))
//             // .catch(err => res.status(404).json({ success: false }));
//             .then((items) => {
//                 console.log('Data: ', items);
//                 res.json(items);
//             })
//             .catch((error) => {
//                 console.log('error: ', error);
//             });
//     }
// });

router.post('/', (req, res) => {
    // console.log("item:" + req.body.ordered_ItemName);
    const neworder = new review({
        OrderedItemName: req.body.OrderedItemName,
        OrderedVendorName: req.body.OrderedVendor,
        OrderedCustomer: req.body.OrderedCustomer,
        Rating: req.body.Rating,
        Review: req.body.Review
    });
    neworder.save().then(item => {
        res.json(item);
    });
})


module.exports = router;