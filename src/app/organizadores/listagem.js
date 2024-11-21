import React, { useState, useEffect } from 'react';

const ListagemOrganizadores = () => {
  const [organizadores, setOrganizadores] = useState([]);

  useEffect(() => {
    // Supondo que você já tenha uma função que busque os dados cadastrados
    // Exemplo de busca de dados via API ou LocalStorage
    const dados = JSON.parse(localStorage.getItem("organizadores")) || [];
    setOrganizadores(dados);
  }, []);

  return (
    <div>
      <h2>Lista de Organizadores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {organizadores.map((organizadores, index) => (
            <tr key={index}>
              <td>{organizadores.id}</td>
              <td>{organizadores.nome}</td>
              <td>{organizadores.email}</td>
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemOrganizadores;
