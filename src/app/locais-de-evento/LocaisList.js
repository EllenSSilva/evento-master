import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LocaisList() {
  const [locais, setLocais] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const locaisSalvos = JSON.parse(localStorage.getItem('locais')) || [];
    setLocais(locaisSalvos);
  }, []);

  const handleEdit = (local) => {
    router.push(`/locais-de-evento/${local.nome}`);
  };

  const handleDelete = (local) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este local?');
    if (confirmDelete) {
      const locaisSalvos = JSON.parse(localStorage.getItem('locais')) || [];
      const novosLocais = locaisSalvos.filter((l) => l.nome !== local.nome);
      localStorage.setItem('locais', JSON.stringify(novosLocais));
      setLocais(novosLocais);
    }
  };

  return (
    <div>
      <h2>Locais de Evento</h2>
      <ul>
        {locais.map((local, index) => (
          <li key={index}>
            <p>{local.nome}</p>
            <p>{local.endereco}</p>
            <p>{local.capacidade}</p>
            <p>{local.cidade}</p>
            <button onClick={() => handleEdit(local)}>Editar</button>
            <button onClick={() => handleDelete(local)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
