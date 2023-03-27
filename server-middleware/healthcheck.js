import express from "express"
import { StatusCodes } from "http-status-codes"

const app = express();
app.use(express.json());
app.get('/healthz', async (req, res) => {
  res.status(StatusCodes.OK).json("healthz!");
});

module.exports = app