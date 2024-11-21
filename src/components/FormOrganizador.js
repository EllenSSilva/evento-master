import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputMask from "react-input-mask";

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
});

export default function FormOrganizador({ onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nome</label>
        <input {...register("nome")} />
        <p>{errors.nome?.message}</p>
      </div>
      <div>
        <label>E-mail</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Telefone</label>
        <InputMask mask="(99) 99999-9999" {...register("telefone")} />
        <p>{errors.telefone?.message}</p>
      </div>
      <div>
        <label>CPF</label>
        <InputMask mask="999.999.999-99" {...register("cpf")} />
        <p>{errors.cpf?.message}</p>
      </div>
      <div>
        <label>Empresa</label>
        <input {...register("empresa")} />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
