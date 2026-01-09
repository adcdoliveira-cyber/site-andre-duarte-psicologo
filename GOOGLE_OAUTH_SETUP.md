# Configuração do Google OAuth 2.0

Este documento descreve como configurar a integração real do Google OAuth 2.0 no site do psicólogo André Duarte.

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao [Google Cloud Console](https://console.cloud.google.com)
- Domínio configurado (ou localhost para desenvolvimento)

## 🚀 Passo 1: Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Clique em **"Selecionar um projeto"** → **"Novo projeto"**
3. Nome: `André Duarte Psicólogo` (ou seu nome)
4. Clique em **"Criar"**

## 🔑 Passo 2: Ativar Google Identity Services API

1. No menu lateral, vá para **"APIs e Serviços"** → **"Biblioteca"**
2. Procure por **"Google Identity Services"**
3. Clique em **"Ativar"**

## 🎫 Passo 3: Criar Credenciais OAuth 2.0

1. Vá para **"APIs e Serviços"** → **"Credenciais"**
2. Clique em **"+ Criar Credenciais"** → **"ID do cliente OAuth"**
3. Se aparecer um aviso, clique em **"Configurar consentimento do usuário"**

### Configurar Consentimento do Usuário

1. Selecione **"Externo"** como tipo de usuário
2. Clique em **"Criar"**
3. Preencha os campos obrigatórios:
   - **Nome do app**: André Duarte - Psicólogo
   - **Email de suporte**: seu-email@gmail.com
   - **Email de contato do desenvolvedor**: seu-email@gmail.com
4. Clique em **"Salvar e continuar"**
5. Na seção de escopos, clique em **"Salvar e continuar"**
6. Na seção de usuários de teste, clique em **"Salvar e continuar"**
7. Clique em **"Voltar ao painel"**

### Criar ID do Cliente

1. Vá para **"Credenciais"** novamente
2. Clique em **"+ Criar Credenciais"** → **"ID do cliente OAuth"**
3. Selecione **"Aplicativo da Web"**
4. Nome: `André Duarte - Web App`
5. Em **"URIs de redirecionamento autorizados"**, adicione:
   - `http://localhost:5173` (desenvolvimento)
   - `http://localhost:3000` (desenvolvimento backend)
   - `https://seu-dominio.com` (produção)
   - `https://seu-dominio.com/login` (produção)
6. Clique em **"Criar"**

## 📝 Passo 4: Copiar Client ID

1. Uma janela aparecerá com seu **Client ID**
2. Copie o **Client ID** (não o Client Secret por enquanto)
3. Clique em **"OK"**

## 🔧 Passo 5: Configurar no Projeto

### Frontend (React)

1. Abra `client/src/pages/Login.tsx`
2. Localize a linha:
   ```typescript
   const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
   ```
3. Substitua `YOUR_GOOGLE_CLIENT_ID` pelo seu Client ID copiado:
   ```typescript
   const GOOGLE_CLIENT_ID = "123456789-abc123def456.apps.googleusercontent.com";
   ```

### Backend (Opcional - para validação adicional)

1. Abra `server/routes/auth.ts`
2. Se quiser validar tokens no backend, configure:
   ```typescript
   const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "your-client-secret";
   ```

## 🧪 Passo 6: Testar Localmente

1. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

2. Acesse `http://localhost:5173`

3. Clique em **"Diário"** → **"Fazer Login"**

4. Clique no botão **"Google"**

5. Uma janela do Google aparecerá

6. Faça login com sua conta Google

7. Autorize o acesso

## ✅ Validação

Após fazer login com sucesso, você deve ver:
- ✅ Seu nome exibido na página
- ✅ Sua foto de perfil
- ✅ Acesso ao Diário de Emoções
- ✅ Dados salvos no banco de dados

## 🚀 Passo 7: Deploy em Produção

Quando estiver pronto para colocar em produção:

1. Obtenha seu domínio (ex: `andre-duarte-psicologo.com`)
2. Adicione o domínio às **URIs de redirecionamento autorizados**:
   - `https://andre-duarte-psicologo.com`
   - `https://andre-duarte-psicologo.com/login`
3. Atualize o `GOOGLE_CLIENT_ID` no código (ou use variáveis de ambiente)
4. Deploy normalmente

## 🔒 Segurança

### ⚠️ Importante

- **Nunca** compartilhe seu **Client Secret** publicamente
- **Nunca** commit o Client ID em repositórios públicos (use `.env`)
- Use HTTPS em produção
- Valide tokens no backend (implementado em `server/routes/auth.ts`)

### Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
JWT_SECRET=your-jwt-secret-change-this
```

Atualize `client/src/pages/Login.tsx`:

```typescript
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
```

## 🆘 Troubleshooting

### "Erro ao fazer login com Google"

- Verifique se o Client ID está correto
- Verifique se o domínio está na lista de URIs autorizados
- Verifique o console do navegador (F12) para mensagens de erro

### "Popup bloqueado"

- O navegador pode estar bloqueando popups
- Permita popups para `localhost:5173`

### "Credenciais não encontradas"

- Certifique-se de que a API Google Identity Services está ativada
- Aguarde alguns minutos após ativar a API

## 📚 Referências

- [Google Identity Services Documentation](https://developers.google.com/identity/gsi/web)
- [Google Cloud Console](https://console.cloud.google.com)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)

## 💡 Próximos Passos

Após configurar Google OAuth:

1. Implemente Microsoft OAuth (similar ao Google)
2. Implemente GitHub OAuth
3. Adicione suporte a 2FA (autenticação de dois fatores)
4. Configure backup automático de dados

---

**Dúvidas?** Entre em contato via WhatsApp: https://wa.me/5521982525626
