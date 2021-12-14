const fs = require('fs/promises');
const path = require('path');
const { contactsPath } = require('../contacts.js');

const removeContact = async (contactId) => {
    const contacts = await contactsPath();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    const indexContact = contacts.indexOf(contact);
    contacts.splice(indexContact, 1);
    await fs.writeFile(
        path.join('db', 'contacts.json'),
        JSON.stringify(contacts, null, 2)
    );
    return contact;
}

module.exports = { removeContact };