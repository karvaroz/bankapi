import express, { Request, Response, Express, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import UserRouter from './src/router/UserRouter';

import DbInitializer from './src/database/init';

//create an app
const app = express();


app.use(
  cors({
    origin: '*',
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err) {
      return res.status(500).json({ status: false, message: (err as TypeError).message });
    }
  } catch (e) {}
});

app.use("/api/user", UserRouter)


app.get('/', (req : Request, res : Response) => {
  res.send(`Welcome to ${process.env.APPNAME}`);
});

const PORT = process.env.PORT || 5000;

const StartApp = async function () {
  try {
    await DbInitializer();
    app.listen(PORT, () => {
      console.log('App listening on port:', PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

StartApp();