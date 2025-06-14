<template>
  <div class="home-view">
    
    <div id="message" v-if="message">
      <p class="p-message">{{this.message}}</p>
    </div>

    <header>

      <section id="escolhaData" class="menu-suspenso" @mouseleave="controleMenuMes('ocultar'),controleMenuAno('ocultar')">

        <div id="mesEscolha" @click="controleMenuMes(this.exibirMenuMes)" class="lista-escolha">

          <ul class="lista-meses" >
            <li id="headerMes" class="header-lista">Mês</li>

            <div v-if="exibirMenuMes">
              <li class="mes" @click="procurarEventosMes(1, this.anoSelecionado)">Janeiro</li>
              <li class="mes" @click="procurarEventosMes(2, this.anoSelecionado)">Fevereiro</li>
              <li class="mes" @click="procurarEventosMes(3, this.anoSelecionado)">Março</li>
              <li class="mes" @click="procurarEventosMes(4, this.anoSelecionado)">Abril</li>
              <li class="mes" @click="procurarEventosMes(5, this.anoSelecionado)">Maio</li>
              <li class="mes" @click="procurarEventosMes(6, this.anoSelecionado)">Junho</li>
              <li class="mes" @click="procurarEventosMes(7, this.anoSelecionado)">Julho</li>
              <li class="mes" @click="procurarEventosMes(8, this.anoSelecionado)">Agosto</li>
              <li class="mes" @click="procurarEventosMes(9, this.anoSelecionado)">Setembro</li>
              <li class="mes" @click="procurarEventosMes(10, this.anoSelecionado)">Outubro</li>
              <li class="mes" @click="procurarEventosMes(11, this.anoSelecionado)">Novembro</li>
              <li class="mes" @click="procurarEventosMes(12, this.anoSelecionado)">Dezembro</li>
            </div>

          </ul>

        </div>

        <div id="anoEscolha" @click="controleMenuAno(this.exibirMenuAno)" class="lista-escolha">
          <!-- loop para gerar os próximos 3 anos -->
          <ul class="lista-anos">

            <li id="headerAno" class="header-lista">Ano</li>
            <div  v-if="exibirMenuAno">
              <li class="ano" v-for="numero in 3" :key="numero" :id="`${this.anoAtual + numero}`" @click="procurarEventosMes(this.mesSelecionado, (this.anoAtual - 1 ) + numero)">{{(this.anoAtual - 1 ) + numero}}</li>
            </div>

          </ul>

        </div>

      </section>

      <section id="dataEscolhida">

        <h1 style="margin-right: 10px;">{{this.mesSelecionadoString}}</h1>
        <h1>{{this.anoSelecionado}}</h1>

      </section>

    </header>

    <main>

      <section id="calendario">

        <!-- display grid de 7 colunas -->
        <div id="diasMes">
          <ul class="diasSemana">

            <!-- Primeira linha: Cabeçalho com os dias da semana -->
            <li class="dia-semana" v-for="(dia, index) in ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']" :key="'header-' + index">
              {{ dia }}
            </li>

            <!-- Segunda parte: Espaços vazios antes do primeiro dia do mês -->
            <li class="dia vazio" v-for="n in diasVazios" :key="'vazio-' + n"></li>

            <!-- Dias do mês -->
            <li class="dia" 
                v-for="numero in contagemDia" 
                :key="numero" 
                @click="procurarEventosDia(numero, mesSelecionado)">
              
              {{ numero }}
              <span class="indicador"
                v-if="eventosProcessados.datasIniciais.includes(numero) || eventosSempre.dias.includes(numero)">
              </span>
            </li>

          </ul>


          <div v-if="mostrarDia" class="s">

            <div class="background-card" @click="ocultarCard()"></div>

            <div class="card" :style="{height: cardAltura + 'px'}">

              <section class="header-card">

                <div class="bar" @mousedown="mudarAltura()" @touchstart="mudarAltura()"></div>
              
                <button class="botao-fechar" @click="ocultarCard()">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                  </svg>
                </button>

                <h2>Eventos no dia {{this.diaSelecionado}} de {{this.mesSelecionadoString}} de {{this.anoSelecionado}}</h2>

                <button class="botao-adicionar" @click="adicionarEvento()">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAASElEQVR4nGNgGFHg1NNnd2hqwemnz/+PWoAXnB4NoqEdRKefPLsCMoBi/OTZlYHxATHg9KgFhMDp0SAa+CB68uwyTS1gGJEAAIDBhAKVfQuZAAAAAElFTkSuQmCC" alt="plus-math">
                </button>

              </section>

              <section class="evento-card" v-for="(evento, index) in eventosProcessadosDia" :key="index" :style="{backgroundColor: evento.cor}">

                <h1>{{evento.descricao}}</h1>

                <section class="botoes">
                  <button v-if="evento.descricao != null" @click="atualizarEvento($event, evento.id)" class="botao-editar">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill-opacity="0" fill="#dddddd" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path></g></g>
                    </svg>
                  </button>

                  <button v-if="evento.descricao != null" @click="deletarEvento($event, evento.id)" class="botao-excluir">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                      <g fill-opacity="0" fill="#dddddd" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-3.50831,0 -6.4296,2.62143 -6.91992,6h-6.8418c-0.08516,-0.01457 -0.17142,-0.02176 -0.25781,-0.02148c-0.07465,0.00161 -0.14908,0.00879 -0.22266,0.02148h-3.25781c-0.54095,-0.00765 -1.04412,0.27656 -1.31683,0.74381c-0.27271,0.46725 -0.27271,1.04514 0,1.51238c0.27271,0.46725 0.77588,0.75146 1.31683,0.74381h2.13867l2.51758,26.0293c0.27108,2.80663 2.65553,4.9707 5.47461,4.9707h14.73633c2.81922,0 5.20364,-2.16383 5.47461,-4.9707l2.51953,-26.0293h2.13867c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381h-3.25586c-0.15912,-0.02581 -0.32135,-0.02581 -0.48047,0h-6.84375c-0.49032,-3.37857 -3.41161,-6 -6.91992,-6zM24,7c1.87916,0 3.42077,1.26816 3.86133,3h-7.72266c0.44056,-1.73184 1.98217,-3 3.86133,-3zM11.65039,13h24.69727l-2.49219,25.74023c-0.12503,1.29513 -1.18751,2.25977 -2.48828,2.25977h-14.73633c-1.29892,0 -2.36336,-0.96639 -2.48828,-2.25977zM20.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852zM27.47656,17.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v15c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-15c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852z"></path></g></g>
                      </svg>
                  </button>

                </section>

              </section>

              <div class="sem-eventos-container" v-if="eventosProcessadosDia.length == 0">
                <p>Não há eventos para esse dia :/</p> <button @click="adicionarEvento()"> Crie um evento!</button>
              </div>

            </div>

          </div>

          <!-- formulario de resgistro e edição de evento -->
          <div v-if="mostrarFormulario" class="formulario">

            <button class="botao-fechar" @click="ocultarFormulario()">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </button>

            <form enctype="multipart/form-data" @submit="isRegister == true ? registrarEvento($event) : registrarEvento($event)">

              <input type="hidden" name="id" id="id" v-model="id">
            
              <div class="input-container default">
                <label for="descricao">Descrição do evento:</label>
                <input type="text" name="descricao" id="descricao" v-model="descricao" placeholder="Descrição do evento" required>
              </div>

              <div class="input-container default" v-if="sempre == false">
                <label for="quant">Por quantos anos se repete?</label>
                <input type="number" name="quant" id="quant" v-model="quant" min="0" placeholder="Quantidade de anos" required>
              </div>

              <input type="hidden" name="data" id="data" v-model="data">
              <input type="hidden" name="ultimaData" id="ultimaData" v-model="ultima_data">

              <div class="input-container repeat">
                <label for="sempre">Evento sempre se repete?</label>
                <input type="checkbox" name="sempre" id="sempre" v-model="sempre">
              </div>

              <div class="input-container default">
                
                <label for="cores">Selecione uma Cor:</label>
                <div id="cores" class="container-cores">

                  <div  id="color01" class="selecionar-cor" @click="selecionarCor('#777783', 'color01')" style="background-color:#777783;"></div>
                  <div id="color02" class="selecionar-cor" @click="selecionarCor('#3d7f63', 'color02')" style="background-color:#3d7f63;"></div>
                  <div id="color03" class="selecionar-cor" @click="selecionarCor('#d33873', 'color03')" style="background-color:#d33873;"></div>
                  <div id="color04" class="selecionar-cor" @click="selecionarCor('#c4d338', 'color04')" style="background-color:#c4d338;"></div>
                  <div id="color05" class="selecionar-cor" @click="selecionarCor('#d33838', 'color05')" style="background-color:#d33838;"></div>

                </div>

                <input type="hidden" name="cor" id="cor" v-model="cor" required>

              </div>

              <button class="input-submit" type="submit">{{isRegister == true ? "Cadastrar" : "Atualizar"}}</button>

            </form>

          </div>

        </div>

      </section>

    </main>

    <footer>

      <p>Ciências da Computação 2024.2</p>

    </footer>

  </div>
</template>

<script>

import {BASE_URL} from '@/config'

export default {
  name: 'HomeView',
  components: {
    
  },
  data(){
    return {

      //variaveis de ambiente
      apiURL: BASE_URL,

      //variáveis de data:
      exibirMenuMes: false,
      exibirMenuAno: false,
      anoAtual: 2025,
      mesAtual: 3,
      diaAtual: 0,
      contagemDia: 0,
      anoSelecionado: 0,
      mesSelecionado:0,
      mesSelecionadoString: null,
      diaSelecionado: 0,

      //variaveis para controle de eventos
      eventosSempre:{
        dias:[]
      },
      faltandoUmMes: [],
      faltandoUmdia: [],
      eventosProcessadosDia: [],
      eventosProcessados: {  
        ids: [],
        descricoes: [],      
        datasIniciais: [],
        datasFinais: [],
        sempre:[],
        cores:[]
      },
      

      //variáveis de formulário
      id: null,
      descricao: null,
      data: null,
      ultima_data: null,
      sempre: true,
      cor: null,
      isRegister: true,
      quant: 0,
      message: null,

      // variaveis de controle de exibição:
      mostrarFormulario: false,
      mostrarDia: false,
      estaRedimencionando: false,
      cardAltura: 400,
      posicaoY: 0,
      diasDoMes: [],
      diasVazios: 0, // aqui mudou de array para quantidade
      eventosProcessados: { datasIniciais: [] }, // sua estrutura original
      eventosSempre: { dias: [] }

    }
  },
  created(){

    this.pedirPermissao();
    //coletar data atual
    var data = new Date()
    this.anoAtual = data.getFullYear()
    this.mesAtual = data.getMonth() + 1
    this.diaAtual = data.getDate()
    this.contagemDia = data.getDay()
    this.anoSelecionado = this.anoAtual
    this.mesSelecionado = this.mesAtual
    this.mesSelecionadoString = this.mesString(this.mesSelecionado)
    this.diaSelecionado = this.diaAtual
    this.contagemDia = new Date(this.anoAtual, this.mesSelecionado, 0).getDate()
    this.procurarEventosMes(this.mesAtual, this.anoAtual)
    this.verificarEventosProximos()
  },
  mounted(){
    this.montarCalendario();
  },
  methods:{

    montarCalendario() {
      const primeiroDia = new Date(this.anoSelecionado, this.mesSelecionado - 1, 1);
      const ultimoDia = new Date(this.anoSelecionado, this.mesSelecionado, 0);
      const totalDias = ultimoDia.getDate();
      const diaSemanaPrimeiro = primeiroDia.getDay(); // 0 (domingo) até 6 (sábado)

      this.diasVazios = diaSemanaPrimeiro;
      this.contagemDia = Array.from({ length: totalDias }, (_, i) => i + 1);
    },

    pedirPermissao() {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Permissão concedida!");
          } else {
            console.log("Permissão negada.");
          }
        });
      } else {
        console.log("Notificações não são suportadas neste navegador.");
      }
    },

    enviarNotificacao(header, body) {
      if (Notification.permission === "granted") {
        new Notification(`${header}`, {
          body: `${body}`,
          icon: "https://img.icons8.com/lollipop/48/calendar.png"
        });
      }
    },

    selecionarCor(cor, id){

      let classe = document.querySelectorAll('.selecionar-cor')
      classe.forEach(element => {
        element.style.border = "none"
      });
      let elemento = document.getElementById(id)
      elemento.style.border = "2px solid #000"
      this.cor = cor

    },

    mudarAltura(){

      this.estaRedimencionando = true
      this.posicaoY = event.clientY
      document.addEventListener("mousemove", this.mudarAlturaCard )
      document.addEventListener("mouseup", this.pararMudancaCard)

      document.addEventListener("touchmove", this.mudarAlturaCard )
      document.addEventListener("touchend", this.pararMudancaCard)

    },

    mudarAlturaCard(evento) {

      if (!this.estaRedimencionando) return;

      let padraoY = evento.type === "touchmove" 
        ? evento.touches[0].clientY
        
        : evento.clientY;
        
      let diferenca = this.posicaoY - padraoY;
      
      const alturaAtual = Number(this.cardAltura) || 400;

      this.cardAltura = Math.max(400, Math.min(600, alturaAtual + diferenca));

      this.posicaoY = padraoY;

    },

    pararMudancaCard(){
      this.estaRedimencionando = false
      document.removeEventListener("mousemove", this.mudarAlturaCard);
      document.removeEventListener("mouseup", this.pararMudancaCard);
      document.removeEventListener("touchmove", this.mudarAlturaCard);
      document.removeEventListener("touchend", this.pararMudancaCard);
    },

    controleMenuMes(controle){
      if(this.exibirMenuMes == true){
        this.exibirMenuMes = false  
      } else{
        this.exibirMenuMes = true
      }

      if(controle == 'ocultar'){
        this.exibirMenuMes = false
      }
    },

    controleMenuAno(controle){

      if(this.exibirMenuAno == true){
        this.exibirMenuAno = false  
      } else{
        this.exibirMenuAno = true
      }

      if(controle == 'ocultar'){
        this.exibirMenuAno = false
      }
      
    },

    adicionarEvento(){
      this.mostrarDia = false
      this.mostrarFormulario = true
      this.isRegister = true
      this.limparFomulario()
    },

    ocultarFormulario(){
      this.mostrarFormulario = false
      this.limparFomulario()
      this.limparFomulario()
      this.procurarEventosDia(this.diaSelecionado, this.mesSelecionado)
    }, 


    //procurar eventos por mes com base na escolha do usuário
    async procurarEventosMes(mes, ano) {
      this.exibirMenuAno = false;
      this.exibirMenuMes = false;
      this.limparEventos();

      // Buscar eventos mensais
      await fetch(`${this.apiURL}/eventos/mensal?ano=${ano}&mes=${mes}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.processarEventos(data, "mes");
        });

      // Buscar eventos "sempre" para o mês
      await fetch(`${this.apiURL}/eventos/sempre?mes=${mes}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            let day = new Date(data[i].data).getUTCDate();
            this.eventosSempre.dias.push(day);
          }
        });

      this.contagemDia = new Date(ano, mes, 0).getDate();
      this.anoSelecionado = ano;
      this.mesSelecionado = mes;
      this.mesSelecionadoString = this.mesString(mes);
      this.montarCalendario();
    },

    async registrarEvento(e) {
      e.preventDefault();

      const dataFormatada = (ano, mes, dia) => {
        return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
      };

      const dataEvento = {
        descricao: this.descricao,
        data: dataFormatada(this.anoSelecionado, this.mesSelecionado, this.diaSelecionado),
        ultima_data: dataFormatada(this.anoSelecionado + this.quant, this.mesSelecionado, this.diaSelecionado),
        sempre: this.sempre,
        cor: this.cor
      };

      try {
        let response;

        if (this.isRegister) {
          // Cadastro (POST)
          response = await fetch(`${this.apiURL}/cadastro`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataEvento)
          });
        } else {
          // Atualização (PUT)
          response = await fetch(`${this.apiURL}/update/${this.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataEvento)
          });
        }

        const result = await response.json();

        this.message = result.message;

        setTimeout(() => {
          this.message = null;
          this.procurarEventosDia(this.diaSelecionado, this.mesSelecionado);
          this.mostrarFormulario = false;
          this.mostrarDia = true;
          this.limparFomulario();
        }, 1200);

      } catch (err) {
        console.error("Erro ao registrar evento:", err);
        this.enviarNotificacao("Erro", "Não foi possível registrar o evento");
      }

    },

    async atualizarEvento(e, id){
      
      e.preventDefault()
      this.limparFomulario()
      this.mostrarFormulario = true
      this.mostrarDia = false
      this.isRegister = false

      await fetch(`${this.apiURL}/unicoevento/${id}/`, {
        method:"GET",
        headers: {
          "Content-type":"application/json"
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.message){
          this.message = data.message
        }else {

          this.id = id
          this.descricao = data.descricao
          this.data = data.data 
          this.ultima_data = data.ultima_data
          this.sempre = data.sempre
          this.cor = data.cor

          switch (data.cor) {
            case '#777783':
                this.selecionarCor('#777783', 'color01')
                break
            case '#3d7f63':
                this.selecionarCor('#3d7f63', 'color02')
                break;
            case '#d33873':
                this.selecionarCor('#d33873', 'color03')
                break
            case '#c4d338':
                  this.selecionarCor('#c4d338', 'color04')
            case '#d33838':
                this.selecionarCor('#d33838', 'color05')
                break;
          }

        }

        setTimeout(() => {
          this.message = null
        }, 1500);

      })

    },

    async deletarEvento(e, id){
      this.limparFomulario()
      this.mostrarFormulario = true
      this.mostrarDia = false
      this.isRegister = false

      await fetch(`${this.apiURL}/unicoevento/${id}/`, {
        method:"GET",
        headers: {
          "Content-type":"application/json"
        }
      })
      .then(resp => resp.json())
      .then(data => {
        if(data.message){
          this.message = data.message
        }else {

          this.id = id
          this.descricao = data.descricao
          this.data = data.data 
          this.ultima_data = data.ultima_data
          this.sempre = data.sempre
          this.cor = data.cor

          switch (data.cor) {
            case '#777783':
                this.selecionarCor('#777783', 'color01')
                break
            case '#3d7f63':
                this.selecionarCor('#3d7f63', 'color02')
                break;
            case '#d33873':
                this.selecionarCor('#d33873', 'color03')
                break
            case '#c4d338':
                  this.selecionarCor('#c4d338', 'color04')
            case '#d33838':
                this.selecionarCor('#d33838', 'color05')
                break;
          }

        }

        setTimeout(() => {
          this.message = null
        }, 1500);

      })

    },

    async deletarEvento(e, id){
      e.preventDefault()
      await fetch(`${this.apiURL}/delete/${id}`, {
        method:"DELETE",
        headers:{
          "Content-type":"application/json"
        }
      })
      .then(resp => resp.json)
      .then(data => {
        this.procurarEventosDia(this.diaSelecionado, this.mesSelecionado)
      })
      
      await fetch(`${this.apiURL}/delete/${id}/`, {
        method:"DELETE",
        headers:{
          "Content-type":"application/json"
        }
      })
      .then(resp => resp.json)
      .then(data => {
        this.procurarEventosDia(this.diaSelecionado, this.mesSelecionado)
      })
      
    },

    ocultarCard(){

      this.mostrarDia = false
      this.limparEventos()
      this.procurarEventosMes(this.mesSelecionado, this.anoSelecionado)

    },

    //procurar eventos por dia com base na escolha do usuário
    async procurarEventosDia(dia, mes) {
      this.diaSelecionado = dia;
      this.mesSelecionado = mes;
      this.mostrarDia = true;
      this.limparEventos();

      // Buscar eventos por dia
      await fetch(`${this.apiURL}/eventos?mes=${mes}&dia=${dia}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.processarEventos(data, "dia");
        });
    },

    // coleta o numero do mes e retorna o nome do mes por extenso
    mesString(mesNumero){
        switch (mesNumero) {
        case 1:
          return "Janeiro"
        case 2:
          return "Fevereiro"
        case 3:
          return "Março"
        case 4:
          return "Abril" 
        case 5:
          return "Maio"
        case 6:
          return "Junho"
        case 7:
          return "Julho" 
        case 8:
          return "Agosto"
        case 9:
          return "Setembro"
        case 10:
          return "Outubro"
        case 11:
          return "Novembro"  
        case 12:
          return "Dezembro"
      }
    },

    limparFomulario(){
      this.id = null,
      this.descricao = null,
      this.data = null,
      this.ultima_data = null,
      this.sempre = true,
      this.cor = null,
      this.isRegister = true,
      this.quant = 0,
      this.message = null
    },

    limparEventos(){
      this.eventosProcessadosDia = []

      this.eventosProcessados.ids = [],
      this.eventosProcessados.descricoes = [],      
      this.eventosProcessados.datasIniciais = [],
      this.eventosProcessados.datasFinais = [],
      this.eventosProcessados.sempre = [],
      this.eventosProcessados.cores = []

      this.eventosSempre.dias = []

    },

    processarEventos(data, metodo){

      let day = ""
      let month = ""
      let ano = ""
      let anoBase = ""

      for (let i = 0; i < data.length; i++) {
          
        let eventoModel = {
          id: null,
          descricao:null,
          data:null,
          ultima_data:null,
          sempre:false,
          cor:null
        }
         
        if(metodo == "mes"){
          if(data[i].sempre == true){

            day = new Date(data[i].data)
            day = day.getUTCDate()

            this.eventosProcessados.datasIniciais.push(day)
            this.eventosProcessados.ids.push(data[i]._id)
            this.eventosProcessados.descricoes.push(data[i].descricao)
            this.eventosProcessados.datasFinais.push(data[i].ultima_data)
            this.eventosProcessados.sempre.push(data[i].sempre)
            this.eventosProcessados.cores.push(data[i].cor)


          } else {

            anoBase = new Date(data[i].data)
            anoBase = anoBase.getFullYear()
            ano = new Date(data[i].ultima_data)
            ano = ano.getFullYear()

            

            if(this.anoSelecionado <= ano && this.anoSelecionado >= anoBase){
              day = new Date(data[i].data)
              day = day.getUTCDate()
              this.eventosProcessados.datasIniciais.push(day)
              this.eventosProcessados.ids.push(data[i]._id)
              this.eventosProcessados.descricoes.push(data[i].descricao)
              this.eventosProcessados.datasFinais.push(data[i].ultima_data)
              this.eventosProcessados.sempre.push(data[i].sempre)
              this.eventosProcessados.cores.push(data[i].cor)
            } else {
              this.eventosProcessados.datasIniciais.push(null)
              this.eventosProcessados.ids.push(null)
              this.eventosProcessados.descricoes.push(null)
              this.eventosProcessados.datasFinais.push(null)
              this.eventosProcessados.sempre.push(null)
              this.eventosProcessados.cores.push(null)

            }

          }


        } else {

          if(data[i].sempre){

            day = new Date(data[i].data)
            day = day.getUTCDate()

            eventoModel.data = day
            eventoModel.id = data[i]._id
            eventoModel.descricao = data[i].descricao
            eventoModel.ultima_data = data[i].ultima_data
            eventoModel.sempre = data[i].sempre
            eventoModel.cor = data[i].cor
            this.eventosProcessadosDia.push(eventoModel)

          } else {

            anoBase = new Date(data[i].data)
            anoBase = anoBase.getFullYear()
            ano = new Date(data[i].ultima_data)
            ano = ano.getFullYear()

            if(this.anoSelecionado <= ano && this.anoSelecionado >= anoBase){
              day = new Date(data[i].data)
              day = day.getUTCDate()
              eventoModel.data = day
              eventoModel.id = data[i]._id
              eventoModel.descricao =  data[i].descricao
              eventoModel.ultima_data =  data[i].ultima_data
              eventoModel.sempre = data[i].sempre
              eventoModel.cor =  data[i].cor
              this.eventosProcessadosDia.push(eventoModel)

            } else {

              eventoModel.id = null
              eventoModel.descricao = null
              eventoModel.data = null
              eventoModel.ultima_data = null
              eventoModel.sempre = false
              eventoModel.cor = null
              this.eventosProcessadosDia.push(eventoModel)

            }
          
          }

        }
        
      }

    },

    async verificarEventosProximos() {
      try {
        const hoje = new Date();
        const dataFutura = new Date();
        dataFutura.setDate(hoje.getDate() + 30);
        
        // Formata datas para YYYY-MM-DD
        const formatarData = (date) => date.toISOString().split('T')[0];
        
        const response = await fetch(`${this.apiURL}/eventos/proximos/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json"
          }
        });
        
        const eventos = await response.json();
        
        if (eventos.length > 0) {
          eventos.forEach(evento => {
            const diasRestantes = Math.floor(
              (new Date(evento.ultima_data) - hoje) / (1000 * 60 * 60 * 24)
            );
            
            this.enviarNotificacao(
              evento.descricao, 
              `Evento em ${diasRestantes + 1} dias!`
            );
          });
        }
        
      } catch (err) {
        console.error("Erro ao verificar eventos:", err);
        // Opcional: enviar notificação de erro
        this.enviarNotificacao("Erro", "Não foi possível verificar eventos futuros");
      }
    }
  }
}
</script>
<style scoped>

.menu-suspenso{
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: row;
  width: 30%;
  user-select: none;
  cursor: pointer;
}

.header-lista{
  background-color: var(--color-main04);
  color: var(--color-main00);
  font-weight: bold;
  display: block;
  padding: 10px 7px;
  border-radius: 10px 10px 0 0;
}

#headerMes{
  width: 83px;
}

#headerAno{
  width: 55px;
  padding: 10px 8px;
}

#headerMes:active, #headerAno:active{
  transform:scale(1.09);
}

.lista-escolha{
  position: absolute;
  margin: 0 10px 0 10px;
  padding: 0;
  background-color: var(--color-main02);
}

.lista-escolha ul{
  list-style-type: none;
  background-color: var(--color-main03);
}

.lista-anos{
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 87px;
  border-radius: 10px;  
  margin-top: 10px;
  background-color: var(--color-main03);
}

.lista-anos li.ano{
  padding: 5px 5px;
}

.lista-meses{
  overflow: hidden;
  position: absolute;
  top: 0px;
  border-radius: 10px;  
  margin-top: 10px;
  background-color: var(--color-main03);
}

.lista-meses li.mes{
  display: block;
  padding: 6px 5px;
} 

.dia{
  cursor: pointer;
  user-select: none ;
}

.dia:hover{
  box-shadow: 
    0em 0em 0.7em #0000002d,
    0em 0em 0.7em #13131371 inset;
  ;
}

.dia:active{
  scale: 0.95;
}

.dias-semana {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
  margin: 0 auto;
  max-width: 500px;
}

.dia-mes {
  padding: 10px 0;
  background-color: var(--color-main04);
  border-radius: 50%;
  color: var(--color-main00);
  cursor: pointer;
  font-weight: bold;
  font-size: clamp(0.875rem, 0.6125rem + 1.4vw, 1.75rem);
}

.dia.vazio {
  background: transparent !important;
  border: none;
  cursor: default;
}

.dia.vazio:hover {
  background: transparent !important;
  box-shadow: none;
}

.ano, .mes{
  color: #fff;
}

.ano:hover, .mes:hover{
  background-attachment: fixed;
  background-color: var(--color-main01);
  color: var(--color-main03);
}

.ano:active, .mes:active{
  background-color: var(--color-main00);
  transform: scale(1.06);
}

.diasSemana{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  list-style-type: none;
  max-width: 500px;
  border-radius: 10px;
  margin: auto;
}

.diasSemana .dia{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 12vw;
  width: 12vw;
  max-height: 60px;
  max-width: 60px;
  margin-block: 7px;
  background-color: var(--color-main04);
  border-radius: 50%;
  letter-spacing: 1px;
  color: var(--color-main00);
  font-weight: bold;
  font-size: clamp(0.875rem, 0.6125rem + 1.4vw, 1.75rem);
}

.indicador{
  position: absolute;
  height: 12vw;
  width: 12vw;
  max-height: 60px;
  max-width: 60px;
  border-radius: 50%;
  border: 3px solid rgb(0, 247, 255);
}


/* estilos do formulário */
.formulario{
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-main00);
  z-index: 1000;
}

.evento-card{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: var(--color-main00);
  width: 90%;
  max-width: 500px;
  min-width: 330px;
  margin: auto;
  padding: 5px;
  margin-block: 10px;
  border-radius: 30px;
}

.botoes{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.botoes > button{
  outline: 0;
  border: none;
  padding: 3px 4px;
  margin-block: 3px;
  border-radius: 7px;
  cursor: pointer;
}

.botoes > button:hover{
  filter: saturate(0.9);
}

.botoes > button:active{
  scale: 0.9;
}

.botao-editar{
  background-color: rgb(47, 196, 255);
  border-radius: 17px;
}

.botao-excluir{
  background-color: rgb(255, 83, 83);
  border-radius: 17px;
}

.sem-eventos-container{
  margin-top: 20px;
}

.sem-eventos-container > button{
  padding: 8px;
  margin-top: 4px;
  border-radius: 8px;
  background-color: var(--color-main02);
  user-select: none;
  cursor: pointer;
}

.calendario {
  width: 100%;
  max-width: 420px;
  margin: 32px auto;
  background: rgba(30, 32, 38, 0.95);
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
  padding: 24px 18px 18px 18px;
  backdrop-filter: blur(2px);
}

.dias-semana, .dias-mes {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.dia-semana {
  padding: 10px 0;
  color: #a3a9b8;
  font-size: clamp(0.625rem, 0.4638rem + 0.7368vw, 1.0625rem);
  border-bottom: 1px solid #23263a;
  font-weight: bold;
  width: 90%;
  padding: 8px 8px;
  background: var(--color-main00);
  border-radius: 8px;
}

.dia-mes {
  padding: 14px 0;
  margin: 3px;
  background: rgba(44, 48, 60, 0.85);
  color: #e6eaf3;
  border: 1px solid #23263a;
  border-radius: 12px;
  font-size: 1.08em;
  transition: 
    background 0.18s,
    color 0.18s,
    box-shadow 0.18s;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(60,80,255,0.04);
}

.dia-mes:hover {
  background: linear-gradient(90deg, #3a3f5c 0%, #2e3347 100%);
  color: #7ee7ff;
  box-shadow: 0 2px 12px 0 rgba(126,231,255,0.10);
  border-color: #7ee7ff;
}

.dia-mes.vazio {
  background: transparent;
  border: none;
  box-shadow: none;
  cursor: default;
}
</style>
