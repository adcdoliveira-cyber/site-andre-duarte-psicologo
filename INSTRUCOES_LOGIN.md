# Sistema de Login com Email e Senha - Implementado ✅

## O que foi implementado

Implementei um sistema completo de **cadastro e login com email e senha** no seu site, permitindo que os usuários criem contas diretamente sem depender de provedores externos (Google, GitHub, etc.).

## Arquivos Modificados e Criados

### Backend

1. **`server/db/schema.ts`** - Atualizado
   - Adicionado campo `passwordHash` para armazenar senhas criptografadas
   - Campo `providerId` agora aceita NULL para usuários locais

2. **`server/auth/local.ts`** - NOVO
   - Função `registerUser()` - Registra novos usuários com validação
   - Função `authenticateUser()` - Autentica usuários com email/senha
   - Usa bcrypt para hash seguro de senhas

3. **`server/routes/auth.ts`** - Atualizado
   - Rota `POST /api/auth/register` - Endpoint de cadastro
   - Rota `POST /api/auth/login` - Endpoint de login
   - Retorna JWT token para autenticação

4. **`server/db/init.ts`** - Atualizado
   - Estrutura da tabela users atualizada com campo de senha

### Frontend

1. **`client/src/pages/Login.tsx`** - REESCRITO
   - Formulário de login com email e senha
   - Formulário de cadastro com validação
   - Toggle entre modo login e cadastro
   - Validação de senhas (mínimo 6 caracteres)
   - Confirmação de senha no cadastro
   - Mensagens de erro amigáveis

2. **`vite.config.ts`** - Atualizado
   - Adicionado proxy para redirecionar `/api` ao backend (porta 3000)

## Como Funciona

### Cadastro de Usuário

1. Usuário acessa `/login`
2. Clica em "Criar conta"
3. Preenche: Nome, Email, Senha, Confirmação de Senha
4. Sistema valida:
   - Email único (não cadastrado)
   - Senha com mínimo 6 caracteres
   - Senhas coincidem
5. Senha é criptografada com bcrypt
6. Usuário é salvo no banco de dados
7. Token JWT é gerado e retornado
8. Usuário é redirecionado para `/diario/meu`

### Login de Usuário

1. Usuário acessa `/login`
2. Preenche Email e Senha
3. Sistema verifica credenciais
4. Se correto, gera token JWT
5. Usuário é autenticado e redirecionado

## Segurança Implementada

✅ **Senhas criptografadas** com bcrypt (10 rounds)  
✅ **Validação de email** (formato e unicidade)  
✅ **Validação de senha** (mínimo 6 caracteres)  
✅ **JWT tokens** para sessões (expiração de 7 dias)  
✅ **Proteção contra SQL injection** (queries parametrizadas)

## Como Testar Localmente

### 1. Instalar Dependências

```bash
cd /home/ubuntu/site-andre-duarte-psicologo
pnpm install
```

### 2. Inicializar o Banco de Dados

```bash
npx tsx server/db/init.ts
```

### 3. Fazer Build do Projeto

```bash
pnpm build
```

### 4. Iniciar Backend (Terminal 1)

```bash
node dist/index.js
```

O backend rodará em `http://localhost:3000`

### 5. Iniciar Frontend (Terminal 2)

```bash
pnpm dev
```

O frontend rodará em `http://localhost:5000`

### 6. Acessar o Site

Abra o navegador em `http://localhost:5000/login`

## Como Fazer Deploy

### Preparação

1. **Fazer build do projeto:**
   ```bash
   pnpm build
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   export JWT_SECRET="sua-chave-secreta-super-segura-aqui"
   export NODE_ENV=production
   ```

3. **Iniciar em produção:**
   ```bash
   pnpm start
   ```

### Deploy no Replit/Vercel/Netlify

O projeto já está configurado para deploy. Certifique-se de:

- Definir `JWT_SECRET` nas variáveis de ambiente
- O banco SQLite será criado automaticamente em `data/app.db`
- Porta padrão: 3000 (configurável via `PORT`)

## Estrutura do Banco de Dados

### Tabela `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | ID único (auto-increment) |
| email | TEXT | Email único do usuário |
| name | TEXT | Nome completo |
| avatar | TEXT | URL da foto (opcional) |
| provider | TEXT | 'local', 'google', 'microsoft', 'github' |
| provider_id | TEXT | ID do provedor (NULL para local) |
| password_hash | TEXT | Hash bcrypt da senha (apenas local) |
| created_at | DATETIME | Data de criação |
| updated_at | DATETIME | Data de atualização |

## Validações Implementadas

### Cadastro
- ✅ Nome: mínimo 2 caracteres
- ✅ Email: formato válido e único
- ✅ Senha: mínimo 6 caracteres
- ✅ Confirmação de senha deve coincidir

### Login
- ✅ Email e senha obrigatórios
- ✅ Verificação de credenciais
- ✅ Mensagens de erro genéricas (segurança)

## Próximos Passos Recomendados

1. **Recuperação de senha** - Implementar "Esqueci minha senha"
2. **Verificação de email** - Enviar email de confirmação
3. **Perfil de usuário** - Permitir edição de dados
4. **Foto de perfil** - Upload de avatar
5. **2FA** - Autenticação de dois fatores (opcional)

## Problemas Conhecidos

⚠️ **Banco de dados em memória**: O projeto usa `sql.js` que mantém o banco em memória. Para persistência adequada em produção, considere migrar para:
- PostgreSQL (recomendado para produção)
- MySQL/MariaDB
- SQLite nativo (não sql.js)

## Suporte

Se tiver dúvidas ou problemas, verifique:
- Logs do servidor: `/tmp/backend.log`
- Console do navegador (F12)
- Tabela users no banco: `sqlite3 data/app.db "SELECT * FROM users;"`

---

**Implementado com sucesso! 🎉**

O sistema está pronto para uso. Os usuários agora podem criar contas e fazer login diretamente no site.
