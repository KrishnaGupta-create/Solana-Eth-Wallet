import { useState } from "react";
import { generateWallet, deriveWallet } from "./api/api";
import MnemonicBox from "./components/MnemonicBox";
import WalletCard from "./components/WalletCard";

export default function App() {
  // mnemonic — the 12-word seed phrase string
  // wallets  — array of { index, solana, ethereum }
  const [mnemonic, setMnemonic] = useState("");
  const [wallets, setWallets] = useState([]);

  // Called when user clicks "Generate Seed Phrase"
  async function handleGenerate() {
    const data = await generateWallet();
    setMnemonic(data.mnemonic);
    setWallets(data.wallets); // starts with wallet 0 already included
  }

  // Called when user clicks "Add Wallet"
  // Always uses the next index (wallets.length)
  async function handleAddWallet() {
    const nextIndex = wallets.length;
    const data = await deriveWallet(mnemonic, nextIndex);
    setWallets([...wallets, data]);
  }

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "2rem" }}>
      <h1>SolVault</h1>

      {/* Seed phrase section */}
      <MnemonicBox
        mnemonic={mnemonic}
        onGenerate={handleGenerate}
      />

      {/* Wallet list */}
      {wallets.length > 0 && (
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}>
            <h2>Wallets</h2>
            <button onClick={handleAddWallet}>+ Add Wallet</button>
          </div>

          {wallets.map((wallet) => (
            <WalletCard key={wallet.index} wallet={wallet} />
          ))}
        </div>
      )}
    </div>
  );
}