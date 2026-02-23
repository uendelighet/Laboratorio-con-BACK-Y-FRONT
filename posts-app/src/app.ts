import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

interface Post {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

let posts: Post[] = [];

// Listar posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Crear post
app.post('/posts', (req, res) => {
  const { imageUrl, title, description } = req.body;

  if (!imageUrl || !title || !description) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const newPost: Post = {
    id: Date.now().toString(),
    imageUrl,
    title,
    description,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// Eliminar post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }

  posts.splice(index, 1);
  res.status(200).json({ message: 'Post eliminado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;