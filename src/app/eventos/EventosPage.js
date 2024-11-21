"use client"; // Necessário para o uso de hooks no Next.js 13+

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";

// Simulando dados para exemplo
const organizadores = [
  { id: 1, nome: "Organizador 1" },
  { id: 2, nome: "Organizador 2" }
];

const locais = [
  { id: 1, nome: "Local 1" },
  { id: 2, nome: "Local 2" }
];

const EventosPage = () => {
  const [eventos, setEventos] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  useEffect(() => {
    // Aqui você pode carregar os dados dos eventos, caso tenha algum backend
    // setEventos(carregarEventos());
  }, []);

  const onSubmit = (data) => {
    // Aqui você pode salvar o evento, seja em uma API ou localStorage
    setEventos([...eventos, data]);
    router.push('/eventos'); // Redireciona para a lista de eventos
  };

  return (
    <div>
      <h1>Cadastrar Evento</h1>
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
            {organizadores.map(org => (
              <option key={org.id} value={org.id}>{org.nome}</option>
            ))}
          </select>
          {errors.organizador && <p>{errors.organizador.message}</p>}
        </div>

        <div>
          <label>Local</label>
          <select {...register("local", { required: "Selecione um local" })}>
            <option value="">Selecione</option>
            {locais.map(local => (
              <option key={local.id} value={local.id}>{local.nome}</option>
            ))}
          </select>
          {errors.local && <p>{errors.local.message}</p>}
        </div>

        <button type="submit">Cadastrar Evento</button>
      </form>

      <div>
        <h2>Eventos Cadastrados</h2>
        <ul>
          {eventos.map((evento, index) => (
            <li key={index}>{evento.nome} - {evento.data}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventosPage;
