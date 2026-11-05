/* ==========================================================================
   DEU PIZZA - COMPORTAMENTO DO SITE (script.js)

   Este arquivo cuida do que ACONTECE quando alguém usa o site:
   cliques, carrinho, janelas, menu que rola suave...

   ÍNDICE
   1. Configurações (telefone, WhatsApp, iFood)  <- mexa aqui primeiro
   2. Lista de pizzas                            <- para adicionar pizzas
   3. Pegando os elementos da página
   4. Variáveis do site (carrinho, etc.)
   5. Funções de ajuda (preço, aviso)
   6. Cardápio (desenhar os cartões)
   7. Carrinho (adicionar, contar, animação)
   8. Janelas (abrir e fechar)
   9. Janela de detalhes da pizza
   10. Janela do carrinho (lista, WhatsApp, iFood...)
   11. Cliques nos cartões do cardápio
   12. Efeitos (cartões aparecendo, pizza que mexe)
   13. Menu de navegação (rolagem suave)
   14. Começando tudo
   ========================================================================== */


/* ==========================================================================
   1. CONFIGURAÇÕES
   Troque pelos dados reais do restaurante.
   ========================================================================== */

// Número do WhatsApp: código do país (55) + DDD + número, tudo junto, sem espaço
const NUMERO_WHATSAPP = '5511900000000';

// Página do restaurante no iFood
const LINK_IFOOD = 'https://www.ifood.com.br/';

// Telefone usado no botão "Ligar para o restaurante"
const TELEFONE_LIGAR = '+551140000000';

// Nome que aparece no começo da mensagem do pedido
const NOME_DA_LOJA = 'Deu Pizza';


/* ==========================================================================
   2. LISTA DE PIZZAS
   Cada pizza é um bloco { ... } com estes campos:
     nome            -> título do cartão
     descricaoCurta  -> linha pequena embaixo do nome
     preco           -> número com ponto (ex.: 22.00)
     imagem          -> caminho da foto (pasta img/)
     descricao       -> texto da janela de detalhes
     ingredientes    -> lista de ingredientes da janela de detalhes

   PARA ADICIONAR UMA PIZZA NOVA: copie um bloco inteiro, cole no final da
   lista (com uma vírgula depois do bloco anterior) e troque os dados.
   O cartão aparece sozinho no cardápio!
   ========================================================================== */
const pizzas = [
  {
    nome: 'Pesto e Presunto',
    descricaoCurta: 'Pesto, presunto, mussarela',
    preco: 22.00,
    imagem: 'img/pizza-1.webp',
    descricao: 'Massa fina e crocante com pesto de manjericão, fatias de presunto e mussarela derretida.',
    ingredientes: ['Pesto de manjericão', 'Presunto', 'Mussarela', 'Azeite']
  },
  {
    nome: 'Frango Buffalo',
    descricaoCurta: 'Molho buffalo, queijos',
    preco: 24.90,
    imagem: 'img/pizza-2.webp',
    descricao: 'Molho buffalo levemente picante com uma generosa camada de queijos gratinados.',
    ingredientes: ['Molho buffalo', 'Queijos', 'Mussarela', 'Massa fina']
  },
  {
    nome: 'Pepperoni',
    descricaoCurta: 'Pepperoni, mussarela, tomate',
    preco: 25.00,
    imagem: 'img/pizza-3.webp',
    descricao: 'Fatias de pepperoni levemente picantes, molho de tomate artesanal e mussarela cremosa.',
    ingredientes: ['Pepperoni', 'Mussarela', 'Molho de tomate', 'Orégano']
  },
  {
    nome: 'Pesto Genovese',
    descricaoCurta: 'Pesto, presunto, queijos',
    preco: 26.50,
    imagem: 'img/pizza-4.webp',
    descricao: 'Base de pesto genovês, presunto e queijos selecionados, finalizada com um fio de azeite.',
    ingredientes: ['Pesto genovês', 'Presunto', 'Queijos', 'Azeite']
  },
  {
    nome: 'Frango ao Pesto',
    descricaoCurta: 'Frango, pesto, espinafre',
    preco: 26.00,
    imagem: 'img/pizza-5.webp',
    descricao: 'Base branca com pedaços de frango, pesto artesanal, mussarela e folhas frescas de espinafre.',
    ingredientes: ['Frango', 'Pesto', 'Mussarela', 'Espinafre']
  },
  {
    nome: 'Margherita Fresca',
    descricaoCurta: 'Tomate, mussarela, manjericão',
    preco: 21.00,
    imagem: 'img/pizza-6.webp',
    descricao: 'A clássica: molho de tomate artesanal e mussarela derretida, finalizada com manjericão.',
    ingredientes: ['Molho de tomate', 'Mussarela', 'Manjericão', 'Azeite']
  }
];

// Desenhos (ícones) usados nos cartões
const iconeCoracao = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.3-9.2C1.2 8.6 3 5 6.4 5c2 0 3.6 1 5.6 3 2-2 3.6-3 5.6-3C21 5 22.800 8.600 21.300 11.800 19 16.400 12 21 12 21z"/></svg>';
const iconeDetalhes = '<svg viewBox="0 0 24 24"><path d="M5 8h14M5 12h14M5 16h14"/></svg>';


/* ==========================================================================
   3. PEGANDO OS ELEMENTOS DA PÁGINA
   Aqui guardamos em variáveis os elementos do HTML que o script precisa
   usar. Cada nome é o "id" que está no index.html.
   ========================================================================== */

// Cardápio e carrinho
const gradePizzas = document.getElementById('grade-pizzas');
const botaoCarrinho = document.getElementById('botao-carrinho');
const contadorCarrinho = document.getElementById('contador-carrinho');
const aviso = document.getElementById('aviso');

// Janela de detalhes da pizza
const janelaDetalhes = document.getElementById('janela-detalhes');
const detalheFoto = document.getElementById('detalhe-foto');
const detalheTitulo = document.getElementById('detalhe-titulo');
const detalheDescricao = document.getElementById('detalhe-descricao');
const detalheIngredientes = document.getElementById('detalhe-ingredientes');
const detalheQuantidade = document.getElementById('detalhe-quantidade');
const detalheAdicionar = document.getElementById('detalhe-adicionar');

// Janela do carrinho
const janelaCarrinho = document.getElementById('janela-carrinho');
const carrinhoVazio = document.getElementById('carrinho-vazio');
const carrinhoConteudo = document.getElementById('carrinho-conteudo');
const carrinhoLista = document.getElementById('carrinho-lista');
const carrinhoTotal = document.getElementById('carrinho-total');
const campoNome = document.getElementById('campo-nome');
const campoEndereco = document.getElementById('campo-endereco');

// Topo e menu
const pizzaDestaque = document.getElementById('pizza-destaque');
const topoDoSite = document.getElementById('inicio');
const linksDoMenu = document.querySelectorAll('.menu-navegacao a');
const indicador = document.getElementById('indicador');


/* ==========================================================================
   4. VARIÁVEIS DO SITE
   Informações que mudam enquanto a pessoa usa o site.
   ========================================================================== */

// O carrinho guarda: posição da pizza na lista -> quantidade.
// Exemplo: { 0: 2, 3: 1 } = 2x a primeira pizza e 1x a quarta pizza.
let carrinho = {};

// Pizza que está aberta na janela de detalhes e a quantidade escolhida nela
let pizzaAberta = 0;
let quantidadeDetalhe = 1;

// Guarda o elemento que estava selecionado antes de abrir uma janela,
// para devolver o foco quando ela fechar.
let elementoAnterior = null;

// Timer da mensagem de aviso
let timerAviso;

// Verdadeiro se a pessoa pediu "menos movimento" no aparelho
const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ==========================================================================
   5. FUNÇÕES DE AJUDA
   ========================================================================== */

// Transforma 22 em "R$ 22,00"
function formatarPreco(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// Mostra a mensagem preta pequena embaixo da tela por 1,9 segundo
function mostrarAviso(texto) {
  aviso.textContent = texto;
  aviso.classList.add('visivel');

  clearTimeout(timerAviso);
  timerAviso = setTimeout(function () {
    aviso.classList.remove('visivel');
  }, 1900);
}


/* ==========================================================================
   6. CARDÁPIO
   Cria um cartão no HTML para cada pizza da lista.
   ========================================================================== */
function desenharCardapio() {
  let html = '';

  for (let i = 0; i < pizzas.length; i++) {
    const pizza = pizzas[i];

    // "i % 4" faz os cartões de uma mesma linha aparecerem um depois do outro
    html += `
      <article class="cartao-pizza aparecer" data-posicao="${i}" style="--ordem:${i % 4}">

        <!-- Parte de cima: foto e as duas bolinhas -->
        <div class="foto-pizza">
          <img src="${pizza.imagem}" alt="${pizza.nome}" loading="lazy">
          <button class="botao-redondo botao-favorito" type="button" aria-pressed="false" aria-label="Favoritar ${pizza.nome}">${iconeCoracao}</button>
          <button class="botao-redondo botao-detalhes" type="button" aria-label="Ver detalhes de ${pizza.nome}">${iconeDetalhes}</button>
        </div>

        <!-- Parte de baixo: nome, preço e botão Pedir -->
        <div class="informacoes">
          <h3 class="nome-pizza">${pizza.nome}</h3>
          <p class="descricao-curta">${pizza.descricaoCurta}</p>
          <span class="moeda"></span>
          <span class="preco">${formatarPreco(pizza.preco)}</span>
          <button class="botao-pedir" type="button" data-posicao="${i}">Pedir</button>
        </div>

      </article>
    `;
  }

  gradePizzas.innerHTML = html;
}


/* ==========================================================================
   7. CARRINHO
   ========================================================================== */

// Soma a quantidade de todas as pizzas do carrinho
function contarItens() {
  let total = 0;
  for (const posicao in carrinho) {
    total += carrinho[posicao];
  }
  return total;
}

// Soma o valor (preço x quantidade) de todas as pizzas do carrinho
function calcularTotal() {
  let total = 0;
  for (const posicao in carrinho) {
    total += carrinho[posicao] * pizzas[posicao].preco;
  }
  return total;
}

// Soma (ou tira, se a quantidade for negativa) pizzas do carrinho
function adicionarAoCarrinho(posicao, quantidade) {
  const quantidadeAtual = carrinho[posicao] || 0;
  const novaQuantidade = quantidadeAtual + quantidade;

  if (novaQuantidade <= 0) {
    delete carrinho[posicao];        // zerou: tira a pizza do carrinho
  } else {
    carrinho[posicao] = novaQuantidade;
  }

  contadorCarrinho.textContent = contarItens();   // atualiza a bolinha do botão
}

// Dá uma "pulsadinha" no botão do carrinho
function pulsarCarrinho() {
  if (botaoCarrinho.animate) {
    botaoCarrinho.animate(
      [{ scale: 1 }, { scale: 1.18 }, { scale: 1 }],
      { duration: 450, easing: 'cubic-bezier(.2,1.6,.4,1)' }
    );
  }
}

// Faz uma moedinha voar do botão clicado até o carrinho
function voarAteCarrinho(botaoOrigem) {
  // Se o navegador não sabe animar, só pulsa o carrinho
  if (!botaoOrigem.animate) {
    pulsarCarrinho();
    return;
  }

  // Posição de onde a moedinha sai e de onde ela chega
  const origem = botaoOrigem.getBoundingClientRect();
  const destino = botaoCarrinho.getBoundingClientRect();
  const xInicial = origem.left + origem.width / 2;
  const yInicial = origem.top + origem.height / 2;
  const distanciaX = destino.left + destino.width / 2 - xInicial;
  const distanciaY = destino.top + destino.height / 2 - yInicial;

  // Cria a moedinha na tela
  const moeda = document.createElement('span');
  moeda.className = 'moeda-voando';
  moeda.style.left = (xInicial - 9) + 'px';
  moeda.style.top = (yInicial - 9) + 'px';
  document.body.appendChild(moeda);

  // Movimento: sobe um pouco no meio do caminho e termina pequena no carrinho
  const animacao = moeda.animate([
    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    { transform: 'translate(' + distanciaX * 0.5 + 'px, ' + (distanciaY * 0.5 - 70) + 'px) scale(1.25)', opacity: 1, offset: 0.5 },
    { transform: 'translate(' + distanciaX + 'px, ' + distanciaY + 'px) scale(.4)', opacity: 0.9 }
  ], { duration: 720, easing: 'cubic-bezier(.4,0,.2,1)' });

  // Quando chegar: some com a moedinha e pulsa o carrinho
  animacao.onfinish = function () {
    moeda.remove();
    pulsarCarrinho();
  };
}


/* ==========================================================================
   8. JANELAS (abrir e fechar)
   Servem para as duas janelas: detalhes da pizza e carrinho.
   ========================================================================== */

function abrirJanela(janela) {
  elementoAnterior = document.activeElement;     // lembra onde a pessoa estava
  janela.classList.add('aberta');
  janela.setAttribute('aria-hidden', 'false');
  document.body.classList.add('travado');        // impede a página de trás de rolar

  // Coloca o foco no botão X (ajuda quem usa teclado)
  const botaoFechar = janela.querySelector('.botao-fechar');
  if (botaoFechar) {
    botaoFechar.focus({ preventScroll: true });
  }
}

function fecharJanela(janela) {
  janela.classList.remove('aberta');
  janela.setAttribute('aria-hidden', 'true');

  // Só libera a rolagem se NÃO restar nenhuma janela aberta
  if (!document.querySelector('.fundo-janela.aberta')) {
    document.body.classList.remove('travado');
  }

  // Devolve o foco para onde estava
  if (elementoAnterior && elementoAnterior.focus) {
    elementoAnterior.focus({ preventScroll: true });
  }
}

// Fecha a janela ao clicar no fundo escuro ou em qualquer botão com "data-fechar"
const todasAsJanelas = [janelaDetalhes, janelaCarrinho];

todasAsJanelas.forEach(function (janela) {
  janela.addEventListener('click', function (evento) {
    const clicouNoFundo = evento.target === janela;
    const clicouEmFechar = evento.target.closest('[data-fechar]');

    if (clicouNoFundo || clicouEmFechar) {
      fecharJanela(janela);
    }
  });
});

// Teclado: Esc fecha a janela e Tab fica "preso" dentro dela
document.addEventListener('keydown', function (evento) {
  const janelaAberta = document.querySelector('.fundo-janela.aberta');
  if (!janelaAberta) {
    return;
  }

  if (evento.key === 'Escape') {
    fecharJanela(janelaAberta);
    return;
  }

  if (evento.key === 'Tab') {
    // Pega só os botões e campos que estão visíveis
    const todos = janelaAberta.querySelectorAll('button, input');
    const visiveis = [];
    todos.forEach(function (item) {
      if (item.offsetParent !== null) {
        visiveis.push(item);
      }
    });
    if (visiveis.length === 0) {
      return;
    }

    const primeiro = visiveis[0];
    const ultimo = visiveis[visiveis.length - 1];

    // Se está no último e aperta Tab, volta para o primeiro (e vice-versa)
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }
});


/* ==========================================================================
   9. JANELA DE DETALHES DA PIZZA
   ========================================================================== */

// Atualiza o número da quantidade e o texto do botão (ex.: "Adicionar · R$ 44,00")
function atualizarBotaoDetalhe() {
  detalheQuantidade.textContent = quantidadeDetalhe;
  const valor = pizzas[pizzaAberta].preco * quantidadeDetalhe;
  detalheAdicionar.textContent = 'Adicionar · ' + formatarPreco(valor);
}

// Preenche a janela com os dados da pizza escolhida e abre
function abrirDetalhes(posicao) {
  const pizza = pizzas[posicao];
  pizzaAberta = posicao;
  quantidadeDetalhe = 1;

  detalheFoto.src = pizza.imagem;
  detalheFoto.alt = pizza.nome;
  detalheTitulo.textContent = pizza.nome;
  detalheDescricao.textContent = pizza.descricao;

  // Uma etiqueta <span> para cada ingrediente
  let etiquetas = '';
  for (let i = 0; i < pizza.ingredientes.length; i++) {
    etiquetas += '<span>' + pizza.ingredientes[i] + '</span>';
  }
  detalheIngredientes.innerHTML = etiquetas;

  atualizarBotaoDetalhe();
  abrirJanela(janelaDetalhes);
}

// Cliques dentro da janela de detalhes
janelaDetalhes.addEventListener('click', function (evento) {

  // Botões - e + da quantidade (mínimo 1, máximo 20)
  const botaoQuantidade = evento.target.closest('[data-mudar-quantidade]');
  if (botaoQuantidade) {
    const mudanca = Number(botaoQuantidade.dataset.mudarQuantidade);
    quantidadeDetalhe = quantidadeDetalhe + mudanca;
    if (quantidadeDetalhe < 1) quantidadeDetalhe = 1;
    if (quantidadeDetalhe > 20) quantidadeDetalhe = 20;
    atualizarBotaoDetalhe();
    return;
  }

  // Botão "Adicionar"
  if (evento.target.closest('#detalhe-adicionar')) {
    adicionarAoCarrinho(pizzaAberta, quantidadeDetalhe);
    mostrarAviso(quantidadeDetalhe + 'x ' + pizzas[pizzaAberta].nome + ' no carrinho');
    fecharJanela(janelaDetalhes);
    voarAteCarrinho(detalheAdicionar);
  }
});


/* ==========================================================================
   10. JANELA DO CARRINHO
   ========================================================================== */

// Desenha a lista de pizzas do carrinho e o total
function desenharCarrinho() {
  const posicoes = Object.keys(carrinho);
  const estaVazio = posicoes.length === 0;

  // Mostra a mensagem de "vazio" OU o conteúdo do carrinho
  carrinhoVazio.hidden = !estaVazio;
  carrinhoConteudo.hidden = estaVazio;

  let html = '';
  for (let i = 0; i < posicoes.length; i++) {
    const posicao = posicoes[i];
    const pizza = pizzas[posicao];
    const quantidade = carrinho[posicao];

    html += `
      <div class="item-carrinho">
        <img src="${pizza.imagem}" alt="">
        <div>
          <b>${pizza.nome}</b>
          <small>${formatarPreco(pizza.preco * quantidade)}</small>
        </div>
        <div class="quantidade">
          <button type="button" data-posicao="${posicao}" data-mudanca="-1" aria-label="Diminuir ${pizza.nome}">&minus;</button>
          <output>${quantidade}</output>
          <button type="button" data-posicao="${posicao}" data-mudanca="1" aria-label="Aumentar ${pizza.nome}">+</button>
        </div>
      </div>
    `;
  }

  carrinhoLista.innerHTML = html;
  carrinhoTotal.textContent = formatarPreco(calcularTotal());
}

// Monta o texto do pedido (usado no WhatsApp, iFood e "copiar")
function montarResumoDoPedido() {
  const linhas = ['*Pedido - ' + NOME_DA_LOJA + '*', ''];

  for (const posicao in carrinho) {
    const pizza = pizzas[posicao];
    const quantidade = carrinho[posicao];
    linhas.push(quantidade + 'x ' + pizza.nome + ' - ' + formatarPreco(quantidade * pizza.preco));
  }

  linhas.push('');
  linhas.push('Total: ' + formatarPreco(calcularTotal()));

  const nome = campoNome.value.trim();
  const endereco = campoEndereco.value.trim();
  if (nome) {
    linhas.push('Nome: ' + nome);
  }
  if (endereco) {
    linhas.push('Endereço: ' + endereco);
  }

  return linhas.join('\n');
}

// Copia um texto para a área de transferência.
// "aoTerminar" recebe true (deu certo) ou false (não deu).
function copiarTexto(texto, aoTerminar) {
  // Plano B para navegadores antigos: cria um campo escondido e copia dele
  function copiarDoJeitoAntigo() {
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();

    let deuCerto = false;
    try {
      deuCerto = document.execCommand('copy');
    } catch (erro) {
      deuCerto = false;
    }
    campo.remove();
    aoTerminar(deuCerto);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(
      function () { aoTerminar(true); },
      copiarDoJeitoAntigo
    );
  } else {
    copiarDoJeitoAntigo();
  }
}

// Cliques dentro da janela do carrinho
janelaCarrinho.addEventListener('click', function (evento) {

  // Botões - e + de cada pizza da lista
  const botaoMudanca = evento.target.closest('[data-mudanca]');
  if (botaoMudanca) {
    adicionarAoCarrinho(Number(botaoMudanca.dataset.posicao), Number(botaoMudanca.dataset.mudanca));
    desenharCarrinho();
    return;
  }

  // Botões de finalizar (data-acao diz qual foi clicado)
  const botaoAcao = evento.target.closest('[data-acao]');
  if (!botaoAcao) {
    return;
  }
  const acao = botaoAcao.dataset.acao;

  if (acao === 'whatsapp') {
    // Abre o WhatsApp com a mensagem do pedido já escrita
    const link = 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(montarResumoDoPedido());
    window.open(link, '_blank', 'noopener');

  } else if (acao === 'ifood') {
    // O iFood não aceita pedido pronto, então abrimos o site e copiamos o resumo
    window.open(LINK_IFOOD, '_blank', 'noopener');
    copiarTexto(montarResumoDoPedido(), function (deuCerto) {
      mostrarAviso(deuCerto ? 'Resumo copiado. Cole no iFood.' : 'Abrindo o iFood');
    });

  } else if (acao === 'ligar') {
    window.location.href = 'tel:' + TELEFONE_LIGAR;

  } else if (acao === 'copiar') {
    copiarTexto(montarResumoDoPedido(), function (deuCerto) {
      mostrarAviso(deuCerto ? 'Resumo do pedido copiado' : 'Não foi possível copiar');
    });

  } else if (acao === 'esvaziar') {
    carrinho = {};
    contadorCarrinho.textContent = 0;
    desenharCarrinho();
    mostrarAviso('Carrinho esvaziado');
  }
});

// Clicar no botão amarelo do topo: desenha o carrinho e abre a janela
botaoCarrinho.addEventListener('click', function () {
  desenharCarrinho();
  abrirJanela(janelaCarrinho);
});


/* ==========================================================================
   11. CLIQUES NOS CARTÕES DO CARDÁPIO
   Um único "ouvinte" na grade cuida dos cliques de todos os cartões.
   ========================================================================== */
gradePizzas.addEventListener('click', function (evento) {
  const botaoPedir = evento.target.closest('.botao-pedir');
  const botaoFavorito = evento.target.closest('.botao-favorito');
  const cartao = evento.target.closest('.cartao-pizza');

  if (botaoPedir) {
    // ----- Botão "Pedir": coloca 1 pizza no carrinho -----
    const posicao = Number(botaoPedir.dataset.posicao);
    adicionarAoCarrinho(posicao, 1);
    voarAteCarrinho(botaoPedir);
    mostrarAviso(pizzas[posicao].nome + ' no carrinho');

    // Muda o texto para "Adicionado" por 1,4 segundo
    botaoPedir.textContent = 'Adicionado';
    botaoPedir.classList.add('adicionado');
    setTimeout(function () {
      botaoPedir.textContent = 'Pedir';
      botaoPedir.classList.remove('adicionado');
    }, 1400);

  } else if (botaoFavorito) {
    // ----- Coração: favorita / desfavorita -----
    const agoraEhFavorito = botaoFavorito.getAttribute('aria-pressed') !== 'true';
    botaoFavorito.setAttribute('aria-pressed', agoraEhFavorito ? 'true' : 'false');

    // Reinicia a animação de "pulo" do coração
    botaoFavorito.classList.remove('pulando');
    void botaoFavorito.offsetWidth;              // truque para reiniciar a animação
    if (agoraEhFavorito) {
      botaoFavorito.classList.add('pulando');
    }
    mostrarAviso(agoraEhFavorito ? 'Salvo nos favoritos' : 'Removido dos favoritos');

  } else if (cartao) {
    // ----- Clicou em qualquer outro lugar do cartão: abre os detalhes -----
    abrirDetalhes(Number(cartao.dataset.posicao));
  }
});


/* ==========================================================================
   12. EFEITOS
   ========================================================================== */

// ---------- Cartões que aparecem quando entram na tela ----------
function mostrarElemento(elemento) {
  elemento.classList.add('visivel');
}

function ativarAparecerAoRolar() {
  const elementos = document.querySelectorAll('.aparecer');

  // Sem suporte (ou "menos movimento"): mostra tudo de uma vez
  if (!('IntersectionObserver' in window) || semMovimento) {
    elementos.forEach(mostrarElemento);
    return;
  }

  // O "observador" avisa quando um elemento entra na tela
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        mostrarElemento(entrada.target);
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(function (elemento) {
    observador.observe(elemento);
  });

  // Segurança: depois de 2,2s mostra tudo, mesmo que o observador falhe
  setTimeout(function () {
    elementos.forEach(mostrarElemento);
  }, 2200);
}

// ---------- Pizza grande que se mexe com o mouse e com a rolagem ----------
let deslocamentoX = 0;       // movimento causado pelo mouse (horizontal)
let deslocamentoY = 0;       // movimento causado pelo mouse (vertical)
let deslocamentoRolagem = 0; // movimento causado pela rolagem

function moverPizzaDestaque() {
  const y = deslocamentoY + deslocamentoRolagem;
  pizzaDestaque.style.transform = 'translate3d(' + deslocamentoX + 'px,' + y + 'px,0)';
}

function ativarMovimentoDaPizza() {
  if (semMovimento) {
    return;
  }

  // Mouse se mexendo sobre o topo
  topoDoSite.addEventListener('pointermove', function (evento) {
    if (evento.pointerType === 'touch') {
      return;                                   // no celular não faz nada
    }
    deslocamentoX = -(evento.clientX / window.innerWidth - 0.5) * 18;
    deslocamentoY = -(evento.clientY / window.innerHeight - 0.5) * 12;
    moverPizzaDestaque();
  });

  // Rolagem da página
  window.addEventListener('scroll', function () {
    deslocamentoRolagem = Math.min(window.scrollY, 900) * 0.06;
    moverPizzaDestaque();
  }, { passive: true });
}

// Em "menos movimento" também paramos a onda que balança
function pararOndaSeNecessario() {
  if (semMovimento) {
    document.querySelectorAll('animate').forEach(function (animacao) {
      animacao.remove();
    });
  }
}


/* ==========================================================================
   13. MENU DE NAVEGAÇÃO (rolagem suave)
   Ao clicar num link do menu (ou num botão com data-ir-para), a página rola
   devagar até a seção. Enquanto a pessoa rola, o link da seção atual fica
   destacado e o tracinho amarelo desliza até ele.

   PARA CRIAR UM NOVO LINK NO MENU:
   1. No index.html, copie uma linha <a data-alvo="..."> do menu.
   2. Troque o texto e o data-alvo pelo id da sua nova seção.
   (Não precisa mexer aqui no script.)
   ========================================================================== */

let secaoAtual = 'inicio';     // id da seção em que a pessoa está
let travaDoMenu = 0;           // evita o destaque "pular" durante a rolagem suave

// Coloca o tracinho amarelo embaixo do link ativo
function posicionarIndicador(comAnimacao) {
  const linkAtivo = document.querySelector('.menu-navegacao a.ativo');
  if (!linkAtivo) {
    return;
  }

  // O link tem espaço dos lados (padding); o tracinho cobre só o texto
  const espacoLateral = parseFloat(getComputedStyle(linkAtivo).paddingLeft) || 0;
  indicador.style.left = (linkAtivo.offsetLeft + espacoLateral) + 'px';
  indicador.style.width = Math.max(8, linkAtivo.offsetWidth - espacoLateral * 2) + 'px';

  if (comAnimacao) {
    indicador.classList.add('pronto');
  }
}

// Marca um link como ativo (e tira a marca dos outros)
function marcarSecaoAtiva(id) {
  if (id === secaoAtual) {
    return;                                    // já está marcado
  }
  secaoAtual = id;

  linksDoMenu.forEach(function (link) {
    link.classList.toggle('ativo', link.dataset.alvo === id);
  });
  posicionarIndicador(true);
}

// Calcula até que altura da página precisamos rolar para chegar na seção
function calcularPosicaoDaSecao(id) {
  if (id === 'inicio') {
    return 0;
  }
  const elemento = document.getElementById(id);
  const margemDeCima = Math.max(36, window.innerHeight * 0.06);
  const posicao = elemento.getBoundingClientRect().top + window.scrollY - margemDeCima;
  return Math.max(0, posicao);
}

// Rola a página (devagar) até a seção
function irParaSecao(id) {
  travaDoMenu = Date.now() + 1100;             // por 1,1s o scroll não muda o destaque
  marcarSecaoAtiva(id);
  window.scrollTo({
    top: calcularPosicaoDaSecao(id),
    behavior: semMovimento ? 'auto' : 'smooth'
  });
}

// Enquanto a pessoa rola, descobre em qual seção ela está
function acompanharRolagem() {
  if (Date.now() < travaDoMenu) {
    return;
  }

  let idAtivo = 'inicio';
  linksDoMenu.forEach(function (link) {
    const elemento = document.getElementById(link.dataset.alvo);
    // Se o começo da seção já passou de 45% da altura da tela, ela é a atual
    if (elemento.getBoundingClientRect().top <= window.innerHeight * 0.45) {
      idAtivo = link.dataset.alvo;
    }
  });
  marcarSecaoAtiva(idAtivo);
}

function ativarMenu() {
  // Clique nos links do menu
  linksDoMenu.forEach(function (link) {
    link.addEventListener('click', function (evento) {
      evento.preventDefault();                 // não deixa o navegador "pular" de uma vez
      irParaSecao(link.dataset.alvo);
    });
  });

  // Clique em botões com data-ir-para (ex.: "Peça agora")
  document.querySelectorAll('[data-ir-para]').forEach(function (botao) {
    botao.addEventListener('click', function () {
      irParaSecao(botao.dataset.irPara);
    });
  });

  window.addEventListener('scroll', acompanharRolagem, { passive: true });
  window.addEventListener('resize', function () { posicionarIndicador(false); });

  posicionarIndicador(false);
  requestAnimationFrame(function () {
    indicador.classList.add('pronto');
  });

  // Quando a fonte termina de carregar, o tamanho dos links muda: reposiciona
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { posicionarIndicador(false); });
  }
}


/* ==========================================================================
   14. COMEÇANDO TUDO
   Quando o arquivo é lido, o HTML já está pronto (o script fica no final do
   body). Então é só chamar as funções na ordem certa.
   ========================================================================== */
desenharCardapio();            // cria os cartões
pararOndaSeNecessario();
ativarAparecerAoRolar();       // precisa vir DEPOIS de desenharCardapio
ativarMovimentoDaPizza();
ativarMenu();
