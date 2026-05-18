const express = require("express");
const router = express.Router();
const { PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const { getAssociatedTokenAddress } = require("@solana/spl-token");
const { ethers } = require("ethers");
const { connection } = require("../utils/connection");

const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

const ethProvider = new ethers.JsonRpcProvider("https://eth.llamarpc.com");

// GET /api/balance/sol/:address
router.get("/sol/:address", async (req, res) => {
  try {
    const pubkey = new PublicKey(req.params.address);
    const lamports = await connection.getBalance(pubkey);
    res.json({ address: req.params.address, sol: lamports / LAMPORTS_PER_SOL });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/balance/eth/:address
router.get("/eth/:address", async (req, res) => {
  try {
    const wei = await ethProvider.getBalance(req.params.address);
    res.json({ address: req.params.address, eth: parseFloat(ethers.formatEther(wei)) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/balance/tokens/:address
router.get("/tokens/:address", async (req, res) => {
  try {
    const pubkey = new PublicKey(req.params.address);
    const ata = await getAssociatedTokenAddress(USDC_MINT, pubkey);
    const bal = await connection.getTokenAccountBalance(ata);
    res.json({
      address: req.params.address,
      tokens: [{ symbol: "USDC", balance: bal.value.uiAmount }]
    });
  } catch {
    res.json({
      address: req.params.address,
      tokens: [{ symbol: "USDC", balance: 0 }]
    });
  }
});

module.exports = router;