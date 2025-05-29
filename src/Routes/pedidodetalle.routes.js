import express from 'express';
import {postDetalle,obetenerdatos } from '../Controladores/pedidodetalleCtrl.js'

const router = express.Router();
router.post('/detalle/',postDetalle)
router.post('/detalle',obetenerdatos)

export default router
