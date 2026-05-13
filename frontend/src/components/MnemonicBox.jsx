import { useState } from "react";

// Props:
//   mnemonic  — the 12-word string from App's state (or "" if not generated yet)
//   onGenerate — function to call when user clicks "Generate"

export default function MnemonicBox({ mnemonic, onGenerate }) {
  const [visible, setVisible] = useState(false);

  // Split "word1 word2 ..." into an array of 12 words
  const words = mnemonic ? mnemonic.split(" ") : [];

  function copyToClipboard() {
    navigator.clipboard.writeText(mnemonic);
    alert("Seed phrase copied! Keep it safe — never share it.");
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <button onClick={onGenerate}>
        Generate Seed Phrase
      </button>

      {words.length > 0 && (
        <div style={{ marginTop: "1rem" }}>

          {/* 12 words in a 4-column grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "12px"
          }}>
            {words.map((word, i) => (
              <div key={i} style={{
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "13px"
              }}>
                <span style={{ color: "#999", marginRight: "6px" }}>{i + 1}.</span>
                {/* blur the word unless visible is true */}
                <span style={{ filter: visible ? "none" : "blur(4px)" }}>
                  {word}
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => setVisible(!visible)} style={{ marginRight: "8px" }}>
            {visible ? "Hide Words" : "Show Words"}
          </button>
          <button onClick={copyToClipboard}>
            Copy Phrase
          </button>
        </div>
      )}
    </div>
  );
}