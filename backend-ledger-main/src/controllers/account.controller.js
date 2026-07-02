const accountModel = require("../models/account.model");



// MVC Architecture

// এখানে একটা Rule আছে।

// Controller

// এর কাজ

// Request নেওয়া

// ↓

// Model কে ডাক দেওয়া

// ↓

// Response পাঠানো

// Controller-এর কাজ Business Logic লেখা নয়।


// Business Logic থাকবে

// Model

// এর ভিতরে।

// যেমন

// Account

// ↓

// Balance Calculate

// ↓

// Ledger Aggregate

// ↓

// Return Balance

async function createAccountController(req, res) {

    const user = req.user;

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    })

}

async function getUserAccountsController(req, res) {

    const accounts = await accountModel.find({ user: req.user._id });

    res.status(200).json({
        accounts
    })
}


//এটার কাজ

// একটি Account-এর Balance বের করা।
async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}


module.exports = {
    createAccountController,
    getUserAccountsController,
    getAccountBalanceController
}