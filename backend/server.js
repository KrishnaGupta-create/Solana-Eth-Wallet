const express = require("express");
const cors = require("cors");
const walletRoutes = require("./routes/wallet");
const balanceRoutes = require("./routes/balance");

const app = express();

app.use(cors());         // allow frontend on port 5173 to call this
app.use(express.json()); // parse JSON request bodies

// Mount routes
app.use("/api/wallet", walletRoutes);
app.use("/api/balance", balanceRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});