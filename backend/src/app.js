import dotenv from 'dotenv'
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/database.js';
import tenderRoutes from './routes/tenderRoutes.js';
import bidRoutes from './routes/bidRoutes.js';
import evaluationRoutes from './routes/evaluationRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import config from './config/config.js';
import documentRoute from './routes/tenderDocumentRoute.js';
import logger from './middleware/logger.js';
import cors from 'cors';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(logger);

app.use('/api/auth/', authRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/tenders', documentRoute);

app.use(errorMiddleware)

sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

export default app;