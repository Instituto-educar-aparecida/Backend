import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Instituto Educar', version: '1.0.0' },
    servers: [{ url: '/api' }],
  },
  apis: ['./src/routes/*.js', './index.js'], 
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  
  const swaggerPath = ['/api/docs', '/docs'];
  
  app.use(swaggerPath, swaggerUi.serve, swaggerUi.setup(specs));

  // Redirecionamentos para evitar o "Cannot GET"
  app.get('/api/docs', (req, res) => res.redirect('/api/docs/'));
  app.get('/docs', (req, res) => res.redirect('/docs/'));

  console.log('📖 Swagger configurado em /api/docs/');
};

