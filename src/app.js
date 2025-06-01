import express from 'express'
import { postClientes } from './Controladores/clientesCtrl.js';
import clientesRoutes from './Routes/clientes.routes.js'
import catalogoRoutes from './Routes/catalogo.routes.js'
import pedidosRoutes from './Routes/pedidos.routes.js'
import usuarioRoutes from './Routes/usuarios.routes.js'
import pedidodetalleRoutes from './Routes/pedidodetalle.routes.js'
import productosRoutes from './Routes/productos.routes.js'
import path from 'path';
import cors from 'cors'
import multer from 'multer';


const app = express()

// Permitir CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

// Rutas de tu API
app.use('/api', clientesRoutes)
app.post('/clientes', postClientes);
app.use('/api', catalogoRoutes)
app.use('/api', pedidosRoutes)
app.use('/api', pedidodetalleRoutes)
app.use('/api', productosRoutes)
app.use('/api', usuarioRoutes)
// Middleware para servir imágenes estáticas
app.use('/uploads', express.static(path.resolve('uploads')))


// Configuración de almacenamiento de imágenes con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // carpeta para guardar archivos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage })


app.post('/uploads', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ message: 'Archivo subido correctamente', filename: req.file.filename });
});

// Manejo de rutas no encontradas (debe ir al final)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'PÁGINA NO ENCONTRADA'
  })
})

export default app;
