import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'photostore',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Connected Successfully!');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ MySQL Connection Error:', error.message);
        return false;
    }
}

export default pool;
