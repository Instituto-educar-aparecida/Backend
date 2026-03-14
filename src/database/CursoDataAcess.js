import { Curso, curso_status } from "../domain/Curso.js";

const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const addMateria = async (Curso) => {
    try{
        const query = 'INSERT INTO "curso" (titulo, materia_id, professor_id, status) VALUES ($1, $2, $3, $4)';
        const values = [Curso.titulo, Curso.materia_id, Curso.professor_id, Curso.status];
        const res = await pool.query(query, values);

    }catch(err){
        console.Log("Add Curso: erro ao tentar inserir curso.");
    }
}

export const removeUser = async (id) => {
  
  let res = false
  try { 
    const query  = 'DELETE FROM "curso" where id = $1';
    const values = [id]; 
    res = (await pool.query(query,values)).rowCount >0;
    console.log("Inserido: %O", count);
  } 
  catch (err) {
      console.Log("Remove: erro ao tentar remover curso.");    
   
  } 
  finally{
    return res;
  }
};