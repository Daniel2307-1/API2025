import express from 'express'
import { postClientes } from './Controladores/clientesCtrl.js';
import clientesRoutes from './Routes/clientes.routes.js'
import catalogoRoutes from './Routes/catalogo.routes.js'
import pedidosRoutes from './Routes/pedidos.routes.js'
import pedidodetalleRoutes from './Routes/pedidodetalle.routes.js'
import productosRoutes from './Routes/productos.routes.js'

import path from 'path';
import cors from 'cors'


//definir los permisos
const corsOptions={
    origin:'*',
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    Credentials:true,
}
const app= express()
app.use(cors(corsOptions))
app.use(express.json());

//indicar que rutas se utiliza ojo
app.use('/api', clientesRoutes)
app.post('/clientes', postClientes);
app.use('/api', catalogoRoutes)
app.use('/api', pedidosRoutes)
app.use('/api', pedidodetalleRoutes)
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api', productosRoutes)



app.use((req,resp,next)=>{
    resp.status(400).json({
         message: 'PAGINA ENCONTRADA'
    })
})
export default app;
