import express, { Router } from 'express';

class Api {
  public router: Router = express.Router();

  constructor() {
    this.router.get('/', (req, res) => {
      res.send('Welcome to the API!');
    });
  }
}

const api = new Api();

export default api;
