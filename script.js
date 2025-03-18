// Google Sheets API configuration
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || 'YOUR_API_KEY'; // Replace with your Google Sheets API key
const SHEET_NAME = process.env.SHEET_NAME || 'Tickets'; // Replace with your sheet name

// DOM Elements
const searchForm = document.getElementById('searchForm');
const updateForm = document.getElementById('updateForm');
const ticketDetails = document.getElementById('ticketDetails');
const ticketIdInput = document.getElementById('ticketId');
const statusSelect = document.getElementById('status');
const notesInput = document.getElementById('notes');

// Event Listeners
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ticketId = ticketIdInput.value.trim();
    if (ticketId) {
        await searchTicket(ticketId);
    }
});

updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ticketId = ticketIdInput.value.trim();
    const newStatus = statusSelect.value;
    const notes = notesInput.value.trim();
    
    if (ticketId && newStatus) {
        await updateTicketStatus(ticketId, newStatus, notes);
    }
});

// Functions
async function searchTicket(ticketId) {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:Z?key=${API_KEY}`);
        const data = await response.json();
        
        const ticket = findTicket(data.values, ticketId);
        if (ticket) {
            displayTicketDetails(ticket);
            updateForm.style.display = 'block';
        } else {
            displayError('Ticket not found');
        }
    } catch (error) {
        displayError('Error searching for ticket');
        console.error('Error:', error);
    }
}

function findTicket(values, ticketId) {
    if (!values || values.length < 2) return null;
    
    const headers = values[0];
    const ticketIndex = headers.findIndex(header => header.toLowerCase() === 'ticket id');
    
    if (ticketIndex === -1) return null;
    
    return values.find(row => row[ticketIndex] === ticketId);
}

function displayTicketDetails(ticket) {
    const headers = ['Ticket ID', 'Title', 'Status', 'Created Date', 'Last Updated'];
    const ticketInfo = headers.map(header => {
        const index = headers.indexOf(header);
        return `<div class="mb-2">
            <strong>${header}:</strong> ${ticket[index]}
        </div>`;
    }).join('');
    
    ticketDetails.innerHTML = `
        <div class="ticket-info">
            ${ticketInfo}
        </div>
    `;
}

async function updateTicketStatus(ticketId, newStatus, notes) {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:Z?key=${API_KEY}`);
        const data = await response.json();
        
        const ticket = findTicket(data.values, ticketId);
        if (ticket) {
            const statusIndex = data.values[0].findIndex(header => header.toLowerCase() === 'status');
            const notesIndex = data.values[0].findIndex(header => header.toLowerCase() === 'notes');
            const lastUpdatedIndex = data.values[0].findIndex(header => header.toLowerCase() === 'last updated');
            
            // Update the ticket data
            ticket[statusIndex] = newStatus;
            if (notes) ticket[notesIndex] = notes;
            ticket[lastUpdatedIndex] = new Date().toISOString();
            
            // Update the sheet
            await updateSheet(ticket);
            
            // Refresh the display
            displayTicketDetails(ticket);
            displaySuccess('Ticket status updated successfully');
        }
    } catch (error) {
        displayError('Error updating ticket status');
        console.error('Error:', error);
    }
}

async function updateSheet(ticket) {
    // Note: This is a simplified version. In a real implementation,
    // you would need to use the Google Sheets API with proper authentication
    // and the correct endpoint to update the sheet.
    console.log('Updating sheet with:', ticket);
}

function displayError(message) {
    ticketDetails.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
    updateForm.style.display = 'none';
}

function displaySuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    ticketDetails.insertBefore(alert, ticketDetails.firstChild);
} 
