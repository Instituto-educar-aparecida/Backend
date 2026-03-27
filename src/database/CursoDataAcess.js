import { pool } from "../UserDataAcess.js";

export const addCurso = async (curso) => {
    try{
        const query = 'INSERT INTO "curso" (titulo, materia_id, professor_id, status) VALUES ($1, $2, $3, $4) RETURNING *' ;
        const values = [curso.titulo, curso.materia_id, curso.professor_id, curso.status];
        const res = await pool.query(query, values);
        return res.rows[0];

    }catch(err){
        console.error("Add Curso: erro ao tentar inserir curso.", err.message);
        throw err;
    }       
};

export const removeCurso = async (id) => {
  
  try { 
    const query  = 'DELETE FROM "curso" where id = $1';
    const res = await pool.query(query, [id]); 
    return res.rowCount > 0;
  } 
  catch (err) {
      console.error("Remove: erro ao tentar remover curso.", err.message);    
      throw err;
  } 
 
};
