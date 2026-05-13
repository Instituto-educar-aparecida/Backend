import {addModulo, removeModulo, updateModulo, getModuloById, getModulosByCurso} from './database/ModuloDataAcess.js';


// Rotas modules para serem feitas:
// POST /courses/:id/modules
// PUT /modules/:id
// DELETE /modules/:id


async function adcModulo(req, res){
    const{nome, descricao, curso_id} = req.body;
    if(!nome || !descricao || !curso_id){
        return res.status(400).json({msg:"Campo obrigatorio em branco."})
    }
    try{
        adcModulo(nome, descricao, curso_id);
        return res.status(200).json({msg:"Removido com sucesso!"})
    }catch{
            
    }
}

async function deleteModulo(req, res){
    const{id} = req.body;
    if(!id){
        return res.status(400).json({msg:"Campo obrigatorio em branco."})
    }
    try{
        removeModulo(id)
        return res.status(200).json({msg:"Removido com sucesso!"})
    }catch{

    }
}

async function obterPorId(req, res){
    const{id} = req.body;
    if(!id){
        return res.status(400).json({msg:"Campo obrigatorio em branco."})
    }
    try{
        getModuloById(id)
        return res.status(200)
    }catch{

    } 
}

async function obterPorCurso(req, res){
    const{curso} = req.body;
    if(!curso){
        return res.status(400).json({msg:"Campo obrigatorio em branco."})
    }
    try{
        getModulosByCurso(curso)
        return res.status(200)
    }catch{

    }
}