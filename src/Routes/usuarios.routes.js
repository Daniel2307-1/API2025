import express from 'express';
import {obetenerdatosA,obetenerdatos,postUsuarios } from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);
router.get('/usuarios',obetenerdatos)
router.post('/usuariosG/',postUsuarios)

export default router;
