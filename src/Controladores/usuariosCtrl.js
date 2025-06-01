import { sql } from '../bd.js';

export const enviarmensajedebasededatos = (req, res) => {
    res.send('Lista de usuarios');
};
export const obetenerdatosA = async (req, res) => {
  const { usuario, clave } = req.params;

  try {
    const [result] = await sql.query(
      'SELECT * FROM usuarios WHERE usuario = ? AND clave = ?',
      [usuario, clave]
    );
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
