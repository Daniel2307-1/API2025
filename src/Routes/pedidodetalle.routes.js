import express from 'express';
import {postDetalle,obetenerdatos } from '../Controladores/pedidodetalleCtrl.js'

const router = express.Router();
router.post('/detalleA',postDetalle)
router.get('/detalle',obetenerdatos)

export default router
