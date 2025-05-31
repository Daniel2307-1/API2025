import express from 'express';
import {postProducto } from '../Controladores/productosCtrl.js'

const router = express.Router();
router.post('/productosA',postProducto)

export default router
