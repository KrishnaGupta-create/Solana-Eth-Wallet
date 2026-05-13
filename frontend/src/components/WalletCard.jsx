import { useState, useEffect } from "react";
import { getSolBalance, getEthBalance, getTokenBalance } from "../api/api";

// Props:
//   wallet — { index, solana, ethereum }

export default function WalletCard({ wallet }) {
  const [sol, setSol] = useState(null);
  const [eth, setEth] = useState(null);
  const [usdc, setUsdc] = useState(null);

  // useEffect runs once when the card first appears on screen
  // It fetches all three balances in parallel
  useEffect(() => {
    getSolBalance(wallet.solana).then((data) => setSol(data.sol));
    getEthBalance(wallet.ethereum).then((data) => setEth(data.eth));
    getTokenBalance(wallet.solana).then((data) =>
      setUsdc(data.tokens[0]?.balance ?? 0)
    );
  }, [wallet]); // the [] means "only run once when this component mounts"

  function copyAddress(addr) {
    navigator.clipboard.writeText(addr);
  }

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "1rem 1.25rem",
      marginBottom: "12px"
    }}>
      <h3 style={{ marginBottom: "12px" }}>Wallet {wallet.index + 1}</h3>

      {/* Solana address */}
      <div style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase" }}>
          Solana
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <code style={{ fontSize: "12px" }}>
            {wallet.solana.slice(0, 8)}...{wallet.solana.slice(-8)}
          </code>
          <button onClick={() => copyAddress(wallet.solana)} style={{ fontSize: "11px" }}>
            copy
          </button>
        </div>
      </div>

      {/* Ethereum address */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase" }}>
          Ethereum
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <code style={{ fontSize: "12px" }}>
            {wallet.ethereum.slice(0, 8)}...{wallet.ethereum.slice(-8)}
          </code>
          <button onClick={() => copyAddress(wallet.ethereum)} style={{ fontSize: "11px" }}>
            copy
          </button>
        </div>
      </div>

      {/* Balances */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        <div style={{ background: "#f5f5f5", borderRadius: "6px", padding: "8px 10px" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>SOL</div>
          <div style={{ fontSize: "18px", fontWeight: "500" }}>
            {sol === null ? "..." : sol.toFixed(4)}
          </div>
        </div>
        <div style={{ background: "#f5f5f5", borderRadius: "6px", padding: "8px 10px" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>ETH</div>
          <div style={{ fontSize: "18px", fontWeight: "500" }}>
            {eth === null ? "..." : eth.toFixed(4)}
          </div>
        </div>
        <div style={{ background: "#f5f5f5", borderRadius: "6px", padding: "8px 10px" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>USDC</div>
          <div style={{ fontSize: "18px", fontWeight: "500" }}>
            {usdc === null ? "..." : usdc.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}