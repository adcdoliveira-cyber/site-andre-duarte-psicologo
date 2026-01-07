# Documentação da Reestruturação do Projeto

## Introdução

Este documento detalha a reestruturação realizada no projeto "site-andre-duarte-psicologo", um site para um psicólogo clínico. A reestruturação teve como objetivo melhorar a organização do código, facilitar a manutenção e preparar o projeto para futuras expansões.

## Objetivos da Reestruturação

1. Melhorar a organização e legibilidade do código
2. Facilitar a manutenção e adição de novas funcionalidades
3. Separar componentes genéricos de componentes específicos do domínio
4. Padronizar a estrutura de pastas e arquivos
5. Melhorar a experiência de desenvolvimento para colaboradores

## Principais Mudanças Realizadas

### 1. Estrutura de Pastas

Antes da reestruturação, os componentes estavam todos na mesma pasta `/components`, misturando componentes de UI genéricos com componentes específicos do domínio.

Após a reestruturação:

- Componentes de layout (Header, Footer) foram movidos para `/components/layout/`
- Componentes específicos do domínio (ErrorBoundary, ManusDialog, Map) foram movidos para `/components/common/`
- Componentes de UI genéricos permaneceram em `/components/ui/`
- Novas pastas foram criadas para organizar por funcionalidades: `/features/home/`, `/features/contact/`, etc.

### 2. Atualização de Imports

Os imports nos arquivos principais foram atualizados para refletir a nova estrutura:

- Em `App.tsx`, o import do `ErrorBoundary` foi atualizado para `@/components/common/ErrorBoundary`
- Em `App.tsx`, o import do `ThemeProvider` foi atualizado para `@/contexts/ThemeContext`
- Em `Home.tsx`, os imports do Header e Footer foram atualizados para `@/components/layout/Header` e `@/components/layout/Footer`

### 3. Criação de Pastas para Recursos Estáticos

Foram criadas pastas específicas para armazenar recursos estáticos:

- `/assets/images/` para imagens
- `/assets/icons/` para ícones
- `/assets/styles/` para estilos globais

### 4. Organização por Features

Foram criadas pastas para organizar o código por funcionalidades:

- `/features/home/` para componentes relacionados à página inicial
- `/features/contact/` para componentes relacionados à página de contato
- `/features/about/` para componentes relacionados à página sobre

Cada feature contém subpastas para componentes, hooks, tipos e utilitários específicos daquela funcionalidade.

### 5. Estrutura para Testes

Foi adicionada uma estrutura para testes automatizados:

- `/tests/unit/` para testes unitários
- `/tests/integration/` para testes de integração
- `/tests/e2e/` para testes end-to-end

## Benefícios Obtidos

1. **Melhor organização**: Componentes estão agora organizados por categoria e funcionalidade
2. **Facilidade de manutenção**: Mais fácil encontrar e modificar componentes específicos
3. **Reutilização facilitada**: Componentes genéricos estão claramente separados dos específicos
4. **Escalabilidade**: Estrutura pronta para adição de novas funcionalidades
5. **Colaboração**: Equipes podem trabalhar em diferentes partes do código com menos conflitos

## Considerações Finais

A reestruturação foi realizada com cuidado para manter a funcionalidade do sistema intacta, atualizando todos os imports necessários para refletir a nova estrutura de diretórios. Esta nova organização proporciona uma base sólida para o crescimento futuro do projeto e melhora significativamente a experiência de desenvolvimento.