# API

## POST /adm/user
```
{
    id: bigInt
    alterarRole: string
    bloquear: bool
}
```

## GET /adm/relatorio
```
{
    
}
```
## GET /adm/users
```
{
    
}
```

## POST /aluno
```
{
    "name":"Maryana S Carvalho",
    "email":"mcEducar@gmail.com",
    "senha":"1234"   
}
```

## PUT /aluno
```
{
    "id": "bigInt",
    "name":"Maryana S Carvalho",
    "email":"mcEducar@gmail.com",
    "senha":"1234"   
}
```

## POST /aluno/inscricao
```
{
    idCurso: bigInt
    idAluno: bigInt
}
```

## DELETE /aluno/inscricao
```
{
    idCurso: bigInt
    idAluno: bigInt
}
```
## POST /aluno/curso/avaliarCurso
```
{
    IdAluno	: Bigint
    IdCurso	: BigInt
    Nota	: int
    comentário	: string
}
```

## GET /aluno/curso
```
{
    IdAluno	: Bigint
}
```

## POST /login
```
{
    "email":"mcEducar@gmail.com",
    "senha":"1234"
}
```

## POST /curso
```
{
    Titulo	: String
    Descrição	: String
    CargaHoraria	: Int
    ImagemCapa	: Blob
    Status	: String    
}
```

## POST /curso/modulo
```
{
    Name	: String
    Descrição	: String
    IdCurso	: Bigint
}
```

## DELETE /curso/modulo
```
{
    id: int
}
```

## PUT /curso/modulo
```
{
    id: int
    Name	: String
    Descrição	: String
}
```
## POST /curso/modulo/Aula
```
{
    Duracao	: String
    Descrição	: String
    Link	: String
    ModuloId	: BigInt
    professorId	: String
}
```
## PUT /curso/modulo/Aula
```
{
    ID: bigInt
    Duracao	: String
    Descrição	: String
    Link	: String
    ModuloId	: BigInt
    professorId	: String
}
```

## DELETE /curso/modulo/Aula
```
{
    id: int
}
```

## POST /curso/modulo/atividade
```
{
    Id	: Bigint
    Titulo	: String
    ModuloId	: String
    status	: String
    QtdQuestoes	: Int
}
```
## GET /curso/modulo/atividade/progresso
```
{
    Aluno_id	: BigInt
    atividade_Id	: BigInt
    status	: String
    Resposta	: Lista<String>
    Avaliacao	: Bigint
}
```

## POST  /curso/modulo/atividade/questObjetiva
```
{
    IdAtividade		: Bigint
    Imagem	: Blob
    Numero	: Int
    Descricao	: String
    Alternativa1	: String
    Alternativa2	: String
    Alternativa3	: String
    Alternativa4	: String
    Alternativa5	: String
    AlternativaCorreta	: int
}
```
## POST  /curso/modulo/atividade/questAberta
```
{
    IdAtividade		: Bigint
    Imagem	: Blob
    Numero	: Int
    Descricao	: String
}
```



