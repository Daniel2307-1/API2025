import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de usuarios');
};
export const obetenerdatosA = async (req, res) => {
 const { usuario} = req.params;

  try {
    const [result] = await sql.query(
      'SELECT * FROM usuarios WHERE usr_usuario = ? LIMIT 1',
      [usuario]
    );

    if (result.length > 0) {
      res.json({
        success: true,
        usuario: result[0]
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
