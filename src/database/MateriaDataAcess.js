import {Pool} from 'pg';
import {Materia} from '../domain/Materia.js'

const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


export const addMateria = async (Materia) => {
    try{
        const query = 'INSERT INTO "materia" (nome, descricao, professor_id) VALUES ($1, $2)';
        const values = [Materia.name, Materia.descriacao, Materia.professor_id];
        const res = await pool.query(query, values);

    }catch(err){
        console.Log("Add Materia: erro ao tentar inserir materia.");
    }
}

export const removeUser = async (id) => {
  
  let res = false
  try { 
    const query  = 'DELETE FROM "Materia" where id = $1';
    const values = [id]; 
    res = (await pool.query(query,values)).rowCount >0;
    console.log("Inserido: %O", count);
  } 
  catch (err) {
      console.Log("Remove: erro ao tentar remover materia.");    
   
  } 
  finally{
    return res;
  }
};