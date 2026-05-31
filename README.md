# GitHub Profile Analyzer & Repository Insights API

A REST API built with Node.js, Express.js, and MySQL that analyzes GitHub users and their repositories, stores insights in a database, and provides analytics through API endpoints.

## Live Demo

https://github-analyzer-v8ld.onrender.com

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios
- Render (Backend Deployment)
- FreeSQLDatabase (Cloud MySQL)

---

## Features

### GitHub Profile Analysis

Fetch and analyze GitHub users by username.

Stored Profile Information:

- Username
- Name
- Bio
- Location
- Company
- Blog URL
- Twitter Username
- Followers
- Following
- Public Repositories
- Public Gists
- Avatar URL
- GitHub Account Creation Date
- Account Age (Days)

### Repository Analytics

Analyze user repositories and generate insights:

- Top Programming Language
- Total Stars Received
- Total Forks Received
- Most Starred Repository

### Database Features

- Store analyzed profiles
- Update existing profiles automatically
- Prevent duplicate entries
- Cloud MySQL integration

### API Features

- Analyze GitHub Profile
- Get All Profiles
- Get Single Profile
- Health Check Endpoint

---

## Project Structure

```txt
github_analyzer/
│
├── src/
│   ├── config/
│   │   └── db.config.js
│   │
│   ├── controllers/
│   │   └── profile.controller.js
│   │
│   ├── models/
│   │   └── profile.model.js
│   │
│   ├── routes/
│   │   └── profile.routes.js
│   │
│   └── services/
│       └── github.service.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd github_analyzer
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DB_HOST=your_host
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

## Run Locally

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/profiles/analyze/:username
```

Example:

```http
POST /api/profiles/analyze/octocat
```

---

### Get All Profiles

```http
GET /api/profiles
```

---

### Get Single Profile

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

---

### Health Check

```http
GET /health
```

---

## Example Response

```json
{
  "success": true,
  "data": {
    "username": "octocat",
    "name": "The Octocat",
    "followers": 22803,
    "following": 9,
    "public_repos": 8,

    "bio": null,
    "location": "San Francisco",
    "company": "@github",

    "public_gists": 8,
    "account_age_days": 5600,

    "top_language": "HTML",
    "total_stars": 19000,
    "total_forks": 9000,
    "most_starred_repo": "Spoon-Knife"
  }
}
```

---

## Deployment

Backend deployed on Render.

Database hosted on FreeSQLDatabase.

---

## Future Improvements

- GitHub Score Calculation
- Language Breakdown Analytics
- Search API
- Pagination
- Sorting
- Statistics Dashboard
- Swagger Documentation
- Redis Caching
- Rate Limiting
- Authentication & Authorization

---

## Author

Aashish Kabirpanthi

Built as part of a backend development internship assignment and extended into a GitHub Analytics API project.
