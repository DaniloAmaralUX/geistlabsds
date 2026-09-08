export interface Preset {
  id: string;
  name: string;
}

export const presets: Preset[] = [
  { id: "9cb0e66a-9937-465d-a188-2c4c4ae2401f", name: "Português padrão" },
  {
    id: "61eb0e32-2391-4cd3-adc3-66efe09bc0b7",
    name: "Resumir para uma criança",
  },
  { id: "a4e1fa51-f4ce-4e45-892c-224030a00bdd", name: "Texto para comando" },
  { id: "cc198b13-4933-43aa-977e-dcd95fa30770", name: "Perguntas e respostas" },
  {
    id: "adfa95be-a575-45fd-a9ef-ea45386c64de",
    name: "Português para outros idiomas",
  },
  {
    id: "c569a06a-0bd6-43a7-adf9-bf68c09e7a79",
    name: "Interpretar dados sem estrutura",
  },
  { id: "15ccc0d7-f37a-4f0a-8163-a37e162877dc", name: "Classificação" },
  {
    id: "4641ef41-1c0f-421d-b4b2-70fe431081f3",
    name: "Linguagem natural para Python",
  },
  { id: "48d34082-72f3-4a1b-a14d-f15aca4f57a0", name: "Explicar código" },
  { id: "dfd42fd5-0394-4810-92c6-cc907d3bfd1a", name: "Chat" },
];
