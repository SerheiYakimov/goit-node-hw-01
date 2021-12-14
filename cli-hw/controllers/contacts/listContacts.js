const { contactsPath } = require('../contacts.js');

const listContacts = async () => {
    return await contactsPath();
}

module.exports = { listContacts };