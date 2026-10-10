const express = require("express");
const cors = require("cors");
const app = express()
const mongoose = require("mongoose")
const MONGODB_URI = ""

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
})
contactSchema.set("toJSON");
const Contact = mongoose.model("Contact", contactSchema);

app.use(cors());

const PORT = 3000

app.use(express.json());

// API 1
app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find()
    res.json(contacts)
})
// API 2
// app.get("/api/contacts/:id", (req, res) => {
//     const id = req.params.id;
//     const contact = contacts.find((c) => c.id == id);
//     res.json(contact)
// })
// API 3
app.post("/api/contacts", async (req, res) => {
    const { name, phone, email } = req.body;
    const newContact = await Contact.create({ name, phone, email });
    res.status(201).json(newContact)
});

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Contact Book API running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Could not connect to MongoDB:", error.message);
        process.exit(1);
    });