import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, "Nome tem que ter ao menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha tem que ter ao menos 6 caracteres")
}).strict();

export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(1, "Senha é obrigatória")
}).strict();

export const MATERIAS_VALIDAS = ['matematica', 'portugues', 'ciencias', 'historia', 'geografia'];
export const materiaParamSchema = z.enum(MATERIAS_VALIDAS, {
    errorMap: () => ({ message: "Essa matéria não existe no currículo" })
});

export const vincProfSchema = z.object({
    userId: z.union([z.string(), z.number()]),
    materia: z.enum(MATERIAS_VALIDAS)
}).strict();

export const tokenPayloadSchema = z.object({
    id: z.union([z.string(), z.number()]),
    nome: z.string(),
    role: z.enum(['admin', 'professor', 'aluno']),
    iat: z.number().optional(), 
    exp: z.number().optional()
});
     
