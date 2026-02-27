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
export const addUser = async (userId) => {
    console.log('addUser');
  try {
    const query  = 'INSERT INTO "user" (id) VALUES ($1)';
    const values = [userId]; 
    const res = await pool.query(query,values);
  
  } catch (err) {
      throw Error("Add user: Argumento inválido:"+err,{cause: err});
  } finally {
  }
};

export async function dbTeste(){
  await setTimeout(10000);
    addUser(4);
     await setTimeout(10000);
    getUsersDb();
}

export default dbTeste;