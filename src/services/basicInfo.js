// Tipos de Perfis de Usuário
export const userTypes = {
  common: { type: "common", name: "Usuário Comum" },
  ongAgent: { type: "ongAgent", name: "Representante de ONG" },
  governmentAgent: { type: "governmentAgent", name: "Agente do Estado" },
  admin: { type: "admin", name: "Administrador" },
};

// Estados de Verificação dos Usuários e Instituições
export const verificationStatus = {
  verified: { type: "verified", name: "Verificado" },
  unverified: { type: "unverified", name: "Aguardando Validação" },
  rejected: { type: "rejected", name: "Rejeitado" },
};

// Tipos de Instituições
export const institutionType = {
    ong: { type: 'ong', name: 'Organização Não-Governamental'},
    government: { type: 'government', name: 'Entidade Governamental'},
}

export const warningTexts = {
  createAgentAccount: "Preste atenção: o e-mail informado no momento do cadastro deve possuir o domínio de sua instituição. Por exemplo: fulano@greenpeace.org. Caso contrário, seu cadastro será invalidado.",
  createInstitution: "Preste atenção: tanto seu e-mail quanto o e-mail de sua instituição informados no cadastro a seguir devem possuir o domínio da instituição. Por exemplo: fulano@greenpeace.org. Caso contrário, o cadastro de sua instituição será invalidado."
}