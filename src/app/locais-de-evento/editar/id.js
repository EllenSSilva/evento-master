import React, { useState } from 'react';
import FormLocal from '@/components/FormLocal';

export default function LocaisDeEventoPage() {
  const [locais, setLocais] = useState([]);
  const [localEditando, setLocalEditando] = useState(null); // Estado para o local sendo editado

  // Função para adicionar ou editar local
  const adicionarOuEditarLocal = (novoLocal) => {
    if (localEditando) {
      // Se estamos editando, atualiza o local
      setLocais(locais.map((local) =>
        local.id === localEditando.id ? novoLocal : local
      ));
    } else {
      // Se não estamos editando, adiciona um novo local
      setLocais([...locais, novoLocal]);
    }
    setLocalEditando(null); // Reseta o estado após salvar
  };

  // Função para marcar um local como sendo editado
  const editarLocal = (local) => {
    setLocalEditando(local);
  };

  // Função para excluir um local
  const excluirLocal = (id) => {
    setLocais(locais.filter((local) => local.id !== id));
  };

  return (
    <div>
      <h1>Locais de Evento</h1>

      {/* Formulário de cadastro ou edição de local */}
      <FormLocal onAdd={adicionarOuEditarLocal} localEditando={localEditando} />

      {/* Lista de locais cadastrados */}
      <ul>
        {locais.map((local) => (
          <li key={local.id}>
            <p>{local.nome}</p>
            <p>CNPJ: {local.cnpj}</p>
            <p>Telefone: {local.telefone}</p>
            <button onClick={() => editarLocal(local)}>Editar</button>
            <button onClick={() => excluirLocal(local.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
