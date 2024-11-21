"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ParticipantesEditPage = () => {
  const [participante, setParticipante] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const participantesSalvos = JSON.parse(localStorage.getItem("participantes")) || [];
    const participanteAtual = participantesSalvos.find(p => p.id === id);
    setParticipante(participanteAtual);

    // Preenche os campos do formulário com os dados do participante
    if (participanteAtual) {
      setValue("nome", participanteAtual.nome);
      setValue("email", participanteAtual.email);
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const participantesSalvos = JSON.parse(localStorage.getItem("participantes")) || [];
    const participantesAtualizados = participantesSalvos.map(p =>
      p.id === id ? { ...p, ...data } : p
    );
    localStorage.setItem("participantes", JSON.stringify(participantesAtualizados));
    router.push(`/participantes/${data.eventoId}`); // Redireciona para a página do evento
  };

  if (!participante) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Participante</h1>
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

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default ParticipantesEditPage;
