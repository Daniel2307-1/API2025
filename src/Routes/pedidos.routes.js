import express from 'express';
import {obetenerdatos,obtenerpedidosxid, postPedido} from '../Controladores/pedidosCtrl.js'

const router = express.Router();
router.get('/pedidos',obetenerdatos)
router.get('/pedidos/:id',obtenerpedidosxid)
router.post('/pedidosA/',postPedido)

export default router
