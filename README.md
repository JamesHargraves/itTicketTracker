# Ticket Status Tracker

A simple web application for tracking ticket statuses using Google Sheets as a backend.

## Setup Instructions

1. Create a Google Sheet with the following columns:
   - Ticket ID
   - Title
   - Status
   - Created Date
   - Last Updated
   - Notes

2. Set up Google Sheets API:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Sheets API
   - Create credentials (API Key)
   - Share your Google Sheet with the appropriate permissions

3. Configure the application:
   - Open `script.js`
   - Replace `YOUR_SPREADSHEET_ID` with your Google Sheet ID (from the URL)
   - Replace `YOUR_API_KEY` with your Google Sheets API key
   - Update `SHEET_NAME` if your sheet has a different name

## Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Create a new GitHub repository
2. Push your code to the repository
3. Go to repository Settings > Pages
4. Select the main branch as the source
5. Your site will be available at `https://[your-username].github.io/[repository-name]`

### Option 2: Netlify
1. Create a Netlify account
2. Connect your GitHub repository
3. Deploy with default settings
4. Your site will be available at `https://[your-site-name].netlify.app`

### Option 3: Vercel
1. Create a Vercel account
2. Connect your GitHub repository
3. Deploy with default settings
4. Your site will be available at `https://[your-site-name].vercel.app`

## Security Notes
- Keep your API key secure
- Consider using environment variables for sensitive data
- Set up appropriate CORS and API key restrictions in Google Cloud Console

## Local Development
To run locally:
1. Clone the repository
2. Open `index.html` in your browser
3. Make sure you have configured the Google Sheets API credentials 
