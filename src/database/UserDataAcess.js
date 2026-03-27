import { Pool } from 'pg';


export const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
});


export const getUsersDb = async () => {
    
  try {
    const query = `
     SELECT u.id, u.name, u.email, u.role, p.materia
     FROM "user" u
     LEFT JOIN professores p ON u.id = p.user_id;
    `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("getUsersDb:", err.message);
    throw err;
  } 
};

export const findUserByEmail = async (email) => {
  try {  
    const query = 'SELECT id, name, email, hash, role FROM "user" WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch(err) {
    console.error("findUserByEmail:", err.message);
    throw err;
  }
};


/** Adicionar um usuário 
 * Retorna: 
 *  - id se usuário adicionado com sucesso * 
 *  - {} do contrario
*/
export const addUser = async (name, email, hash, role) => {
    console.log("AddUser: ");
  try { 
    const query  = 'INSERT INTO "user" (name, email, hash, role) VALUES ($1, $2, $3, $4) RETURNING id;';
    const res = await pool.query(query, [name, email, hash, role]);
    return res.rows[0];
  } 
  catch (err) {
      console.error("addUser:", err.message);
      throw err;
  } 
};

/** Remove um usuário 
 * Retorna: true se usuário removido com sucesso * 
*/
export const removeUser = async (id) => {
  let res = false
  try { 
    const query  = 'DELETE FROM "user" where id = $1';
    const res =  await pool.query(query, [id]); ;
    return res.rowCount > 0;
  } 
  catch (err) {
      console.error("removeUser", err.message);  
      throw err;
        
  } 
};

export const VincProf = async (userId, materia) => {
    try{
        const query = `
         INSERT INTO professores (user_id, materia) 
         VALUES ($1, $2) 
         ON CONFLICT (user_id) DO UPDATE SET materia = $2
         RETURNING *;
        `;
        const res = await pool.query(query, [userId, materia]);
        return res.rows[0];

    }catch(err){
        console.error("VincProf.", err.message);
        throw err;
    }       
};


export default {addUser, getUsersDb};
