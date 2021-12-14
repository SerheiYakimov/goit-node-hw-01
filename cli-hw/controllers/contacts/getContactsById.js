const { contactsPath } = require('../contacts.js');

const getContactById = async (contactId) => {
    const contacts = await contactsPath();
    const [result] = contacts.filter((contact) => contact.id === contactId);
    return result;
}

module.exports = { getContactById };