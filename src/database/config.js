import { Pool } from 'pg';


const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

  console.log('--> config db carregado');

export const getUsersDb = async () => {
    console.log('getUsersDb');
  try {
    const query = `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.hash AS senha,
        p.materia 
      FROM "user" u
      LEFT JOIN professores p on u.id = p.user_id;
    `;
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    // Optional: end the pool if the application is shutting down
    // await pool.end(); 
  }
};



export const addUser = async (name, email, hash, role) => {
    console.log('addUser');
  try {
    const query  = 'INSERT INTO "user" (name, email, hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role;';
    const values = [name, email, hash, role]; 
    const res = await pool.query(query,values);
    return res.rows[0];
  } catch (err) {
      console.error("Add user: erro ao tentar inserir usuario", err.message);
      throw err;
  } finally {
  }
};

export const VincProf = async (userId, materia) => {
    console.log('vincularProfessor no Postgres para o ID:', userId);
  try {
    const query = `
      INSERT INTO professores (user_id, materia)
      VALUES ($1, $2)
      ON CONFLICT (user_id) DO UPDATE SET materia = $2
      RETURNING *;
    `;
    const values = [userId, materia];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
      console.error("Erro ao vincular professor no banco:", err.message);
      throw err;
  }
}
// export async function dbTeste(){
//   await setTimeout(10000);
//     //addUser(4);
//      await setTimeout(10000);
//     getUsersDb();
// }

export default {addUser, getUsersDb, VincProf};
