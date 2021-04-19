import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import morgan from 'morgan';
import { notFound } from './middlewares/notFound';
import { exception } from './middlewares/exception';

const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use(exception);

app.use(notFound);

app.listen(3000, () => console.log('Listening at http://localhost:3000'));
