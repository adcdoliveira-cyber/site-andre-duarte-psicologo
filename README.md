# Site André Duarte - Psicólogo Clínico

Este é o repositório do site de André Duarte, um psicólogo clínico especializado em trauma, ansiedade e regulação emocional.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
/workspace/
├── client/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── assets/
│       │   ├── images/
│       │   ├── icons/
│       │   └── styles/
│       ├── components/
│       │   ├── common/ (componentes genéricos reutilizáveis)
│       │   ├── layout/ (componentes de layout como Header e Footer)
│       │   └── ui/ (componentes de UI do shadcn ou semelhantes)
│       ├── features/ (componentes por funcionalidade)
│       │   ├── home/
│       │   ├── contact/
│       │   └── about/
│       ├── pages/
│       ├── hooks/
│       ├── contexts/
│       ├── lib/
│       ├── services/
│       ├── types/
│       ├── utils/
│       ├── constants/
│       ├── routes/
│       ├── App.tsx
│       └── main.tsx
├── server/
├── shared/
├── docs/
├── tests/
└── ...
```

## Funcionalidades

- Página inicial com informações sobre o psicólogo
- Seções sobre especialidades e como posso ajudar
- Informações sobre modalidades de atendimento (online e presencial)
- Formulário de contato e mapa de localização

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React

## Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria uma build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm preview` - Visualiza a build localmente
- `pnpm check` - Verifica os tipos TypeScript
- `pnpm format` - Formata os arquivos

## Contribuição

Para contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Crie um novo Pull Request

## Licença

MIT