import{sql} from '../bd.js'
export const enviarmensajedebasededatos=(req,res)=>{
    res.send('Lista de pedidos');
}
export const obtenerUltimoPedido = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM pedidos ORDER BY ped_id DESC LIMIT 1');
        res.json({ data: result[0] });  // solo devolvemos el último
    } catch (error) {
        console.error('Error al obtener el último pedido:', error);
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

export const obtenerpedidosxid=async(req,res)=>{
    try{
        const ID=req.params.id
        const [result]= await sql.query('select * from pedidos where ped_id=? ',[ID])
        if(result.length<=0) return res.status(400).json({
            cli_id: 0,
            message: "pedido no encontrado"
        })    
        res.json(result[0])
    }catch{
        return res.status(500).json({message: "Error en el servidor"})
    }
}
export const postPedido = async (req, res) => {
  try {
    const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;
    const [result] = await conmysql.query(
      'INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES (?, ?, ?, ?)' ,
      [cli_id, ped_fecha, usr_id, ped_estado]
    );
    res.status(201).json({ id: result.insertId, message: "Creado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
