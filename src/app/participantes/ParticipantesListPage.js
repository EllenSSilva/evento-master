"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ParticipantesListPage = () => {
  const [participantes, setParticipantes] = useState([]);
  const router = useRouter();
  const { eventoId } = router.query;

  useEffect(() => {
    const participantesSalvos = JSON.parse(localStorage.getItem("participantes")) || [];
    // Filtra os participantes pelo eventoId
    const participantesDoEvento = participantesSalvos.filter(p => p.eventoId === eventoId);
    setParticipantes(participantesDoEvento);
  }, [eventoId]);

  const handleDelete = (id) => {
    const participantesSalvos = JSON.parse(localStorage.getItem("participantes")) || [];
    const participantesAtualizados = participantesSalvos.filter(participante => participante.id !== id);
    localStorage.setItem("participantes", JSON.stringify(participantesAtualizados));
    setParticipantes(participantesAtualizados);
  };

  return (
    <div>
      <h1>Participantes do Evento</h1>
      <ul>
        {participantes.length === 0 ? (
          <p>Nenhum participante cadastrado para este evento.</p>
        ) : (
          participantes.map((participante, index) => (
            <li key={index}>
              {participante.nome}
              <button onClick={() => handleDelete(participante.id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ParticipantesListPage;
