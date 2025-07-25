import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DataService {
    constructor() {
        this.dataDir = path.join(__dirname, '../data');
        this.contactsFile = path.join(this.dataDir, 'contacts.json');
        this.initializeDataDirectory();
    }

    //This function creates the data directory if it doesn't exist
    async initializeDataDirectory() {
        try {
            await fs.mkdir(this.dataDir, { recursive: true });
            console.log('Data directory initialized');
        } catch (error) {
            console.error('Error creating data directory:', error);
        }
    }

    //This function generates a unique ID for each contact
    generateContactId() {
        return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    //This function validates the contact data
    validateContactData(contactData) {
        const { name, email, message } = contactData;
        
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Name is required and must be a valid string');
        }
        
        if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
            throw new Error('Valid email is required');
        }
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            throw new Error('Message is required and must be a valid string');
        }
        
        return true;
    }

    //This function checks if email format is valid
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    //This function saves contact data to JSON file
    async saveContactData(contactData) {
        try {
            // Validate input data
            this.validateContactData(contactData);

            // Create contact object with metadata
            const contact = {
                id: this.generateContactId(),
                name: contactData.name.trim(),
                email: contactData.email.trim().toLowerCase(),
                phone: contactData.phone ? contactData.phone.trim() : '',
                message: contactData.message.trim(),
                timestamp: new Date().toISOString(),
                status: 'new',
                createdAt: new Date().toISOString()
            };

            // Get existing contacts
            const existingContacts = await this.getAllContacts();
            
            // Add new contact
            existingContacts.push(contact);

            // Save to file
            await fs.writeFile(this.contactsFile, JSON.stringify(existingContacts, null, 2));
            
            console.log(`Contact saved successfully with ID: ${contact.id}`);
            return contact;

        } catch (error) {
            console.error('Error saving contact data:', error);
            throw error;
        }
    }

    //This function retrieves all contacts from the JSON file
    async getAllContacts() {
        try {
            const fileContent = await fs.readFile(this.contactsFile, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, return empty array
                console.log('Contacts file not found, returning empty array');
                return [];
            }
            console.error('Error reading contacts file:', error);
            throw error;
        }
    }

    // //This function retrieves a specific contact by ID
    // async getContactById(contactId) {
    //     try {
    //         const contacts = await this.getAllContacts();
    //         const contact = contacts.find(c => c.id === contactId);
            
    //         if (!contact) {
    //             throw new Error(`Contact with ID ${contactId} not found`);
    //         }
            
    //         return contact;
    //     } catch (error) {
    //         console.error('Error fetching contact by ID:', error);
    //         throw error;
    //     }
    // }

    // //This function updates contact status (new, read, replied, etc.)
    // async updateContactStatus(contactId, status) {
    //     try {
    //         const contacts = await this.getAllContacts();
    //         const contactIndex = contacts.findIndex(c => c.id === contactId);
            
    //         if (contactIndex === -1) {
    //             throw new Error(`Contact with ID ${contactId} not found`);
    //         }
            
    //         contacts[contactIndex].status = status;
    //         contacts[contactIndex].updatedAt = new Date().toISOString();
            
    //         await fs.writeFile(this.contactsFile, JSON.stringify(contacts, null, 2));
            
    //         console.log(`Contact ${contactId} status updated to: ${status}`);
    //         return contacts[contactIndex];
    //     } catch (error) {
    //         console.error('Error updating contact status:', error);
    //         throw error;
    //     }
    // }

    // //This function gets contacts by status
    // async getContactsByStatus(status) {
    //     try {
    //         const contacts = await this.getAllContacts();
    //         return contacts.filter(c => c.status === status);
    //     } catch (error) {
    //         console.error('Error fetching contacts by status:', error);
    //         throw error;
    //     }
    // }

    // //This function gets contacts within a date range
    // async getContactsByDateRange(startDate, endDate) {
    //     try {
    //         const contacts = await this.getAllContacts();
    //         const start = new Date(startDate);
    //         const end = new Date(endDate);
            
    //         return contacts.filter(contact => {
    //             const contactDate = new Date(contact.timestamp);
    //             return contactDate >= start && contactDate <= end;
    //         });
    //     } catch (error) {
    //         console.error('Error fetching contacts by date range:', error);
    //         throw error;
    //     }
    // }

    // //This function gets recent contacts (last N days)
    // async getRecentContacts(days = 7) {
    //     try {
    //         const endDate = new Date();
    //         const startDate = new Date();
    //         startDate.setDate(startDate.getDate() - days);
            
    //         return await this.getContactsByDateRange(startDate, endDate);
    //     } catch (error) {
    //         console.error('Error fetching recent contacts:', error);
    //         throw error;
    //     }
    // }

    // //This function gets contact statistics
    // async getContactStats() {
    //     try {
    //         const contacts = await this.getAllContacts();
    //         const stats = {
    //             total: contacts.length,
    //             new: contacts.filter(c => c.status === 'new').length,
    //             read: contacts.filter(c => c.status === 'read').length,
    //             replied: contacts.filter(c => c.status === 'replied').length,
    //             lastContact: contacts.length > 0 ? contacts[contacts.length - 1].timestamp : null
    //         };
            
    //         return stats;
    //     } catch (error) {
    //         console.error('Error fetching contact stats:', error);
    //         throw error;
    //     }
    // }

    // //This function deletes a contact by ID (use with caution)
    // async deleteContact(contactId) {
    //     try {
    //         const contacts = await this.getAllContacts();
    //         const filteredContacts = contacts.filter(c => c.id !== contactId);
            
    //         if (contacts.length === filteredContacts.length) {
    //             throw new Error(`Contact with ID ${contactId} not found`);
    //         }
            
    //         await fs.writeFile(this.contactsFile, JSON.stringify(filteredContacts, null, 2));
            
    //         console.log(`Contact ${contactId} deleted successfully`);
    //         return true;
    //     } catch (error) {
    //         console.error('Error deleting contact:', error);
    //         throw error;
    //     }
    // }

    // //This function backs up the contacts file
    // async backupContacts() {
    //     try {
    //         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    //         const backupFile = path.join(this.dataDir, `contacts_backup_${timestamp}.json`);
            
    //         await fs.copyFile(this.contactsFile, backupFile);
    //         console.log(`Contacts backed up to: ${backupFile}`);
    //         return backupFile;
    //     } catch (error) {
    //         console.error('Error backing up contacts:', error);
    //         throw error;
    //     }
    // }
}

export default DataService;