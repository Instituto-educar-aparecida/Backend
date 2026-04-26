import { Router } from "express";
import {cadastrar, atualizarInformacoes, remover} from '../../database/CursoDataAcess.js';

/**
 * Construir rotas relacionadas a curso;
 * Avisar a Vini sobre a possibilidade de atualizar
 * as informações como emDestaque e matriculasAbertas.
 */

async function addCurso(req, res){
    const{titulo, descricao, cargaHoraria, nota, imagemCapa, status, matriculasAbertas, emDestaque} = req.body;
    if(!titulo || !descricao || !cargaHoraria || !nota || !imagemCapa || !status || !matriculasAbertas || !emDestaque){
        return res.status(400).json({msg: "Campo obrigatorio faltando"})
    }
    
    try{
        await cadastrar(titulo, descricao, cargaHoraria, nota, imagemCapa, status, matriculasAbertas, emDestaque);
        return res.status(201).json({msg:"Curso criado com sucesso!"})
    }catch{

    }
}

async function updateCurso(req, res){
    const {titulo, descricao, cargaHoraria, id} = req.body;
    if(!titulo || !descricao || !cargaHoraria || !id ){
     return res.status(400).json({msg:"Campo obrigatorio em branco."})   
    }

    try{
        await atualizarInformacoes(titulo, descricao, cargaHoraria, id)
        return res.status(200).json({msg:"Atualizado com sucesso."})
    }catch{

    }
}

async function deleteCurso(req, res){
    const {id} = req.body;
    try{
        await remover(id);
        return res.status(200).json({msg:"Curso removido."})
    }catch{
        return res.status(500).json({msg:"Erro. Tente novamente."})
    }
}