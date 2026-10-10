const express = require("express");
const cors = require("cors");
const app = express()
app.use(cors());

const PORT = 3000

app.use(express.json());

let contacts = [
    { id: 1, name: "Aditi", phone: "98765 43210", email: "aditi@example.com" },
    { id: 2, name: "Rohan Meheta", phone: "91234 56789", email: "rohan@example.com" },
    { id: 3, name: "Rohan", phone: "91234 56789", email: "rohan@example.com" },
    { id: 3, name: "Rohan", phone: "91234 56789", email: "rohan@example.com" },
];
// API 1
app.get("/api/contacts", (req, res) => {
    res.json(contacts)
})
// API 2
app.get("/api/contacts/:id", (req, res) => {
    const id = req.params.id;
    const contact = contacts.find((c) => c.id == id);
    res.json(contact)
})
// API 3
app.post("/api/contacts", (req, res) => {
    const { name, phone, email } = req.body;

    const newContact = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email,
    };

    contacts.push(newContact);

    res.status(201).json(newContact);

});


app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})