import { Router } from 'express';
import Productrouter from './product';
import RfidRouter from './rfid';

const rootRouter = Router();


rootRouter.use('/product', Productrouter);
rootRouter.use('/rfid', RfidRouter)

export default rootRouter;
