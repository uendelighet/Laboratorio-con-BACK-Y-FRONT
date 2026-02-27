// Importa el framework Express para crear el servidor
import express from 'express';

// Importa CORS para permitir peticiones desde otros dominios (ej. tu frontend)
import cors from 'cors';

// Crea la aplicación de Express
const app = express();

// Habilita CORS en todas las rutas
app.use(cors());

// Permite recibir datos en formato JSON en el body de las peticiones
app.use(express.json());

// Define la estructura de un Post usando TypeScript
interface Post {
  id: string;          // Identificador único
  imageUrl: string;    // URL de la imagen
  title: string;       // Título del post
  description: string; // Descripción del post
}

// Arreglo en memoria donde se almacenan los posts
// ⚠ Esto NO es persistente. Se borra al reiniciar el servidor.
let posts: Post[] = [];

// ==============================
// Listar posts
// ==============================
app.get('/posts', (req, res) => {
  // Devuelve todos los posts almacenados
  res.json(posts);
});

// ==============================
// Crear post
// ==============================
app.post('/posts', (req, res) => {
  // Extrae los datos enviados en el body
  const { imageUrl, title, description } = req.body;

  // Valida que todos los campos estén presentes
  if (!imageUrl || !title || !description) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Crea un nuevo post con ID generado usando timestamp
  const newPost: Post = {
    id: Date.now().toString(),
    imageUrl,
    title,
    description,
  };

  // Lo agrega al arreglo en memoria
  posts.push(newPost);

  // Responde con status 201 (creado)
  res.status(201).json(newPost);
});

// ==============================
// Eliminar post
// ==============================
app.delete('/posts/:id', (req, res) => {
  // Obtiene el id desde los parámetros de la URL
  const { id } = req.params;

  // Busca el índice del post con ese id
  const index = posts.findIndex((p) => p.id === id);

  // Si no existe, responde 404
  if (index === -1) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }

  // Elimina el post del arreglo
  posts.splice(index, 1);

  // Responde confirmando eliminación
  res.status(200).json({ message: 'Post eliminado' });
});

// Define el puerto desde variable de entorno o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Exporta la app (útil para testing)
export default app;