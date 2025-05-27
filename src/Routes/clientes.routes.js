import express from 'express';
import {obetenerdatos,obtenerclientesxid, postClientes,putClientes,patchclientes,deleteClientes} from '../Controladores/clientesCtrl.js'

const router = express.Router();
router.get('/clientes',obetenerdatos)
router.get('/clientes/:id',obtenerclientesxid)
router.post('/clientes/',postClientes)
router.put('/clientes/:id',putClientes)
router.patch('/clientes/:id',patchclientes)
router.delete('/clientes/:id',deleteClientes)


export default router