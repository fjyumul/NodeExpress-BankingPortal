const express = require('express');
const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/transfer',(req, res) => res.render('transfer') );
router.post('/transfer', (req, res) => {
    const { to, from, amount } = req.body;
    
    accounts[from].balance = parseInt(accounts[from].balance, 10) - parseInt(amount, 10);
    accounts[to].balance = parseInt(accounts[to].balance, 10) + parseInt(amount, 10);
    
    writeJSON();
    res.render('transfer', { message: 'Transfer Completed' });

});
router.get('/payment', (req, res) => res.render('payment', { account: accounts.credit}));
router.post('/payment', (req, res) => {
    const { amount } = req.body;
    accounts['credit'].balance = parseInt(accounts['credit'].balance, 10) - parseInt(amount, 10);
    accounts['credit'].available = parseInt(accounts['credit'].available, 10) + parseInt(amount, 10);
    
    writeJSON();
    
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;