   

# Esquema de banco de dados

## Usuario
```
{
    id	      : Bigint
    name	  : String
    email	  : String
    role	  : Int
    senhaHash : String
    ativa	  : bool
}
```

## Curso
```
{
    id	               : Bigint
    titulo	           : String
    descrição	       : String
    cargaHoraria	   : Int
    nota	           : Int
    imagemCapa	       : Blob
    status	           : String
    matriculasAbertas  : bool
    emDestaque	       : bool

}
```
## Modulo
```
{
    id	      : Bigint
    name	  : String
    descrição : String
    idCurso	  : Bigint
}
```

## Aula
```
{
    id	        : Bigint
    titulo      : String
    duracao	    : String
    descrição   : String
    link	    : String
    moduloId	: BigInt
    professorId	: String
}
```


## Arquivo
```
{
    id	     : Bigint    
    data	 : Blob
    titulo	 : String
    moduloId : BigInt
}
```

## TextoApoio
```
{   
    id	     : Bigint
    texto	 : String
    moduloId : BigInt
}
```

## ProgressoAula
```
{
    id	       : Bigint
    aluno_id   : BigInt
    aula_Id	   : BigInt
    tempoAtual : int
    status	   : String
}
```
## Atividade
```
{
    id	        : Bigint
    titulo	    : String
    moduloId	: String
    status	    : String
    qtdQuestoes	: Int
}
```

## QuestaoObjetiva
```
{
    idAtividade		    : Bigint
    imagem	            : Blob
    numero	            : Int
    descricao	        : String
    alternativa1	    : String
    alternativa2	    : String
    alternativa3	    : String
    alternativa4	    : String
    alternativa5	    : String
    alternativaCorreta	: int
}
```

## QuestaoAberta
```
{
    idAtividade	: Bigint
    imagem	    : Blob
    numero	    : Int
    descricao	: String
}
```

## ProgressoAtividade
```
{
    id	      : Bigint
    aluno_id  : BigInt
    aula_Id	  : BigInt
    status	  : String
    resposta  : Lista<String>
    avaliacao : Bigint
}
```

## Inscricao
```
{
    idAluno	: Bigint
    idCurso	: BigInt
    status	: String
}
```

## AvaliacaoCurso
```
{
    id	       : Bigint
    idCurso	   : BigInt
    nota	   : int
    comentário : string
}
```

## RelatorioAluno
```
{
    idUsuario: "A1",
    numeroCursos: 2,
    cursosTerminados: 0,
    horasMensais: 3
}
```