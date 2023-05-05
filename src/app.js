import express from 'express';
import router from './controllers/authController.js';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get("/", (req,res) => {
  res.json({"message": "Hello there!"});
});

app.use(router);