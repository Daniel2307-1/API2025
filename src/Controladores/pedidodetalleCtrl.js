import{sql} from '../bd.js'
export const enviarmensajedebasededatos=(req,res)=>{
    res.send('Lista de pedido Detalles');
}
export const postDetalle = async (req, res) => {
  try {
    const { prod_id, ped_id, det_cantidad, det_precio } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) VALUES (?, ?, ?, ?)',
      [prod_id, ped_id, det_cantidad, det_precio]
    );
    res.status(201).json({ id: result.insertId, message: "Creado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const obetenerdatos = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM pedidos_detalle');
        res.json({ cant: result.length, data: result });
    }catch (error) {
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
}
