import{sql} from '../bd.js'
export const enviarmensajedebasededatos=(req,res)=>{
    res.send('Lista de pedido Detalles');
}
export const postProducto = async (req, res) => {
  try {
    const { prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen } = req.body;

    const [result] = await sql.query(
      `INSERT INTO productos (prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen]
    );

    res.status(201).json({ id: result.insertId, message: "Producto creado correctamente" });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export const putProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      prod_codigo,
      prod_nombre,
      prod_stock,
      prod_precio,
      prod_activo,
      prod_imagen
    } = req.body;

    const [result] = await sql.query(
      `UPDATE productos
       SET prod_codigo = ?, prod_nombre = ?, prod_stock = ?, prod_precio = ?, prod_activo = ?, prod_imagen = ?
       WHERE prod_id = ?`,
      [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_activo, prod_imagen, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Retorna el producto actualizado
    const [row] = await sql.query('SELECT * FROM productos WHERE prod_id = ?', [id]);
    res.json(row[0]);

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
