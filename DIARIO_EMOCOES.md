# 📔 Diário de Emoções - Documentação

## Visão Geral

O **Diário de Emoções** é uma área exclusiva para clientes registrarem suas emoções, pensamentos e reflexões de forma segura e privada. A funcionalidade inclui citações motivacionais de pensadores da psicologia que aparecem cada vez que o cliente acessa a página.

## Características Principais

### 1. **Registro de Emoções**
- Seleção de 8 emoções principais: Feliz, Triste, Ansioso, Calmo, Irritado, Esperançoso, Cansado, Confuso
- Indicador de intensidade (1-10) com slider interativo
- Área de texto para reflexões e notas pessoais
- Timestamp automático para cada entrada

### 2. **Citações Motivacionais**
- 12 citações de psicólogos e pensadores renomados:
  - Carl Rogers (Psicologia Humanista)
  - Carl Jung (Psicologia Analítica)
  - Albert Ellis (TCC)
  - Brené Brown (Resiliência)
  - Gabor Maté (Medicina Psicossomática)
  - Marshall Rosenberg (Comunicação Não-Violenta)
  - E outros...
- Citação aleatória exibida cada vez que o usuário acessa a página

### 3. **Armazenamento de Dados**
- Dados salvos localmente no navegador (localStorage)
- Nenhuma informação é enviada para servidor
- Privacidade total garantida
- Usuário tem controle total sobre seus dados

### 4. **Visualização de Histórico**
- Todas as entradas aparecem em ordem cronológica reversa
- Cor-codificação por emoção para fácil visualização
- Indicador visual de intensidade com barras
- Opção de deletar entradas individuais

### 5. **Estatísticas**
- Total de entradas registradas
- Emoção mais frequente
- Dados atualizados em tempo real

### 6. **Integração com WhatsApp**
- Link direto para contato com André Duarte
- Mensagem pré-preenchida
- Disponível na sidebar da página

## Como Usar

### Para Clientes

1. **Acessar o Diário**
   - Clique em "Diário" no menu de navegação
   - Ou acesse diretamente: `/diario`

2. **Registrar uma Emoção**
   - Clique em "Registrar Nova Emoção"
   - Selecione a emoção que está sentindo
   - Ajuste a intensidade com o slider
   - Escreva suas reflexões no campo de notas
   - Clique em "Salvar Entrada"

3. **Visualizar Histórico**
   - Todas as entradas aparecem abaixo do formulário
   - Clique no ícone de lixeira para deletar uma entrada

4. **Contato com André**
   - Clique em "Chamar no WhatsApp" na sidebar
   - Será aberto o WhatsApp com mensagem pré-preenchida

## Estrutura Técnica

### Arquivo Principal
```
client/src/pages/EmotionalDiary.tsx
```

### Estado da Aplicação
```typescript
interface DiaryEntry {
  id: string;              // ID único (timestamp)
  date: string;            // Data formatada (pt-BR)
  emotion: string;         // Emoção selecionada
  intensity: number;       // Intensidade 1-10
  notes: string;          // Reflexões do usuário
  timestamp: number;      // Timestamp Unix
}
```

### Cores por Emoção
- **Feliz**: Amarelo (#FEF3C7)
- **Triste**: Azul (#DBEAFE)
- **Ansioso**: Laranja (#FED7AA)
- **Calmo**: Verde (#DCFCE7)
- **Irritado**: Vermelho (#FEE2E2)
- **Esperançoso**: Roxo (#F3E8FF)
- **Cansado**: Cinza (#F3F4F6)
- **Confuso**: Índigo (#E0E7FF)

## Dados Armazenados

Os dados são salvos em `localStorage` com a chave:
```
emotionalDiaryEntries
```

Formato JSON:
```json
[
  {
    "id": "1704700800000",
    "date": "08/01/2024",
    "emotion": "ansioso",
    "intensity": 7,
    "notes": "Senti ansiedade durante a reunião de trabalho...",
    "timestamp": 1704700800000
  }
]
```

## Segurança e Privacidade

✅ **Dados locais**: Nenhuma informação é enviada para servidor
✅ **Privacidade**: Apenas o usuário tem acesso aos seus dados
✅ **Controle**: Usuário pode deletar entradas a qualquer momento
✅ **Sem rastreamento**: Nenhum cookie ou tracking

## Futuras Melhorias

- [ ] Exportar diário em PDF
- [ ] Gráficos de tendências emocionais
- [ ] Lembretes de reflexão diária
- [ ] Integração com calendário
- [ ] Análise de padrões emocionais
- [ ] Backup automático na nuvem (opcional)

## Suporte

Para dúvidas ou sugestões sobre o Diário de Emoções, entre em contato com André Duarte pelo WhatsApp:
📱 (21) 98252-5626

---

**Desenvolvido com ❤️ para promover bem-estar emocional**
