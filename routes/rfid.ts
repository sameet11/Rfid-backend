import { Router } from "express";
import { AddRfid, Getproductdetails, Updatepayment, Paymentstatus } from "../controller/rfidcontroller";

const RfidRouter = Router();

RfidRouter.post('/add', AddRfid);
RfidRouter.get('/getproduct', Getproductdetails);
RfidRouter.put('/updatepayment', Updatepayment);
RfidRouter.get('/paymentstatus', Paymentstatus);

export default RfidRouter;