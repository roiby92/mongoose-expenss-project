const express = require('express')
const router = express.Router()
const Expense = require('../model/Expense')
const moment = require('moment')


router.get('/expenses', function (req, res) {
    Expense.find({}).sort({ date: -1 }).exec(function (err, expenses) {
        res.send(expenses)
    })
})

router.get("/expenses", (req, res) => {
    const { d1, d2 } = req.query;
    if (d1 && d2) {
        Expense.find({
            date: { "$gt": moment(d1).toDate(), "$lt": moment(d2).toDate() }
        }).then(expense => res.send(expense));
    } else if (d1 && !d2) {
        Expense.find({ date: { "$gt": moment(d1).toDate()}}).then(expense => res.send(expense));
    } else {
        Expense.find({}).sort("-date").then(expense => res.send(expense));
    }
});

router.put('/update', function (req, res) {
    const { group1 } = req.body.group1
    const { group2 } = req.body.group2
    Expense.findOneAndUpdate({ group: group1 }, { group: group2 }, { new: true }, (error, expense) => {
        res.send(`Changed ${expense.name} where group was ${group1} group to ${expense.group} group`)
    });
});

router.get("/expenses/:group", (req, res) => {
    const { group } = req.params;
    const { total } = req.query;
    if (total === 'true') {
        Expense.aggregate([
            { "$match": { group: group } },
            {
                "$group": {
                    _id: group,
                    totalAmount: { "$sum": "$amount" }
                }
            }
        ]).then(expense => res.send(expense))
    } else {
        Expense.find({group: group}).then(expense => res.send(expense));
    }
});

module.exports = router