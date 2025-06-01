import{sql} from '../bd.js'
export const enviarmensajedebasededatos=(req,res)=>{
    res.send('Lista de clientes');
}
export const obetenerdatos = async (req, res) => {
    try {
        const [result] = await sql.query('SELECT * FROM clientes');
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
export const obtenerclientesxid=async(req,res)=>{
    try{
        const ID=req.params.id
        const [result]= await sql.query('select * from clientes where cli_id=? ',[ID])
        if(result.length<=0) return res.status(400).json({
            cli_id: 0,
            message: "Cliente no encontrado"
        })    
        res.json(result[0])
    }catch{
        return res.status(500).json({message: "Error en el servidor"})
    }
}


export const postClientes=async(req,res)=>{
    try{
        const{cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,cli_estado}=req.body
        //console.log(req.body)
        const [result]= await sql.query(
            ' INSERT INTO clientes (cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,cli_estado) VALUES(?, ?, ?, ?, ?, ?, ?,?) ', 
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,cli_estado])
            res.send({
                id:result.insertId
            })
    }catch(error){
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
export const patchclientes = async (req, res) => {
    try {
        // Obtener los datos enviados en el cuerpo de la solicitud
        const { cli_identificacion, cli_nombre } = req.body;
        
        // Verificar si se recibió la identificación y al menos un campo para actualizar
        if (!cli_identificacion || (!cli_nombre)) {
            return res.status(400).json({
                message: "Faltan datos requeridos",
                missingFields: {
                    cli_identificacion: !cli_identificacion,
                    cli_nombre: !cli_nombre
                }
            });
        }

        // Realizar la actualización en la base de datos
        const [result] = await sql.query(
            'UPDATE clientes SET cli_nombre = ? WHERE cli_identificacion = ?',
            [cli_nombre, cli_identificacion]
        );

        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Cliente no encontrado o no se actualizaron registros'
            });
        }

        // Respuesta exitosa
        res.json({
            message: 'Cliente actualizado correctamente',
            data: result
        });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);

        // Respuesta con detalles del error
        return res.status(500).json({
            message: "Error en el servidor",
            error: {
                message: error.message,
                code: error.code,
                stack: error.stack,
                sqlMessage: error.sqlMessage,  // Añade detalles de MySQL si están disponibles
                sqlState: error.sqlState,
                errno: error.errno
            }
        });
    }
};
    export const putClientes = async (req,res) => {
    try {
        const {id}= req.params
       const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,cli_estado}= req.body 
       const [result] = await sql.query(
        'UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=?, cli_estado=? WHERE cli_id=?',
        [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,cli_estado,id]);
        if(result.affectedRows<=0)return res.status(400).json({
            message: "cliente no encontrado"
        })
        const [row] = await sql.query('select * from clientes where cli_id=?', [id])
        res.json(row[0])
    } catch (error) {
        return res.status(500).json({ message: "error en el servidor" });
    }
    }
    export const deleteClientes = async (req, res) => {
    try {
        const { id } = req.params;

        // Ejecuta la consulta para eliminar el cliente
        const [result] = await sql.query('DELETE FROM clientes WHERE cli_id = ?', [id]);

        // Si no se afectó ninguna fila, significa que no se encontró el cliente
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        // Respuesta exitosa
        res.json({
            message: "Cliente eliminado correctamente"
        });
    } catch (error) {
        console.error(error); // Muestra el error completo en consola para depuración
        return res.status(500).json({
            message: "Error en el servidor"
        });
    }
};


