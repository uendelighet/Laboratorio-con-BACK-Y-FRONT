import { useState, useEffect } from 'react';

const API_URL = 'https://laboratorio-con-back-y-front.vercel.app/';

interface Post {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [screen, setScreen] = useState<'list' | 'create'>('list');
  const [form, setForm] = useState({ imageUrl: '', title: '', description: '' });

  const fetchPosts = async () => {
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };

useEffect(() => {
  const loadPosts = async () => {
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    setPosts(data);
  };
  loadPosts();
}, []);

  const deletePost = async (id: string) => {
    await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  const createPost = async () => {
    if (!form.imageUrl || !form.title || !form.description) {
      alert('Por favor completa todos los campos');
      return;
    }
    await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ imageUrl: '', title: '', description: '' });
    setScreen('list');
    fetchPosts();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Posts App</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setScreen('list')} style={{ marginRight: '10px' }}>
          📋 Ver Posts
        </button>
        <button onClick={() => setScreen('create')}>
          ➕ Crear Post
        </button>
      </div>

      {screen === 'list' && (
        <div>
          <h2>Lista de Posts</h2>
          {posts.length === 0 && <p>No hay posts aún. ¡Crea uno!</p>}
          {posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
              <img src={post.imageUrl} alt={post.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button onClick={() => deletePost(post.id)} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                🗑 Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {screen === 'create' && (
        <div>
          <h2>Crear Nuevo Post</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            <input
              placeholder="URL de la imagen"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <textarea
              placeholder="Descripción"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', height: '100px' }}
            />
            <button onClick={createPost} style={{ background: 'green', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
              ✅ Crear Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
