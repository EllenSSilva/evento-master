import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

// Definindo o esquema de validação com Yup
const schema = yup.object({
  nome: yup.string().required('Nome do local é obrigatório'),
  cnpj: yup
    .string()
    .required('CNPJ é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  telefone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/\(\d{2}\) \d{4}-\d{4}/, 'Telefone inválido'),
}).required();

export default function FormLocal({ onAdd, localEditando }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Se um local estiver sendo editado, preenche o formulário com os dados
  useEffect(() => {
    if (localEditando) {
      setValue('nome', localEditando.nome);
      setValue('cnpj', localEditando.cnpj);
      setValue('telefone', localEditando.telefone);
    }
  }, [localEditando, setValue]);

  // Função chamada ao submeter o formulário
  const onSubmit = (data) => {
    const novoLocal = {
      id: localEditando ? localEditando.id : new Date().getTime(),
      nome: data.nome,
      cnpj: data.cnpj,
      telefone: data.telefone,
    };
    onAdd(novoLocal);
  };

  return (
    <div>
      <h2>{localEditando ? 'Editar Local' : 'Cadastrar Local'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nome">Nome do Local</label>
          <input
            id="nome"
            type="text"
            {...register('nome')}
            placeholder="Nome do local"
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div>
          <label htmlFor="cnpj">CNPJ</label>
          <InputMask
            id="cnpj"
            mask="99.999.999/9999-99"
            {...register('cnpj')}
            placeholder="CNPJ"
          />
          {errors.cnpj && <span>{errors.cnpj.message}</span>}
        </div>

        <div>
          <label htmlFor="telefone">Telefone</label>
          <InputMask
            id="telefone"
            mask="(99) 9999-9999"
            {...register('telefone')}
            placeholder="Telefone"
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}
        </div>

        <button type="submit">{localEditando ? 'Atualizar' : 'Cadastrar'}</button>
      </form>
    </div>
  );
}
