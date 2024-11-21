// src/app/organizadores/editar/[id].js
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditarOrganizador = ({ params }) => {
  const [organizador, setOrganizador] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    const organizadorEdit = organizadoresSalvos.find(
      (org) => org.id === params.id
    );
    setOrganizador(organizadorEdit);
  }, [params.id]);

  const handleChange = (e) => {
    setOrganizador({
      ...organizador,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    const index = organizadoresSalvos.findIndex((org) => org.id === params.id);
    organizadoresSalvos[index] = organizador;
    localStorage.setItem("organizadores", JSON.stringify(organizadoresSalvos));
    router.push("/organizadores/listagem");
  };

  if (!organizador) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Editar Organizador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={organizador.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={organizador.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={organizador.telefone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="empresa">Empresa</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={organizador.empresa}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditarOrganizador;
