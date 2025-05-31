import express from 'express';
import {postProducto } from '../Controladores/productosCtrl.js'

const router = express.Router();
router.post('/clientesA',postProducto)

export default router
