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
