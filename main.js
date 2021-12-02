const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, prevHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = prevHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    calcHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calcHash();
        }

        console.log("This block was mined successfully: " + this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block('01/01/1970', 'This is the genesis block', '-1');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    miningPendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if(currentBlock.hash != currentBlock.calcHash()) {
                return false;
            }

            if(currentBlock.previousHash != prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


let hikariCoin = new BlockChain();
hikariCoin.createTransaction(new Transaction('addr1', 'addr2', 100));
hikariCoin.createTransaction(new Transaction('addr2', 'addr1', 50));

console.log('\nStarting the miner ...');
hikariCoin.miningPendingTransactions('VuongHuynh-address');
console.log('\nBalance of Vuong Huynh is: ' + hikariCoin.getBalanceOfAddress('VuongHuynh-address'));

console.log('\nStarting the miner again ...');
hikariCoin.miningPendingTransactions('VuongHuynh-address');
console.log('\nBalance of Vuong Huynh is: ' + hikariCoin.getBalanceOfAddress('VuongHuynh-address'));