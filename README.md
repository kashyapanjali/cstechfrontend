# CS Tech Frontend

A modern web application for managing agents and lists, built with React and Tailwind CSS.

## Features

- Secure Authentication System
- Agent Management
  - Create, update, and delete agents
  - Activate/deactivate agent accounts
  - View agent details and status
- List Management
  - Upload and manage lists
  - Track list status (pending, in progress, completed)
  - Assign lists to agents
- Dashboard
  - Overview of system statistics
  - Quick access to important features
- Modern UI with Tailwind CSS
  - Responsive design
  - Clean and intuitive interface
  - Dark mode support

## Tech Stack

- React.js
- Tailwind CSS
- React Router
- Context API for state management
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cstechfrontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
REACT_APP_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/
│   ├── agents/        # Agent management components
│   ├── auth/          # Authentication components
│   ├── common/        # Shared components
│   ├── dashboard/     # Dashboard components
│   └── lists/         # List management components
├── context/           # React Context providers
├── services/          # API services
└── App.js            # Main application component
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## API Integration

The application integrates with a backend API for:
- User authentication
- Agent management
- List management
- Data retrieval and updates






