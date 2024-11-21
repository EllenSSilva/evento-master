"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EventosListPage = () => {
  const [eventos, setEventos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
    setEventos(eventosSalvos);
  }, []);

  const handleEdit = (id) => {
    router.push(`/eventos/editar/${id}`);  // Navega para a página de edição do evento
  };

  const handleDelete = (id) => {
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
    const eventosAtualizados = eventosSalvos.filter(evento => evento.id !== id);
    localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
    setEventos(eventosAtualizados);
  };

  return (
    <div>
      <h1>Lista de Eventos</h1>
      <ul>
        {eventos.length === 0 ? (
          <p>Nenhum evento cadastrado.</p>
        ) : (
          eventos.map((evento, index) => (
            <li key={index}>
              {evento.nome} - {evento.data}
              <button onClick={() => handleEdit(evento.id)}>Editar</button>
              <button onClick={() => handleDelete(evento.id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EventosListPage;
