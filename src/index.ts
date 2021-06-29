import dotenv from 'dotenv-safe';
import app from './app';

dotenv.config();

(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Listening at http://localhost:${process.env.PORT}`),
  );
})().catch((err) => {
  console.log(err);
  process.exit(1);
});
