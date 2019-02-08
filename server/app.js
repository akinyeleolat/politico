import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import router from './routes';

const debugg = debug('app');
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const swaggerDocument = yaml.load(`${process.cwd()}/swagger.yaml`);
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.status(200).json({
    success: 'true',
    message: 'Welcome to Politico landing page',
  });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('*', (err, req, res, next) => {
  const statusCode = 400;
  res.status(statusCode).json({
    success: statusCode,
    error: err.message,
  });
  next();
});
app.use('/api/v1', router);
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
export default app;
