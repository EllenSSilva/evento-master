import React, { useState } from 'react';
import FormLocal from '@/components/FormLocal';

export default function LocaisDeEventoPage() {
  const [locais, setLocais] = useState([]);

  // Função para adicionar novo local
  const adicionarLocal = (novoLocal) => {
    setLocais([...locais, novoLocal]);
  };

  return (
    <div>
      <h1>Locais de Evento</h1>

      {/* Formulário de cadastro de novo local */}
      <FormLocal onAdd={adicionarLocal} />

      {/* Lista de locais cadastrados */}
      <ul>
        {locais.map((local) => (
          <li key={local.id}>
            <p>{local.nome}</p>
            <p>CNPJ: {local.cnpj}</p>
            <p>Telefone: {local.telefone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
