import express from 'express';
import multer from 'multer';
import { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'mainPicture' || file.fieldname === 'additionalPictures') {
            cb(null, true);
        } else {
            cb(new Error('Unexpected field'), false);
        }
    }
});

router.post('/', upload.fields([
    { name: 'mainPicture', maxCount: 1 },
    { name: 'additionalPictures', maxCount: 4 }
]), createProduct);

router.get('/', getAllProducts);

router.get('/:id', getSingleProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', upload.fields([
    { name: 'mainPicture', maxCount: 1 },
    { name: 'additionalPictures', maxCount: 4 }
]), updateProduct);

export default router;
