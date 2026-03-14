import {Pool} from 'pg';
import { Atividade } from '../domain/Atividade.js';


const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const addMateria = async (Atividade) => {
    try{
        const query = 'INSERT INTO "atividade" (nome, descricao, data_entrega, professor_id) VALUES ($1, $2, $3, $4)';
        const values = [Atividade.nome, Atividade.descricao, Atividade.professor_id, Atividade.data_entrega];
        const res = await pool.query(query, values);

    }catch(err){
        console.Log("Add Materia: erro ao tentar inserir materia.");
    }
}

export const removeUser = async (id) => {
  
  let res = false
  try { 
    const query  = 'DELETE FROM "atividade" where id = $1';
    const values = [id]; 
    res = (await pool.query(query,values)).rowCount >0;
    console.log("Inserido: %O", count);
  } 
  catch (err) {
      console.Log("Remove: erro ao tentar remover atividade.");    
   
  } 
  finally{
    return res;
  }
};



