// Função para pesquisar um país, capital ou continente.
function pesquisar() {
    // Obtém a seção onde os resultados serão exibidos e o valor digitado pelo usuário.
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    
    // Verifica se o campo de pesquisa está vazio.
    if (!campoPesquisa) {
        // Exibe uma mensagem informando que nada foi encontrado.
        section.innerHTML = `<h2>Nada foi encontrado. Você precisa escrever algo.</h2>`
        return;
    }
    
    // Converte o texto da pesquisa para letras minúsculas para facilitar a comparação
    campoPesquisa = campoPesquisa.toLowerCase();
    // Inicializa uma string vazia para armazenar os resultados da pesquisa
    let resultados = "";
  
    // Itera sobre cada país nos dados
    for (let pais of dadosPaises) {
    
        // Converte os nomes para letras minúsculas para facilitar a comparação
      nome = pais.nome.toLowerCase();
      capital = pais.capital.toLowerCase();
      continente = pais.continente.toLowerCase();
        
      // Verifica se o texto da pesquisa está presente no nome, capital ou continente do país
        if (nome.includes(campoPesquisa) || capital.includes(campoPesquisa) || continente.includes(campoPesquisa)) {
            // Se encontrar um resultado, adiciona o país aos resultados da pesquisa
            resultados += `
          <div class="item-resultado">
            <h2>${pais.nome}</h2>
            <p class="capital-meta"> Capital: ${pais.capital}</p>
            <p class="continente-meta">Continente: ${pais.continente}</p>
            <img src=${pais.bandeira}>
          </div>
        `;
        }
    }

     // Verifica se foram encontrados resultados
    if (!resultados) {
    // Se não houver resultados, exibe uma mensagem de que nada foi encontrado
      resultados = `<h2>Nada foi encontrado.</h2>`
    }
  
  // Exibe os resultados na seção HTML
    section.innerHTML = resultados;
  }

// Função para mostrar uma seção específica e ocultar as outras/
  function mostrarSecao(secao) {
    // Obtém todas as seções e as oculta
    let secoes = document.querySelectorAll(".modos");
    secoes.forEach(s => s.style.display = 'none');
    // Mostra a seção especificada
    document.getElementById(secao).style.display = "flex";
  }
// Funções para mostrar as seções de "Estudar", "Adivinhar capitais" e "Adivinhar bandeiras"
function clicarEstudar() {
    mostrarSecao('modo-estudar');
  }
  
let acertosCapital = 0;
let acertosBandeira = 0;

function clicarCapitais() {
    mostrarSecao('modo-capitais');
    capitalCorreta = gerarPerguntaCapital();
    acertosCapital = 0;
    document.getElementById("contador-capital").textContent = `Total de acertos: ${acertosCapital}`
  }
  
function clicarBandeiras() {
    mostrarSecao('modo-bandeiras');
    paisCorreto = gerarPerguntaBandeira();
    acertosBandeira = 0;
    document.getElementById("contador-bandeira").textContent = `Total de acertos: ${acertosBandeira}`
  }

// Função para gerar a pergunta sobre a capital
function gerarPerguntaCapital() {
    // Seleciona o elemento HTML onde a pergunta será exibida
    let elemento = document.getElementById("campo-pergunta-capital");
    // Gera um índice aleatório para escolher um país da lista
    let indiceRandom = Math.floor(Math.random()*dadosPaises.length);
    // Obtém a capital do país selecionado e a armazena como a resposta correta
    let capitalCorreta = dadosPaises[indiceRandom].capital;
    // Atualiza o HTML do elemento com o nome do país e sua bandeira
    elemento.innerHTML = `
        <h2>${dadosPaises[indiceRandom].nome}</h2>
        <img src=${dadosPaises[indiceRandom].bandeira}>
    `;
    // Retorna a capital correta para ser utilizada na verificação da resposta
    return capitalCorreta
}

function confirmarCapitalResposta() {
    // Obtém a resposta do usuário
    let respostaUsuario = document.getElementById("campo-resposta-capital").value
    // Compara a resposta do usuário com a resposta correta, ignorando maiúsculas e minúsculas
    if (capitalCorreta.toLowerCase() == respostaUsuario.toLowerCase()) {
        // Se a resposta estiver correta, incrementa o contador de acertos e atualiza o HTML
        acertosCapital++;
        document.getElementById("contador-capital").textContent = `Você acertou! Total de acertos: ${acertosCapital}`
        // Limpa o campo de resposta e gera uma nova pergunta
        document.getElementById("campo-resposta-capital").value = ""
        capitalCorreta = gerarPerguntaCapital();
    } else {
        // Se a resposta estiver incorreta, informa o usuário e mantém o contador
        document.getElementById("contador-capital").textContent = `Tente novamente! Total de acertos: ${acertosCapital}`
        // Limpa o campo de resposta
        document.getElementById("campo-resposta-capital").value = ""
    }
}

// Funções gerarPerguntaBandeira e confirmarBandeiraResposta seguem a mesma lógica, 
// com as devidas adaptações para o modo de adivinhar bandeiras.
function gerarPerguntaBandeira() {
    let elemento = document.getElementById("campo-pergunta-bandeira");
    let indiceRandom = Math.floor(Math.random()*dadosPaises.length);
    let paisCorreto = dadosPaises[indiceRandom].nome;
    elemento.innerHTML = `
        <img src=${dadosPaises[indiceRandom].bandeira}>
    `;
    return paisCorreto
}

function confirmarBandeiraResposta() {
    let respostaUsuario = document.getElementById("campo-resposta-bandeira").value
    if (paisCorreto.toLowerCase() == respostaUsuario.toLowerCase()) {
        acertosBandeira++;
        document.getElementById("contador-bandeira").textContent = `Você acertou! Total de acertos: ${acertosBandeira}`
        document.getElementById("campo-resposta-bandeira").value = ""
        paisCorreto = gerarPerguntaBandeira();
    } else {
        document.getElementById("contador-bandeira").textContent = `Tente novamente! Total de acertos: ${acertosBandeira}`
        document.getElementById("campo-resposta-bandeira").value = ""
    }
}



