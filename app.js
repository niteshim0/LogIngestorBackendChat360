import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getLogs, postLogs } from "./controllers/logs.controller.js";
import { Log } from "./models/log.model.js";

const app = express()

app.use(cors({
  origin:"*",
  credentials:true
}))

app.use(express.json({limt:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.post('/', async (req, res) => {
  try {
      const logData = req.body;

      const validationResult = Log.validate(logData);

      if (validationResult.error) {
          return res.status(400).json({ error: validationResult.error.message });
      }

      const log = new Log(logData);
      await log.save();

      return res.status(201).json({ message: 'Log successfully ingested' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/logs', async (req, res) => {
  try {
      let query = {};
      query = req.query;
      const logs = await Log.find(query);
      res.json(logs);
  } catch (error) {
      console.error('Error fetching logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



export {app}