'use client';

import { useState } from 'react';
import { supabase } from './lib/supabaseClient';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const { error } = await supabase.from('users').insert([{ name, email }]);
    if (error) {
      setMessage('Erro ao enviar dados!');
    } else {
      setMessage('Dados enviados com sucesso!');
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 text-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
