const chalk = require('chalk');
const gradient = require('gradient-string');
const { Command } = require('commander');
const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contacts');


const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
          const contacts = await listContacts();
          console.table(contacts);
      break;

    case 'get':
          const contactById = await getContactById(id)
          if (contactById) {
            console.log(chalk.black.bgGreen('Contact found'));
            console.log(contactById);
          } else {
            console.log(chalk.white.bgRed('Contact not found'));
            console.log(contactById);
          }
      break;

    case 'add':
          const contact = await addContact(name, email, phone);
          console.log(gradient('yellow',' orange')('Add new contact'));
          console.log(contact);
      break;

    case 'remove':
          const deleteContact = await removeContact(id)
          if (deleteContact) {
            console.log(gradient('red', 'orange')('Remove contact'));
            console.log(deleteContact);
          } else {
            console.log(gradient('yellow', 'red')('Contact with such id is not in the list!'));
            console.table(deleteContact);
          }
          

      break;

    default:
        console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv).then(() => console.log(gradient.rainbow('Operation success')));
