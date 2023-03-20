import express from 'express';
import {
  getResturans,
  createResturants,
  getResturansspecficid,
  updateresturant,
  deleteResturant
} from '../controllers/resturantcontroller.js';
// import advancedResults from '../middleware/advancedResults.js';
// import Shop from '../models/Shop.js';

const router = express.Router();

router
  .route('/')
  .get(getResturans)
  .post(createResturants);

router
  .route('/:id')
  .get(getResturansspecficid)
  .put(updateresturant)
  .delete(deleteResturant);

export default router;