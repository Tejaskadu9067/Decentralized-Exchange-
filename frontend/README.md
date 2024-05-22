# Crypto Exchange App

This project is a simple crypto exchange application that allows users to buy and sell assets (ETH) using USDC. It includes a backend server built with Express.js and a frontend interface built with React.

## Features

- View current balances of ETH and USDC in the liquidity pool and user's wallet.
- Buy assets (ETH) using USDC.
- Sell assets (ETH) to receive USDC.

## Technologies Used

- **Backend:** Express.js, Node.js
- **Frontend:** React, Axios
- **Styling:** Tailwind CSS

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crypto-exchange-app.git
cd crypto-exchange-app

### Install backend dependencies
cd backend
npm install

### Install frontend dependencies
cd ../frontend
npm install
 
## Set port to use inside index.js file inside the backend folder.
PORT=3000

# Start the backend server (from the backend directory)
cd backend
npm start

# Start the frontend development server (from the frontend directory)
cd ../frontend
npm run dev
