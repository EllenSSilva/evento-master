"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const OrganizadoresEditPage = () => {
  const [organizador, setOrganizador] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    const organizadorAtual = organizadoresSalvos.find(organizador => organizador.id === id);
    setOrganizador(organizadorAtual);

    // Preenche os campos do formulário com os dados do organizador
    if (organizadorAtual) {
      setValue("nome", organizadorAtual.nome);
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    const organizadoresAtualizados = organizadoresSalvos.map(organizador =>
      organizador.id === id ? { ...organizador, ...data } : organizador
    );
    localStorage.setItem("organizadores", JSON.stringify(organizadoresAtualizados));
    router.push("/organizadores"); // Redireciona para a página de organizadores após a edição
  };

  if (!organizador) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Organizador</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do Organizador</label>
          <input 
            type="text" 
            {...register("nome", { required: "Nome do organizador é obrigatório" })} 
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default OrganizadoresEditPage;
