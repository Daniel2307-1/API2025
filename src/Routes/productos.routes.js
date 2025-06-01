import express from 'express';
import {postProducto,putProducto  } from '../Controladores/productosCtrl.js'

const router = express.Router();
router.post('/productosA',postProducto)
router.put('/productos/:id',putProducto)

export default router
