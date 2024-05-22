const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json());

let ETH_BALANCE = 200;
let USDC_BALANCE = 700000; // If ETH does not come down, we can face impermanent loss.


app.get('/balances', (req, res) => {
    res.json({
        ethBalance: ETH_BALANCE,
        usdcBalance: USDC_BALANCE
    });
});


app.post('/buy-asset', (req, res) => {
    const quantity = parseFloat(req.body.quantity);

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity provided" });
    }

    if (quantity > ETH_BALANCE) {
        return res.status(400).json({ message: "Not enough ETH balance to fulfill the order" });
    }

    const updatedEthQuantity = ETH_BALANCE - quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthQuantity;
    const paidAmount = updatedUsdcBalance - USDC_BALANCE;

    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({
        message: `You paid ${paidAmount.toFixed(2)} USDC for ${quantity} ETH`
    });
});


app.post('/sell-asset', (req, res) => {
    const quantity = parseFloat(req.body.quantity);

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity provided" });
    }

    const updatedEthQuantity = ETH_BALANCE + quantity;
    const updatedUsdcBalance = ETH_BALANCE * USDC_BALANCE / updatedEthQuantity;
    const gottenUsdc = USDC_BALANCE - updatedUsdcBalance;

    ETH_BALANCE = updatedEthQuantity;
    USDC_BALANCE = updatedUsdcBalance;

    res.json({
        message: `You got ${gottenUsdc.toFixed(2)} USDC for ${quantity} ETH`
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
