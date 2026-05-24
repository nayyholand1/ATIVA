function mostrar(botao) {
  const grupo = botao.parentElement;
  const info = grupo.querySelector('.info');
  const jaAtivo = botao.classList.contains('ativo');

  // fecha todas as abas
  document.querySelectorAll('.info').forEach(i => i.style.display = 'none');
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('ativo');
    t.setAttribute('aria-expanded', 'false');
  });

  // abre a aba clicada
  if (!jaAtivo) {
    info.style.display = 'block';
    botao.classList.add('ativo');
    botao.setAttribute('aria-expanded', 'true');

    info.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// inicializa ícones
lucide.createIcons();


// ===== LUPA (CORRIGIDA E SEGURA) =====
document.addEventListener("DOMContentLoaded", () => {

  const input = document.querySelector(".ativa-search-inner input");

  if (!input) return;

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {

      const valor = input.value.toLowerCase().trim();

      const mapa = {
        objetivos: "objetivos",
        desafios: "desafios",
        reflexoes: "reflexoes",
        dados: "dados",
        integrantes: "integrantes",
        ajudar: "ajudar"
      };

      const chave = Object.keys(mapa).find(key =>
        valor.includes(key)
      );

      if (chave) {
        const alvo = document.getElementById(mapa[chave]);

        if (alvo) {

          // 👉 vai até o tópico
          alvo.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

          // 👉 remove destaque antigo
          document.querySelectorAll(".destaque-busca")
            .forEach(el => el.classList.remove("destaque-busca"));

          // 👉 adiciona destaque no atual
          alvo.classList.add("destaque-busca");

          // 👉 remove depois de um tempo
          setTimeout(() => {
            alvo.classList.remove("destaque-busca");
          }, 1500);
        }
      }

      input.value = "";
    }
  });

});  const barra = document.querySelector(".ativa-search");

let ultimoScroll = 0;

window.addEventListener("scroll", () => {
  const atual = window.pageYOffset;

  if (atual > ultimoScroll && atual > 80) {
    // descendo → esconde barra
    barra.style.transform = "translateY(-100%)";
  } else {
    // subindo → mostra barra
    barra.style.transform = "translateY(0)";
  }

  ultimoScroll = atual;
});
