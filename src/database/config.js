import { Pool } from 'pg';
import {user,roles} from "../domain/User.js"
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
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    // Optional: end the pool if the application is shutting down
    // await pool.end(); 
  }
};


/** Adicionar um usuário 
 * Retorna: 
 *  - id se usuário adicionado com sucesso * 
 *  - {} do contrario
*/
export const addUser = async (user) => {
    console.log('addUser ${user}');
  try { 
    const query  = 'INSERT INTO "user" (name, email, hash, role) VALUES ($1, $2, $3, $4) RETURNING id;';
    const values = [user.name, user.email, user.hash, user.role]; 
    const res = await pool.query(query,values);
       console.log("Inserido: %O", res.rows[0].id);
  } 
  catch (err) {
      console.Log("Add user: erro ao tentar inserir usuario");
  } 
  finally {
    return {}; //se chegou no finally retorna vazio
  }
};

/** Remove um usuário 
 * Retorna: true se usuário removido com sucesso * 
*/
export const removeUser = async (id) => {
  console.log('addUser');
  let res = false
  try { 
    const query  = 'DELETE FROM "user" where id = $1';
    const values = [id]; 
    res = (await pool.query(query,values)).rowCount >0;
    console.log("Inserido: %O", count);
  } 
  catch (err) {
      console.Log("Add user: erro ao tentar remover usuario");    
   
  } 
  finally{
    return res;
  }
};

 export async function dbTeste() {
    const u = new user("callrlos","carlllos@gmail.com","st","adssfdadfhuha");
    await addUser(u);
    if(await removeUser(10))
      console.log("removido");
    await getUsersDb();
}

export default {addUser, getUsersDb,dbTeste};