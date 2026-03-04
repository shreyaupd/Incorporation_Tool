# Incorporation_Tool

A company incorporation tool consisting of a backend API and a frontend multi-step form. Built with React (TypeScript), Node.js, and PostgreSQL.

## Tech Stack
- Frontend: React (TypeScript), Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- Database: PostgreSQL with foreign key relationships

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (if running locally)
- Docker and Docker Compose (for backend containerization)

### Quick Start

```
# Clone and run
git clone https://github.com/shreyaupd/Incorporation_Tool.git
cd Incorporation_Tool
# Start the backend and database
docker-compose up -d
# Create database tables
docker exec -it postgres_db psql -U postgres -d corporationdb -c "
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    number_of_shareholder INT NOT NULL,
    total_capital NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shareholder (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES company(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nationality VARCHAR(100) NOT NULL
);
"
##Backend start verify
docker ps

##Frontend setup
(In new Powershell)
cd frontend
npm install
npm run dev

# Access:
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
```

## API EndPoints

- POST	/company	(Create a new company)
- POST	/company/:id/shareholders	(Add shareholders to a company)
- GET	/company	(Get all companies with shareholders)
- GET	/company/:id	(Get a specific company with its shareholders) 

## Features
- Multi-step form with company and shareholder details
- Dynamic shareholder forms based on input count
- Draft persistence (survives browser refresh)
- Navbar with Form and Admin dashboard to view all companies
- Dockerized backend
- TypeScript in React for type safety
- Responsive Tailwind CSS UI

## Repository
https://github.com/shreyaupd/Incorporation_Tool
