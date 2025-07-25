import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTACTS_FILE = path.join(__dirname, '../data/contacts.json');

// Utility function to generate unique ID
const generateId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `contact_${timestamp}_${random}`;
};

// Update contact data
const updateContactData = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Name, email, and message are required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please provide a valid email address'
      });
    }

    const newContact = {
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Read existing contacts
    let contacts = [];
    try {
      const data = await fs.readFile(CONTACTS_FILE, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      contacts = [];
    }

    // Add new contact
    contacts.push(newContact);

    // Write back to file
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: newContact.id,
        timestamp: newContact.timestamp
      }
    });

  } catch (error) {
    console.error('Error updating contact data:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit contact form'
    });
  }
};

// Get contact data
const getContactData = async (req, res) => {
  try {
    let contacts = [];
    
    try {
      const data = await fs.readFile(CONTACTS_FILE, 'utf8');
      contacts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, return empty array
      contacts = [];
    }

    // Sort by timestamp (newest first)
    contacts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json({
      success: true,
      data: contacts,
      total: contacts.length
    });

  } catch (error) {
    console.error('Error fetching contact data:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch contact data'
    });
  }
};

export { updateContactData, getContactData };
