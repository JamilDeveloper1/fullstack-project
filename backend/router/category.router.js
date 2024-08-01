import express from 'express';
import { createCategory, getAllCategories, updateCategory, deleteCategory,getProductsByCategory } from '../controller/category.controller.js';

const router = express.Router();



router.post('/categories', createCategory);

router.get('/categories', getAllCategories);

router.put('/categories/:id', updateCategory);

router.delete('/categories/:id', deleteCategory);

router.get('/categories/:categoryName/products', getProductsByCategory);



export default router;
