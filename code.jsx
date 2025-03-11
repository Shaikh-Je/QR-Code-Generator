const express = require("express");
const QRCode = require("qrcode");
const app = express();
const port = 3000;

app.use(express.json()); // Enable JSON body parsing

// Endpoint to generate QR code
app.post("/generate", async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: "No data provided" });
    }

    try {
        // Generate QR code as a Data URL (base64 image)
        const qrImage = await QRCode.toDataURL(data);
        res.json({ qrCode: qrImage });
    } catch (err) {
        res.status(500).json({ error: "Error generating QR code" });
    }
});

app.listen(port, () => {
    console.log(`QR Code Generator running at http://localhost:${port}`);
});
