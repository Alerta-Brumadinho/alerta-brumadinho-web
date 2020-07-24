// Estados (Unidades Federativas)
export const ufs = [
  { value: "AC", name: "Acre" },
  { value: "AL", name: "Alagoas" },
  { value: "AP", name: "Amapá" },
  { value: "AM", name: "Amazonas" },
  { value: "BA", name: "Bahia" },
  { value: "CE", name: "Ceará" },
  { value: "DF", name: "Distrito Federal" },
  { value: "ES", name: "Espírito Santo" },
  { value: "GO", name: "Goiás" },
  { value: "MA", name: "Maranhão" },
  { value: "MT", name: "Mato Grosso" },
  { value: "MS", name: "Mato Grosso do Sul" },
  { value: "MG", name: "Minas Gerais" },
  { value: "PA", name: "Pará" },
  { value: "PB", name: "Paraíba" },
  { value: "PR", name: "Paraná" },
  { value: "PE", name: "Pernambuco" },
  { value: "PI", name: "Piauí" },
  { value: "RJ", name: "Rio de Janeiro" },
  { value: "RN", name: "Rio Grande do Norte" },
  { value: "RS", name: "Rio Grande do Sul" },
  { value: "RO", name: "Rondônia" },
  { value: "RR", name: "Roraima" },
  { value: "SC", name: "Santa Catarina" },
  { value: "SP", name: "São Paulo" },
  { value: "SE", name: "Sergipe" },
  { value: "TO", name: "Tocantins" },
];

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