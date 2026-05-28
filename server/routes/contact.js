import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Fallback in-memory list for contact messages when DB is disconnected
const memoryContacts = [];

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    // If DB is connected
    if (Contact.db.readyState === 1) {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
      console.log(`Saved contact form from ${name} to MongoDB.`);
    } else {
      // Fallback to in-memory
      const newContact = { name, email, subject, message, createdAt: new Date() };
      memoryContacts.push(newContact);
      console.warn(`Saved contact form from ${name} to IN-MEMORY fallback store. Current length: ${memoryContacts.length}`);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error.message);
    res.status(500).json({ error: 'Internal server error. Failed to save message.' });
  }
});

// GET endpoint to fetch submitted contacts (useful for debugging/admin views)
router.get('/', async (req, res) => {
  try {
    if (Contact.db.readyState === 1) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.json(contacts);
    }
    res.json(memoryContacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

export default router;
