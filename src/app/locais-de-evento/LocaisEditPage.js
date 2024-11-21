"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const LocaisEditPage = () => {
  const [local, setLocal] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const locaisSalvos = JSON.parse(localStorage.getItem("locais")) || [];
    const localAtual = locaisSalvos.find(local => local.id === id);
    setLocal(localAtual);

    // Preenche os campos do formulário com os dados do local
    if (localAtual) {
      setValue("nome", localAtual.nome);
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const locaisSalvos = JSON.parse(localStorage.getItem("locais")) || [];
    const locaisAtualizados = locaisSalvos.map(local =>
      local.id === id ? { ...local, ...data } : local
    );
    localStorage.setItem("locais", JSON.stringify(locaisAtualizados));
    router.push("/locais"); // Redireciona para a página de locais após a edição
  };

  if (!local) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Local</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do Local</label>
          <input 
            type="text" 
            {...register("nome", { required: "Nome do local é obrigatório" })} 
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default LocaisEditPage;
