const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const accountData = fs.readFileSync('src/json/accounts.json','utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json','utf8');
const users = JSON.parse(userData);

app.get('/',(req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/savings',(req, res) => res.render('account', { title: 'Savings Account Summary', account: accounts.savings }));
app.get('/checking',(req, res) => res.render('account', { title: 'Checking Account Summary', account: accounts.checking }));
app.get('/credit',(req, res) => res.render('account', { title: 'Credit Account Summary', account: accounts.credit }));
app.get('/profile',(req, res) => res.render('profile', { title: 'Profile', user: users[0] }));
app.get('/transfer',(req, res) => res.render('transfer') );
app.post('/transfer', (req, res) => {
    const { to, from, amount } = req.body;
    
    accounts[from].balance = parseInt(accounts[from].balance, 10) - parseInt(amount, 10);
    accounts[to].balance = parseInt(accounts[to].balance, 10) + parseInt(amount, 10);
    
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
    res.render('transfer', { message: 'Transfer Completed' });

});
app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit}));
app.post('/payment', (req, res) => {
    const { amount } = req.body;
    accounts['credit'].balance = parseInt(accounts['credit'].balance, 10) - parseInt(amount, 10);
    accounts['credit'].available = parseInt(accounts['credit'].available, 10) + parseInt(amount, 10);
    
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'));