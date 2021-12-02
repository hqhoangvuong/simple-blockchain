const {
    BlockChain,
    Transaction
} = require('./blockchain');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const MY_KEY = ec.keyFromPrivate('d5be89a90957b9cb443375accf16817478aa4482e86c8011c67f06a0c419b927');
const MY_WALLET_ADDR = MY_KEY.getPublic('hex');

let hikariCoin = new BlockChain();

const tx1 = new Transaction(MY_WALLET_ADDR, 'S.O public key here', 20);
tx1.signTransaction(MY_KEY);
hikariCoin.addTransaction(tx1);

console.log('\nStarting the miner ...');
hikariCoin.miningPendingTransactions(MY_WALLET_ADDR);
console.log(hikariCoin.chain);
console.log('\nBalance of Vuong Huynh is: ' + hikariCoin.getBalanceOfAddress(MY_WALLET_ADDR));