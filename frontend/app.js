let contacts = []
const APP_URL = "http://localhost:3000/api/contacts"

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name-input");
const phoneInput = document.getElementById("phone-input");
const emailInput = document.getElementById("email-input");
const list = document.getElementById("contact-list");
const status = document.getElementById("status");

function renderContacts() {
    list.innerHTML = "";
    contacts.forEach((contact) => {
        const li = document.createElement("li");
        li.className = "bg-white rounded-lg shadow px-4 py-3 flex justify-between items-center";
        const info = document.createElement("div");

        const nameEl = document.createElement("div");
        nameEl.className = "font-semibold text-indigo-900";
        nameEl.textContent = contact.name;
        info.appendChild(nameEl)

        const detailEl = document.createElement("p");
        detailEl.className = "text-sm text-slate-500";
        detailEl.textContent = `${contact.phone}  ·  ${contact.email}`;
        info.appendChild(detailEl);

        li.appendChild(info);
        list.appendChild(li);

    })
}

async function loadContacts() {
    const response = await fetch(APP_URL);

    contacts = await response.json();

    renderContacts()
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    await fetch(APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value
        })
    })
    form.reset()
    loadContacts()
})

loadContacts()

