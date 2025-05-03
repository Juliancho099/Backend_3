 import {Router} from 'express';
import {ProductController} from '../controllers/product.controller.js';
import { isAdmin } from '../middlewares/validateRole.js';
import { validate } from '../middlewares/validate.js';
import { productDto } from '../dto/product.dto.js';
import passport from 'passport';
export const productRouter = Router();
const productController = new ProductController();

productRouter.get('/', productController.getAll);
productRouter.get('/:pid', productController.getById);
productRouter.post('/',validate(productDto), isAdmin, productController.create);
productRouter.put('/:pid', isAdmin, productController.update);
productRouter.delete(
    '/:pid',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    productController.delete
  );
