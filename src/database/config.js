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
    const res = await pool.query('SELECT * FROM "user" ');
    res.fields.re
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    // Optional: end the pool if the application is shutting down
    // await pool.end(); 
  }
};


/** Adicionar um usuário 
 * @param userId - id do usuário
 * retorna
*/
export const addUser = async (name, email, hash, role) => {
    console.log('addUser');
  try {
    const query  = 'INSERT INTO "user" (name, email, hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role;';
    const values = [name, email, hash, role]; 
    const res = await pool.query(query,values);
    return res.rows[0];
  } catch (err) {
      throw Error("Add user: erro ao tentar inserir usuario");
  } finally {
  }
};

export async function dbTeste(){
  await setTimeout(10000);
    //addUser(4);
     await setTimeout(10000);
    getUsersDb();
}

export default dbTeste;