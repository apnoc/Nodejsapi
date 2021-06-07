const { DataSource } = require("apollo-datasource");
const lodashId = require("lodash-id");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/contacts.json");
const db = low(adapter);
db._.mixin(lodashId);

class ContactDataSource extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.db = db.get("contacts");
  }

  getContacts(args) {
    return this.db.filter(args).value();
  }

  getContactById(id) {
    return this.db.getById(id).value();
  }

  createContact(contact) {
    return this.db.insert(contact).write();
  }
}

module.exports = ContactDataSource;
