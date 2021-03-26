import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

require('dotenv').config();

const PORT = process.env.PORT || 8080;

// Express Middlewares

app.use(express.json());

// Routes
import userRoutes from './routes/UserRoutes';

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}`);
});
