import{sql} from '../bd.js'
export const enviarmensajedebasededatos=(req,res)=>{
    res.send('Lista de catalogo');
}
export const obetenerdatos = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM productos');
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
export const obtenerproductosxid=async(req,res)=>{
    try{
        const ID=req.params.id
        const [result]= await sql.query('select * from productos where prod_id=? ',[ID])
        if(result.length<=0) return res.status(400).json({
            cli_id: 0,
            message: "producto no encontrado"
        })    
        res.json(result[0])
    }catch{
        return res.status(500).json({message: "Error en el servidor"})
    }
}
