import express from 'express';
import {obetenerdatosA,obetenerdatos} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuariosA/:usuario/:clave', obetenerdatosA);
router.get('/usuarios',obetenerdatos)


export default router;
