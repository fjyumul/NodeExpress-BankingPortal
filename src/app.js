const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync('src/json/accounts.json','utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json','utf8');
const users = JSON.parse(userData);

app.get('/',(req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/savings',(req, res) => res.render('account', { title: 'Savings Account Summary', account: accounts.savings }));
app.get('/checking',(req, res) => res.render('account', { title: 'Checking Account Summary', account: accounts.checking }));
app.get('/credit',(req, res) => res.render('account', { title: 'Credit Account Summary', account: accounts.credit }));
app.get('/profile',(req, res) => res.render('profile', { title: 'Profile', user: users[0] }));

app.listen(3000, () => console.log('PS Project Running on port 3000!'));