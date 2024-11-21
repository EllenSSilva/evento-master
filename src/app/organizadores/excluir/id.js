// src/app/organizadores/excluir/[id].js
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const ExcluirOrganizador = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const organizadoresSalvos = JSON.parse(localStorage.getItem("organizadores")) || [];
    const organizadoresAtualizados = organizadoresSalvos.filter(
      (org) => org.id !== params.id
    );
    localStorage.setItem("organizadores", JSON.stringify(organizadoresAtualizados));
    router.push("/organizadores/listagem");
  }, [params.id, router]);

  return (
    <div>
      <h2>Excluindo Organizador...</h2>
    </div>
  );
};

export default ExcluirOrganizador;
