import Contact from "../models/Contact.js";

class ContactService {
  async createContact(data) {
    return await Contact.create(data);
  }

  async getContacts() {
    return await Contact.find().sort({ createdAt: -1 });
  }

  async deleteContact(id) {
    return await Contact.findByIdAndDelete(id);
  }
}

export default new ContactService();
