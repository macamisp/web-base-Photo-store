# Backend Setup Guide

This project uses a custom Node.js/Express backend with MySQL, instead of Supabase.

## Prerequisites

- Node.js installed
- MySQL Server installed and running
- MySQL credentials:
  - User: `root`
  - Password: `1234`
  - (Or update `backend/.env` with your credentials)

## Setup Instructions

1.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```

2.  **Database Setup**
    Ensure your MySQL server is running.
    Create the database if it doesn't exist:
    ```bash
    mysql -u root -p1234 -e "CREATE DATABASE IF NOT EXISTS photostore;"
    ```
    (Or create it manually using a tool like Workbench or phpMyAdmin).

3.  **Start Backend Server**
    ```bash
    cd backend
    npm start
    ```
    The server will start on `http://localhost:5000`.
    It will automatically create the necessary tables (`users`, `photos`) on the first run.

4.  **Frontend Setup**
    Open a new terminal:
    ```bash
    npm install
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

## Architecture

- **Frontend**: React + Vite
- **Backend**: Express + MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local filesystem (`backend/uploads`)

## Troubleshooting

- **Database Connection Error**: Check if MySQL is running and credentials in `backend/.env` (or default in `backend/config/database.js`) are correct.
- **Uploads not working**: Ensure `backend/uploads` directory exists (it is created automatically on server start).
