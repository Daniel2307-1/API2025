import { sql } from '../bd.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // ✅ Carga variables del archivo .env

const SECRET_KEY = process.env.JWT_SECRET; // 🔐 Usa la variable segura

export const enviarmensajedebasededatos = (req, res) => {
  res.send('Lista de usuarios');
};

export const obetenerdatosA = async (req, res) => {
  const { usuario, clave } = req.params;

  try {
    const [result] = await sql.query(
      'SELECT * FROM usuarios WHERE usr_usuario = ? AND usr_clave = ? LIMIT 1',
      [usuario, clave]
    );

    if (result.length > 0) {
      const usuarioData = result[0];

      // 🔐 Crear el token con los datos que quieras incluir
      const token = jwt.sign(
        {
          id: usuarioData.usr_id,
          nombre: usuarioData.usr_nombre,
          usuario: usuarioData.usr_usuario
        },
        SECRET_KEY,
        { expiresIn: '2h' } // ⏰ Opcional: duración del token
      );

      res.json({
        success: true,
        usuario: usuarioData,
        token // ✅ Enviar token al frontend
      });
    } else {
      res.json({
        success: false,
        message: 'Usuario o clave incorrectos'
      });
    }

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: error.message
    });
  }
};

export const obetenerdatos = async (req, res) => {
  try {
    const [result] = await sql.query('SELECT * FROM usuarios');
    res.json({ cant: result.length, data: result });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return res.status(500).json({
      message: "Error en el servidor",
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      }
    });
  }
};

export const postUsuarios = async (req, res) => {
  try {
    const {
      usr_usuario,
      usr_clave,
      usr_nombre,
      usr_telefono,
      usr_correo,
      usr_activo
    } = req.body;

    if (!usr_usuario || !usr_clave || !usr_nombre || usr_activo === undefined) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await sql.query(
      `INSERT INTO usuarios 
      (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo]
    );

    res.send({
      id: result.insertId,
      message: "Usuario registrado con éxito"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: {
        message: error.message,
        code: error.code,
        stack: error.stack
      }
    });
  }
};
