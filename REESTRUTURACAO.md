# Proposta de Reestruturação do Projeto

## Visão Geral
Este documento descreve a proposta de reestruturação para o projeto "site-andre-duarte-psicologo", um site para um psicólogo clínico.

## Estrutura Atual
```
/workspace/
├── client/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── ui/ (componentes UI)
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── server/
│   └── index.ts
├── shared/
│   └── const.ts
├── dist/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── outros arquivos
```

## Estrutura Proposta Após Reestruturação

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
│       │   │   ├── Button/
│       │   │   ├── Input/
│       │   │   ├── Modal/
│       │   │   └── ...
│       │   ├── layout/ (componentes de layout)
│       │   │   ├── Header/
│       │   │   ├── Footer/
│       │   │   ├── Sidebar/
│       │   │   └── ...
│       │   └── ui/ (componentes de UI do shadcn ou semelhantes)
│       ├── features/ (componentes por funcionalidade)
│       │   ├── home/
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   └── types/
│       │   ├── contact/
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   └── types/
│       │   └── about/
│       │       ├── components/
│       │       ├── hooks/
│       │       └── types/
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Contact.tsx
│       │   ├── About.tsx
│       │   └── NotFound.tsx
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
│   ├── index.ts
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── shared/
│   ├── types/
│   ├── constants/
│   └── utils/
├── docs/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── dist/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── prettier.config.js
└── README.md
```

## Detalhes da Reestruturação

### 1. Organização por Funcionalidades (Feature-based Architecture)

#### Antes:
- Componentes misturados em uma única pasta
- Difícil identificar a qual parte do site cada componente pertence

#### Depois:
- Componentes organizados por funcionalidades (features)
- Cada funcionalidade tem sua própria pasta com componentes, hooks e tipos
- Melhor separação de responsabilidades

### 2. Componentes Reutilizáveis

#### Antes:
- Componentes UI e componentes específicos do domínio misturados

#### Depois:
- Componentes genéricos (botões, inputs, etc.) em `components/common`
- Componentes de UI específicos do framework em `components/ui`
- Componentes específicos da funcionalidade dentro de cada feature

### 3. Gerenciamento de Estado e Contextos

#### Antes:
- Contextos e hooks em locais dispersos

#### Depois:
- Contextos centralizados em `contexts/`
- Hooks customizados em `hooks/` ou dentro de cada feature
- Tipos e constantes em suas respectivas pastas

### 4. Organização de Páginas

#### Antes:
- Páginas misturadas com componentes

#### Depois:
- Páginas em pasta separada `pages/`
- Rotas centralizadas em `routes/`
- Cada página pode conter apenas o layout principal, delegando a lógica para os componentes de feature

### 5. Recursos Estáticos

#### Antes:
- Recursos misturados com código

#### Depois:
- Imagens e outros recursos em `assets/images/`
- Ícones em `assets/icons/`
- Estilos globais em `assets/styles/`

### 6. Servidor

#### Antes:
- Apenas um arquivo `server/index.ts`

#### Depois:
- Middleware em `server/middleware/`
- Rotas em `server/routes/`
- Utilitários em `server/utils/`

### 7. Testes

#### Antes:
- Nenhum diretório de testes definido

#### Depois:
- Estrutura de testes com unitários, integração e E2E
- Testes organizados por tipo e funcionalidade

## Benefícios da Reestruturação

1. **Manutenibilidade**: Código mais organizado e fácil de navegar
2. **Escalabilidade**: Estrutura pronta para crescimento
3. **Colaboração**: Equipes podem trabalhar em diferentes features sem conflitos
4. **Reutilização**: Componentes reutilizáveis são mais fáceis de identificar e manter
5. **Testabilidade**: Estrutura facilita a escrita e organização de testes
6. **Consistência**: Padrões claros para organização de código

## Passos para Implementação

1. Criar a nova estrutura de pastas
2. Mover os arquivos existentes para as novas localizações
3. Atualizar os imports nos arquivos movidos
4. Refatorar componentes conforme necessário
5. Adicionar documentação
6. Configurar testes
7. Atualizar scripts de build/deploy se necessário

## Considerações Finais

A reestruturação proposta segue padrões modernos de desenvolvimento front-end e back-end, promovendo uma arquitetura limpa, escalável e de fácil manutenção. A estrutura baseia-se em princípios de organização por funcionalidades, separação de responsabilidades e reutilização de código.