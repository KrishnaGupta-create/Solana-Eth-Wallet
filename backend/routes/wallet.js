const express = require("express");
const router = express.Router();
const bip39 = require("bip39");
const {deriveKeypair,deriveEthKeypair} = require("../utils/derive");
const { Wallet } = require("ethers");
    
router.post("/generate",(req,res)=>{
    const mnemonic = bip39.generateMnemonic();
    const sol = deriveKeypair(mnemonic,0);
    const eth = deriveEthKeypPair(mnemonic,0);

    res.json({
    mnemonic,
    wallets: [
      {
        index: 0,
        solana: sol.publicKey.toBase58(),
        ethereum: eth.address,
      },
    ],
  });
});

router.post("/derive",(req,res)=>{
    const {mnemonic,index} = req.body;

    if (!mnemonic || index === undefined){
        return res.status(400).json({error : "mnemonic and index are required"});
    }
    if (!bip39.validateMnemonic(mnemonic)){
        return res.status(400).json({error : "Invalid mnemonic phrase"});
    }

    const sol = deriveKeypair(mnemonic, index);
    const eth = deriveEthKeypair(mnemonic, index);

    res.json({
        index,
        solana: sol.publicKey.toBase58(),
        ethereum: eth.address,
    });
});

module.exports = router;
