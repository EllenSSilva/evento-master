"use client";

import React, { useState } from "react";
import FormOrganizador from "@/components/FormOrganizador";

export default function OrganizadoresPage() {
  const [organizadores, setOrganizadores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddOrganizador = (data) => {
    if (currentIndex !== null) {
      const updated = [...organizadores];
      updated[currentIndex] = data;
      setOrganizadores(updated);
      setCurrentIndex(null);
    } else {
      setOrganizadores([...organizadores, data]);
    }
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = [...organizadores];
    updated.splice(index, 1);
    setOrganizadores(updated);
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Gerenciamento de Organizadores</h1>
      <button onClick={() => setShowForm(true)}>Novo Organizador</button>

      {showForm && (
        <FormOrganizador
          onSubmit={handleAddOrganizador}
          initialData={currentIndex !== null ? organizadores[currentIndex] : null}
        />
      )}

      <ul>
        {organizadores.map((org, index) => (
          <li key={index}>
            {org.nome} - {org.email}
            <button onClick={() => handleEdit(index)}>Editar</button>
            <button onClick={() => handleDelete(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
