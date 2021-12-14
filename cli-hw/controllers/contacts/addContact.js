const fs = require('fs/promises');
const path = require('path');
const { contactsPath } = require('../contacts.js');
const crypto = require('crypto');

const addContact = async (name, email, phone) => {
    const contacts = await contactsPath();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(
        path.join('db', 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    );
    return newContact;
}

module.exports = { addContact };