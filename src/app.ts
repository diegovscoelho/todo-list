import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});