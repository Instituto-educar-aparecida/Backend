export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const input = req[source] ?? {};
        const result = schema.safeParse(input);

        if (!result.success) {
            return res.status(400).json({
                status: 'error',
                message: 'Dados de entrada inválidos.',
                details: result.error.issues.map((issue) => ({
                    campo: issue.path.join('.'),
                    mensagem: issue.message
                }))
            });
        }

        req[source] = result.data;
        next();
    };
};