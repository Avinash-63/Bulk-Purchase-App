const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//GET request
router.get('/', (req, res) => {
    Item.find()
        // .then((items) =>
        //     console.log(items) res.json(items))
        .then((items) => {
            console.log('Data: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

// POST request
router.post('/', (req, res) => {
    console.log(req.body);
    const newItem = new Item({
        ItemName: req.body.ItemName,
        ItemQuantity: req.body.ItemQuantity,
        VendorName: req.body.VendorName,
        ItemPrice: req.body.ItemPrice,
        IsDispatched: req.body.IsDispatched
    });
    newItem.save().then(item => res.json(item));
});

router.post('/getstatus', (req, res) => {
    Item.find({ ItemName: req.body.OrderedItemName, VendorName: req.body.OrderedVendor })
        .then((items) => {
            console.log('Data rev: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

//DELETE request
router.delete('/', (req, res) => {
    console.log(req);
    Item.findOneAndDelete({ ItemName: req.body.ItemName, VendorName: req.body.VendorName })
        .then(() => console.log("Deletedhere"))
        .catch(err => res.status(404).json({ success: false }));
});

router.put('/', (req, res) => {
    Item.findOneAndUpdate({ ItemName: req.body.ItemName, VendorName: req.body.VendorName }, { $set: { IsDispatched: req.body.IsDispatched } })
        .then((items) => {
            console.log('Data: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.put('/cancel', (req, res) => {
    Item.find({ ItemName: req.body.ItemName, VendorName: req.body.VendorName })
        .then((items) => {
            console.log('Data: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.put('/dispatch', (req, res) => {
    if (req.body.IsDispatched == 0) {
        Item.find({ VendorName: req.body.VendorName, IsDispatched: req.body.IsDispatched, ItemQuantity: 0 })
            .then((items) => {
                console.log('Datapo: ', items);
                res.json(items);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    } else {
        Item.find({ VendorName: req.body.VendorName, IsDispatched: req.body.IsDispatched })
            .then((items) => {
                console.log('Datapo: ', items);
                res.json(items);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    }
});

module.exports = router;