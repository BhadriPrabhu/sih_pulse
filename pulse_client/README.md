# Project Pulse Client

**SIH Problem Statement 26063** | **Team Null Hypothesis**

This is the frontend application for Project Pulse, built with React and Vite. It delivers a modern, interactive experience for exploring project sections such as landing, media, learn, expeditions, data library, and authentication flows.

## Overview

The client app is designed as a responsive, content-rich portal with a unified experience across multiple routes. Key pages are organized under feature folders and connected through React Router.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React

## Features

- immersive landing page with motion-based transitions
- explore and discovery views
- data library section
- media and storytelling content
- expedition content pages
- learning and educational content
- login/auth page
- animated navigation experience

## Project Structure

```text
pulse_client/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── data/
│   ├── features/
│   │   ├── auth/
│   │   ├── data-library/
│   │   ├── expeditions/
│   │   ├── explore/
│   │   ├── landing/
│   │   ├── learn/
│   │   └── media/
│   ├── router/
│   ├── store/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Routes

The app currently includes the following pages:

- `/` - landing page
- `/explore` - explore page
- `/data-library` - data library
- `/media` - media page
- `/expeditions` - expeditions section
- `/learn` - educational section
- `/login` - login page

## Prerequisites

Before running the app, install:

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

This starts the Vite development server. The terminal output will provide the local URL to open in the browser.

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Notes

- The app uses a feature-based folder structure for scalability.
- Animations are handled with Framer Motion to create polished transitions.
- Styling is organized with Tailwind CSS and custom component styling.

## Team

**Team Null Hypothesis**