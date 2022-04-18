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
            console.log('Dataaa: ', items);
            console.log('Dataq: ', items[0]);
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

//DELETE request
router.delete('/', (req, res) => {
    console.log(req);
    Item.findOneAndDelete({ ItemName: req.body.deletedItem, VendorName: req.body.Searched_VendorName })
        .then(() => console.log("Deleted"))
        .catch(err => res.status(404).json({ success: false }));
});

router.put('/', (req, res) => {
    console.log("item:" + req.body.Searched_ItemName);
    // const here = req.body.Searched_ItemName;
    Item.find({ ItemName: req.body.Searched_ItemName, VendorName: req.body.Searched_VendorName })
        .then((items) => {
            console.log('reqData: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
})

router.put('/search', (req, res) => {
    console.log("item:" + req.body.Searched_ItemName);
    // const here = req.body.Searched_ItemName;
    Item.find({ ItemName: req.body.Searched_ItemName })
        .then((items) => {
            console.log('reqData: ', items);
            res.json(items);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
})

module.exports = router;