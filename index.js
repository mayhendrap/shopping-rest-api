import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import usersRoutes from './routes/users.js';
import shoppingRoutes from './routes/shooping.js';
import authenticatedCheck from './middlewares/authenticatedCheck.js';

const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', usersRoutes);
app.use('/api/shopping/', authenticatedCheck, shoppingRoutes);

app.get('/', (req, res) => {
    res.send('Haloo')
})

mongoose.connect('mongodb://localhost:27017/shoppingdb',  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log('server running on port 5000')))
    .catch((err) => console.log(err));