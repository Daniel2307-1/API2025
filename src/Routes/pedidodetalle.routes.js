import express from 'express';
import {postDetalle} from '../Controladores/pedidodetalleCtrl.js'

const router = express.Router();
router.post('/detalle/',postDetalle)

export default router
