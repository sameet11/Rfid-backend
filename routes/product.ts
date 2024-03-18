import { Router } from 'express';
import { Createprod } from '../controller/productcontrol';
const Productrouter = Router();

Productrouter.post('/create', Createprod);

export default Productrouter;
