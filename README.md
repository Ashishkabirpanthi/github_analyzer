# GitHub Profile Analyzer API

## Tech Stack
- Node.js
- Express.js
- MySQL
- GitHub REST API

## Features
- Analyze GitHub profiles
- Store profile insights in MySQL
- Fetch all analyzed profiles
- Fetch a single analyzed profile

## Installation

npm install

## Environment Variables

PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

## Run

npm start

## API Endpoints

POST /api/profiles/analyze/:username

GET /api/profiles

GET /api/profiles/:username