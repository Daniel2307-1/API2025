import express from 'express';
import {obetenerdatosA,obetenerdatos,postUsuarios } from '../Controladores/usuariosCtrl.js'
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);
router.get('/usuarios', verifyToken, obetenerdatos);
router.post('/usuariosG/',postUsuarios)

export default router;
