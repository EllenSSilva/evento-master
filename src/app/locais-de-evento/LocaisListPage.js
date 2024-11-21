"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LocaisListPage = () => {
  const [locais, setLocais] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const locaisSalvos = JSON.parse(localStorage.getItem("locais")) || [];
    setLocais(locaisSalvos);
  }, []);

  const handleEdit = (id) => {
    router.push(`/locais/editar/${id}`); // Navega para a página de edição do local
  };

  const handleDelete = (id) => {
    const locaisSalvos = JSON.parse(localStorage.getItem("locais")) || [];
    const locaisAtualizados = locaisSalvos.filter(local => local.id !== id);
    localStorage.setItem("locais", JSON.stringify(locaisAtualizados));
    setLocais(locaisAtualizados);
  };

  return (
    <div>
      <h1>Lista de Locais</h1>
      <ul>
        {locais.length === 0 ? (
          <p>Nenhum local cadastrado.</p>
        ) : (
          locais.map((local, index) => (
            <li key={index}>
              {local.nome}
              <button onClick={() => handleEdit(local.id)}>Editar</button>
              <button onClick={() => handleDelete(local.id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default LocaisListPage;
