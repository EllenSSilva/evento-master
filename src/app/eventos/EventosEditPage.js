"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

const EventosEditPage = () => {
  const [evento, setEvento] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
    const eventoAtual = eventosSalvos.find((evento) => evento.id === id);
    setEvento(eventoAtual);

    // Preenche os campos do formulário com os dados do evento
    if (eventoAtual) {
      setValue("nome", eventoAtual.nome);
      setValue("data", eventoAtual.data);
      setValue("organizador", eventoAtual.organizador);
      setValue("local", eventoAtual.local);
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
    const eventosAtualizados = eventosSalvos.map(evento => 
      evento.id === id ? { ...evento, ...data } : evento
    );
    localStorage.setItem("eventos", JSON.stringify(eventosAtualizados));
    router.push("/eventos"); // Redireciona para a página de eventos após a edição
  };

  if (!evento) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Evento</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do Evento</label>
          <input 
            type="text" 
            {...register("nome", { required: "Nome do evento é obrigatório" })} 
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>

        <div>
          <label>Data do Evento</label>
          <InputMask 
            {...register("data", { required: "Data é obrigatória" })} 
            mask="99/99/9999"
            placeholder="DD/MM/AAAA"
          />
          {errors.data && <p>{errors.data.message}</p>}
        </div>

        <div>
          <label>Organizador</label>
          <select {...register("organizador", { required: "Selecione um organizador" })}>
            <option value="">Selecione</option>
            {/* Aqui você deve mapear os organizadores */}
            <option value="1">Organizador 1</option>
            <option value="2">Organizador 2</option>
          </select>
          {errors.organizador && <p>{errors.organizador.message}</p>}
        </div>

        <div>
          <label>Local</label>
          <select {...register("local", { required: "Selecione um local" })}>
            <option value="">Selecione</option>
            {/* Aqui você deve mapear os locais */}
            <option value="1">Local 1</option>
            <option value="2">Local 2</option>
          </select>
          {errors.local && <p>{errors.local.message}</p>}
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EventosEditPage;
