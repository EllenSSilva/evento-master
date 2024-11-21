"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ParticipantesAddPage = () => {
  const [eventoId, setEventoId] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = (data) => {
    const participantesSalvos = JSON.parse(localStorage.getItem("participantes")) || [];
    const novoParticipante = { ...data, id: new Date().getTime().toString(), eventoId };
    participantesSalvos.push(novoParticipante);
    localStorage.setItem("participantes", JSON.stringify(participantesSalvos));
    router.push(`/participantes/${eventoId}`);  // Redireciona para a lista de participantes do evento
  };

  return (
    <div>
      <h1>Adicionar Participante</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do Participante</label>
          <input 
            type="text" 
            {...register("nome", { required: "Nome é obrigatório" })} 
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>
        <div>
          <label>Email do Participante</label>
          <input 
            type="email" 
            {...register("email", { required: "Email é obrigatório" })} 
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Salvar Participante</button>
      </form>
    </div>
  );
};

export default ParticipantesAddPage;
