const {Connection,cluesterApiUrl} = require("@solana/web3.js")
const connection = new Connection(cluesterApiUrl("devnet"),"confirmed");
module.exports = {connection};