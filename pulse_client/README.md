# Project Pulse

**SIH Problem Statement 26063** | **Team Null Hypothesis**

This repository contains the frontend client for **Project Pulse**, developed for the Smart India Hackathon (SIH). 

## Tech Stack

* **Framework:** [React.js](https://reactjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## Prerequisites

Make sure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v16 or higher recommended)
* npm or yarn

## Folder Structure
```text
pulse_client/
├── node_modules/
├── public/
├── src/
│   ├── api/           # API integration and services
│   ├── assets/        # Static files like images (e.g., react.svg)
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── routes/        # Application routing configurations
│   ├── store/         # State management (e.g., Redux, Zustand)
│   ├── utils/         # Helper functions and constants
│   ├── App.css        # App-specific styles
│   ├── App.jsx        # Main application component
│   ├── index.css      # Global styles and Tailwind directives
│   └── main.jsx       # React DOM entry point
├── .gitignore
├── eslint.config.js   # ESLint configuration
├── index.html         # Main HTML template
├── package-lock.json
├── package.json
├── postcss.config.js  # PostCSS configuration (used with Tailwind)
└── README.md
```