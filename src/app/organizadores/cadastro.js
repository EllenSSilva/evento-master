"use client";

import React, { useState } from "react";

const CadastroOrganizador = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empresa, setEmpresa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoOrganizador = { nome, email, telefone, empresa };
    // Salvar os dados do organizador (em um arquivo local, ou enviar via API)
    const organizadores = JSON.parse(localStorage.getItem("organizadores")) || [];
    organizadores.push(novoOrganizador);
    localStorage.setItem("organizadores", JSON.stringify(organizadores));
    
    // Limpar o formulário após o envio
    setNome("");
    setEmail("");
    setTelefone("");
    setEmpresa("");
  };

  return (
    <div>
      <h2>Cadastrar Novo Organizador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome do Organizador</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="empresa">Empresa</label>
          <input
            type="text"
            id="empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Organizador</button>
      </form>
    </div>
  );
};

export default CadastroOrganizador;
