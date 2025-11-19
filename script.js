// Função para simular download de PDF
function downloadPDF(fileName) {

    // Criar um elemento <a> temporário
    const link = document.createElement('a');
    link.href = `files/${fileName}`;
    link.download = fileName;
    
    // Adicionar ao DOM, clicar e remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensagem de sucesso
    showNotification(`📥 Download iniciado: ${fileName}`);
}

// Função para mostrar notificações
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função para assinar newsletter
function assinarNewsletter() {
    const email = prompt("🎯 Inscreva-se no nosso canal!\n\nDigite seu e-mail para receber novidades:");
    
    if (email) {
        // Validação básica de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            showNotification(`✅ Inscrito com sucesso! Bem-vindo(a) à nossa comunidade!`);
            
            // Aqui normalmente enviaríamos os dados para um servidor
            console.log(`Novo inscrito: ${email}`);
        } else {
            alert("❌ Por favor, insira um endereço de e-mail válido.");
        }
    }
}

// Função para processar o formulário de contato
function processarFormulario(event) {
    event.preventDefault();
    
    // Coletar dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Verificar gênero de filme selecionado
    const generoFilme = document.querySelector('input[name="genero_filme"]:checked');
    const generoSelecionado = generoFilme ? generoFilme.value : 'Nenhum selecionado';
    
    // Verificar linguagens de programação selecionadas
    const linguagensCheckboxes = document.querySelectorAll('input[name="linguagem"]:checked');
    const linguagensSelecionadas = Array.from(linguagensCheckboxes).map(cb => cb.value);
    
    // Validar dados
    if (!nome || !email || !mensagem) {
        showNotification("❌ Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    
    // Mostrar dados coletados (em um caso real, enviaríamos para um servidor)
    console.log("📋 Dados do formulário:");
    console.log(`Nome: ${nome}`);
    console.log(`E-mail: ${email}`);
    console.log(`Idade: ${idade}`);
    console.log(`Gênero de filme favorito: ${generoSelecionado}`);
    console.log(`Linguagens de programação: ${linguagensSelecionadas.join(', ')}`);
    console.log(`Mensagem: ${mensagem}`);
    
    // Mostrar mensagem de sucesso
    showNotification(`🎉 Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
    
    // Limpar formulário
    document.getElementById('contact-form').reset();
}

// Função para smooth scrolling
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar event listeners para os botões de download
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.getAttribute('data-file');
            downloadPDF(fileName);
        });
    });
    
    // Adicionar event listener para o botão de newsletter
    const newsletterBtn = document.getElementById('newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', assinarNewsletter);
    }
    
    // Adicionar event listener para o formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', processarFormulario);
    }
    
    // Adicionar smooth scrolling para os links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é um link âncora
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                smoothScroll(targetId);
            }
        });
    });
    
    // Adicionar efeitos de hover dinâmicos
    const cards = document.querySelectorAll('.download-card, .article-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Adicionar redirecionamento para o card de hospedagem
    const hospedagemCard = document.getElementById('hospedagem-card');
    if (hospedagemCard) {
        hospedagemCard.style.cursor = 'pointer';
        hospedagemCard.addEventListener('click', function() {
            window.open('https://br.cybernews.com/lp/melhor-hospedagem-br/?campaignId=13810317034&adgroupId=130217169571&adId=627792489264&targetId=kwd-13551360347&device=c&gunique=Cj0KCQiAiebIBhDmARIsAE8PGNKY8SKk5i9Roe94GWg15SKs2afPlA3FwOZHBK2nDSwWujfYYpS65CAaAtMlEALw_wcB&gad_source=1&gad_campaignid=13810317034&gbraid=0AAAAACyNk2214bzW7FyKavrJGDCKz2caa&gclid=Cj0KCQiAiebIBhDmARIsAE8PGNKY8SKk5i9Roe94GWg15SKs2afPlA3FwOZHBK2nDSwWujfYYpS65CAaAtMlEALw_wcB', '_blank');
        });
    }
    
    // Adicionar redirecionamento para o card de velocidade
    const velocidadeCard = document.getElementById('velocidade-card');
    if (velocidadeCard) {
        velocidadeCard.style.cursor = 'pointer';
        velocidadeCard.addEventListener('click', function() {
            window.open('https://blog.esweb.com.br/infraestrutura/praticas-para-melhorar-velocidade-do-servidor', '_blank');
        });
    }
    
    // Adicionar redirecionamento para o botão do YouTube
    const youtubeBtn = document.getElementById('youtube-btn');
    if (youtubeBtn) {
        youtubeBtn.addEventListener('click', function() {
            window.open('https://www.youtube.com/', '_blank');
        });
    }
    
    // Adicionar redirecionamento para o botão do GitHub
    const githubBtn = document.getElementById('github-btn');
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            window.open('https://github.com/rambalaue', '_blank');
        });
    }
    
    console.log('🚀 Site Vitor Guide carregado com sucesso!');
});
