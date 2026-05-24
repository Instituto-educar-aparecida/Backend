import { pool } from './UserDataAcess.js';


export const addProgresso = async (progressoCurso) => {
    try{
        const query = 'INSERT INTO "ProgressoCurso" (aluno_id, curso_id, status, updated_at) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [progressoCurso.aluno_id, progressoCurso.curso_id, progressoCurso.status, progressoCurso.updated_at];
        const res = await pool.query(query, values);
        return res.rows[0];

    }catch(err){
        console.error("Add Curso: erro ao tentar inserir curso.", err.message);
        throw err;
    }
}

export const removeProgresso = async (id) => {
  
  try { 
    const query  = 'DELETE FROM "ProgressoCurso" where id = $1';
    const res = await pool.query(query, [id]); 
    return res.rowCount > 0;
  } 
  catch (err) {
      console.error("Remove: erro ao tentar remover curso.", err.message);    
      throw err;
   
  } 
};
