import express from 'express';
import {postDetalle} from '../Controladores/pedidodetalleCtrl.js'

const router = express.Router();
router.post('/detalle/',postPedido)

export default router
