import { Pool } from 'pg';
import { setTimeout } from 'timers/promises';

const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

  console.log('--> config db carregado');
// Example query
export const getUsersDb = async () => {
    console.log('getUsersDb');
  try {
    const res = await pool.query('SELECT * FROM "User" ');
    res.fields.re
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    // Optional: end the pool if the application is shutting down
    // await pool.end(); 
  }
};

export const addUser = async (user) => {
    console.log('addUser');
  try {
    const query  = 'INSERT INTO "Usuarios" (id) VALUES ($1)';
    const values = [4]; 
    const res = await pool.query(query,values);
  
  } catch (err) {
    console.error(err);
  } finally {
  }
};

export async function dbTeste(){
  await setTimeout(10000);
    getUsersDb();
}

export default dbTeste;