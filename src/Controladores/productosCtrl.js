import{sql} from '../bd.js'
export const enviarmensajedebasededatos=(req,res)=>{
    res.send('Lista de pedido Detalles');
}
export const postProducto = async (req, res) => {
  try {
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen } = req.body;

    const [result] = await sql.query(
      `INSERT INTO producto (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
    );

    res.status(201).json({ id: result.insertId, message: "Producto creado correctamente" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
