const bip39 = require("bip39");
const{ derivePath } = require("ed25519-hd-key");
const nacl = require("tweetnacl");
const {Keypair} = require("@solana/web3.js");
const {ethers} = require("ethers");

function deriveKeypair(mnemonic,index){
    const seed  = bip39.mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    const {key}= derivePath(path,seed.toString("hex"));
    return Keypair.fromSecretKey(
      nacl.sign.keyPair.fromSecretKey(key).secretKey
    );
}
function deriveEthKeypair(mnemonic, index) {
  const hdNode = ethers.HDNodeWallet.fromMnemonic(
    ethers.Mnemonic.fromPhrase(mnemonic)
  );
  const path = `m/44'/60'/${index}'/0/0`;
  const wallet = hdNode.derivePath(path);
  return {
    address: wallet.address,       
    privateKey: wallet.privateKey, 
  };
}

module.exports = { deriveKeypair, deriveEthKeypair };