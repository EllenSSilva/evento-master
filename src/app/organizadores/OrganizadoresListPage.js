"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const OrganizadoresListPage = () => {
  const [organizadores, setOrganizadores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    setOrganizadores(organizadoresSalvos);
  }, []);

  const handleEdit = (id) => {
    router.push(`/organizadores/editar/${id}`); // Navega para a página de edição do organizador
  };

  const handleDelete = (id) => {
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    const organizadoresAtualizados = organizadoresSalvos.filter(organizador => organizador.id !== id);
    localStorage.setItem("organizadores", JSON.stringify(organizadoresAtualizados));
    setOrganizadores(organizadoresAtualizados);
  };

  return (
    <div>
      <h1>Lista de Organizadores</h1>
      <ul>
        {organizadores.length === 0 ? (
          <p>Nenhum organizador cadastrado.</p>
        ) : (
          organizadores.map((organizador, index) => (
            <li key={index}>
              {organizador.nome}
              <button onClick={() => handleEdit(organizador.id)}>Editar</button>
              <button onClick={() => handleDelete(organizador.id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrganizadoresListPage;
