import { pool } from './UserDataAcess.js';



export const addMateria = async (materia) => {
    try{
        const query = 'INSERT INTO "materia" (nome, descricao, professor_id) VALUES ($1, $2, $3) RETURNING *';
        const values = [materia.nome, materia.descricao, materia.professor_id];
        const res = await pool.query(query, values);
        return res.rows[0];

    }catch(err){
        console.error("Add Materia: erro ao tentar inserir materia.", err.message);
        throw err;
    }
}

export const removeMateria = async (id) => {
  
  let res = false
  try { 
    const query  = 'DELETE FROM "materia" where id = $1';
    const res = await pool.query(query, [id]); 
    return res.rowCount > 0;
  } 
  catch (err) {
      console.error("Remove: erro ao tentar remover materia.", err.message);  
      throw err;
   
  };
};
