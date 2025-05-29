import express from 'express';
import {obetenerdatos,obtenerproductosxid} from '../Controladores/catalogoCtrl.js'

const router = express.Router();
router.get('/catalogo',obetenerdatos)
router.get('/catalogo/:id',obtenerproductosxid)

export default router
