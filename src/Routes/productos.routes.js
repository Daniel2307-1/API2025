import express from 'express';
import {postProducto,putProducto,deleteProductos} from '../Controladores/productosCtrl.js'

const router = express.Router();
router.post('/productosA',postProducto)
router.put('/productos/:id',putProducto)
router.put('/productos/:id',putProducto)
router.delete('/productosD/:id',deleteProductos)

export default router
