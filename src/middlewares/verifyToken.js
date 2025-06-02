import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // formato: Bearer TOKEN

  if (!token) {
    return res.status(403).json({ message: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Guarda la info del usuario en la request
    next(); // Sigue al controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido o expirado' });
  }
};
