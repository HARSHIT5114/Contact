import ContactService from "../services/ContactService.js";

class ContactController {
  async create(req, res) {
    try {
      const contact = await ContactService.createContact(req.body);
      res.status(201).json(contact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async fetchAll(req, res) {
    const contacts = await ContactService.getContacts();
    res.json(contacts);
  }

  async remove(req, res) {
    await ContactService.deleteContact(req.params.id);
    res.json({ message: "Contact deleted" });
  }
}

export default new ContactController();
