/* ==========================================================================
   CONFIGURAÇÃO DO FIREBASE (IMPORTAÇÕES)
   ========================================================================== */
// Importamos as ferramentas diretas dos servidores do Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* --------------------------------------------------------------------------
   COLE SUAS CREDENCIAIS AQUI DENTRO!
   (Substitua este bloco pelas chaves que o Firebase gerou para você)
   -------------------------------------------------------------------------- */
const firebaseConfig = {
    apiKey: "AIzaSyBa9KLqX-WsuqzSVGyF73jXujNmvz7QibA",
  authDomain: "academia-fenrir.firebaseapp.com",
  projectId: "academia-fenrir",
  storageBucket: "academia-fenrir.firebasestorage.app",
  messagingSenderId: "174772006900",
  appId: "1:174772006900:web:3a76ecdc3f1dea84a393a1"
};

// Inicializando o Firebase e o sistema de Autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ==========================================================================
   LÓGICA DE LOGIN DA FENRIR ACADEMIA
   ========================================================================== */

// 1. Capturamos o formulário do HTML
const loginForm = document.querySelector('.login-form');

// 2. Criamos um "ouvinte" que avisa quando o botão ENTRAR for clicado
loginForm.addEventListener('submit', (e) => {
    
    // Isso impede a página de recarregar (o padrão do HTML)
    e.preventDefault(); 

    // 3. Pegamos o que o usuário digitou nos campos
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

  // 4. Mandamos os dados para o Firebase verificar
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // SE A SENHA ESTIVER CERTA:
            const user = userCredential.user;
            
            let nomeParaExibir = "";

            // 1. Verifica se o usuário tem um nome real cadastrado no Firebase
            if (user.displayName) {
                // Se tiver nome completo, pega apenas o primeiro nome
                nomeParaExibir = user.displayName.split(' ')[0];
            } else {
                // PLANO B: Se for uma conta antiga sem nome, pega o começo do e-mail
                nomeParaExibir = user.email.split('@')[0];
            }
            
            // Salva o nome correto na "mochila" do navegador (localStorage)
            localStorage.setItem('nomeUsuarioFenrir', nomeParaExibir);
            
            // Redireciona o usuário para o painel inicial
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            // SE A SENHA ESTIVER ERRADA OU USUÁRIO NÃO EXISTIR:
            const errorCode = error.code;
            
            if (errorCode === 'auth/invalid-credential') {
                alert("Erro: E-mail ou senha incorretos.");
            } else if (errorCode === 'auth/invalid-email') {
                alert("Erro: O formato do e-mail é inválido.");
            } else {
                alert("Falha no login. Tente novamente.");
            }
        }); // <- Fechamento do catch

}); // <- ESTA É A LINHA MAIS IMPORTANTE! Ela fecha o loginForm.addEventListener que abrimos lá em cima.