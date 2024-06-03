import express from "express"
import cors from "cors"
import CalculationRouter from "./CalculationRouter.js";

const PORT = 8888;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/calc', CalculationRouter)

async function start() {
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  }
  
start()