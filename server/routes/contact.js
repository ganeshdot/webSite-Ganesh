import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Fallback in-memory list for contact messages when DB is disconnected
const memoryContacts = [];

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  } : null
});

router.post('/', async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // Simple validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    // If DB is connected
    if (Contact.db.readyState === 1) {
      const newContact = new Contact({ name, email, phone, company, subject, message });
      await newContact.save();
      console.log(`Saved contact form from ${name} to MongoDB.`);
    } else {
      // Fallback to in-memory
      const newContact = { name, email, phone, company, subject, message, createdAt: new Date() };
      memoryContacts.push(newContact);
      console.warn(`Saved contact form from ${name} to IN-MEMORY fallback store. Current length: ${memoryContacts.length}`);
    }

    // Send email copy
    const mailOptions = {
      from: process.env.SMTP_USER || `"Portfolio Contact" <noreply@ganeshportfolio.com>`,
      to: 'ganeshbabu.k111@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `You have received a new message from your portfolio contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}
Subject: ${subject}

Message:
${message}
`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${mailOptions.to}`);
      } catch (mailError) {
        console.error('Failed to send email via SMTP:', mailError.message);
      }
    } else {
      console.warn('SMTP credentials are not configured in environment variables. Email content logged below:');
      console.log('--- MOCK EMAIL SEND ---');
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Body:\n${mailOptions.text}`);
      console.log('-----------------------');
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
