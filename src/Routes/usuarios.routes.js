import express from 'express';
import {obetenerdatosA,obetenerdatos} from '../Controladores/usuariosCtrl.js'

const router = express.Router();
router.get('/usuariosA/:id',obetenerdatosA)
router.get('/usuarios',obetenerdatos)
