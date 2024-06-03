import Router from "express";
import CalculationController from "./CalculationController.js"

const calculationRouter = new Router()

calculationRouter.post("/min", new CalculationController().calculateMinimalFDs)
calculationRouter.post("/nf", new CalculationController().calculate3NF)
calculationRouter.post("/lossless", new CalculationController().checkLossless)
calculationRouter.post("/preserve", new CalculationController().checkDepsPreserving)

export default calculationRouter;