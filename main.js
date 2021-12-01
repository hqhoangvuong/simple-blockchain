const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(idx, timestamp, data, prevHash) {
        this.index = idx;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = prevHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    calcHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, '01/01/1970', 'This is the genesis block', '-1');
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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


// let hikariCoin = new BlockChain();

// console.log("\nMining block 1 ...");
// hikariCoin.addBlock(new Block(1, new Date().getTime(), { amount: 4 }));

// console.log("\nMining block 2 ...");
// hikariCoin.addBlock(new Block(2, new Date().getTime(), { amount: 10 }));

// console.log("\nMining block 3 ...");
// hikariCoin.addBlock(new Block(3, new Date().getTime(), { amount: 1 }));

// console.log("\nMining block 4 ...");
// hikariCoin.addBlock(new Block(4, new Date().getTime(), { amount: 3 }));

// console.log(JSON.stringify(hikariCoin, null, 4));

// console.log("Is my chain valid: " + hikariCoin.isChainValid());

// hikariCoin.chain[2].data = { amount: 999999999};
// hikariCoin.chain[2].hash = hikariCoin.chain[2].calcHash();

// console.log("Is my chain valid: " + hikariCoin.isChainValid());


data = JSON.stringify({ amount: 999999999} + 3).toString();
console.log(data);