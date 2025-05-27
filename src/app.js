import express from 'express'
import { postClientes } from './Controladores/clientesCtrl.js';
import clientesRoutes from './Routes/clientes.routes.js'
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

app.use((req,resp,next)=>{
    resp.status(400).json({
         message: 'PAGINA ENCONTRADA'
    })
})
export default app;