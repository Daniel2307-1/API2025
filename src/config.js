import {config} from 'dotenv'
config()

console.log('Variables de entorno:', {
  BD_HOST: process.env.BD_HOST,
  BD_DATABASE: process.env.BD_DATABASE,
  BD_USER: process.env.BD_USER,
  BD_PASSWORD: process.env.BD_PASSWORD,
  BD_PORT: process.env.BD_PORT
});

export const BD_HOST = process.env.BD_HOST || 'localhost'
export const BD_DATABASE = process.env.BD_DATABASE || 'base2025'
export const BD_USER = process.env.BD_USER || 'root'
export const BD_PASSWORD = process.env.BD_PASSWORD || ''
export const BD_PORT = process.env.BD_PORT || 3306
export const PORT = process.env.PORT || 3000