# Developer Manual - Weather Application

# Project Setup

# Requirements
- Node.js installed
- npm installed
- Supabase project set up

# Installation Steps
# 1. Clone the repository:
git clone <your repo link>

# 2. Navigate into the project folder
cd INST377_FP_Files

# 3. Install dependencies
npm install

# 4. Start the backend server
node index_FP.js

# 5. Open the frontend
Open Home_Page_FP.html in a browser

# Notes for Developers
- Make sure the backend server is running before using the frontend features
- Check that Supabase is set up correctly for data to work
- Some features depend on external APIs, so they need internet access

# API Endpoints

# GET /cities
Returns all saved cities from the Supabase database

# POST /cities
Adds a new city to the Supabase database

# GET /weather
Fetches weather data from the external weather API using latitude and longitude

# Known Bugs
- Map markers may duplicate on repeated loads unless cleared
- Saved cities may update after refresh depending on backend response timing

# Future Improvements
- Add user login system
- Improve duplicate city error in backend (if it happens again)
- Add loading indicators for API calls (when data is being fetched)
