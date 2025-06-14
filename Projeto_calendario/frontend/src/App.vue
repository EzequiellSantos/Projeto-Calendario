<template>
  <router-view/>
</template>

<script>
import { solicitarPermissao } from "./firebase";

export default {
  mounted() {
    
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root{

  --color-main00:#f5f5f5;
  --color-main01:#cbe5e7;
  --color-main02:#9cced1;
  --color-main03:#497a96;
  --color-main04:#16415e;
  --color-main05:#dfebf3;

  --color-event00:#777783;
  --color-event01:#3d7f63;
  --color-event02:#d33873;
  --color-event03:#c4d338;
  --color-event04:#d33838;

}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  background-color: var(--color-main05);
}

button{
  border: none;
  outline: 0;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#message{
  position: fixed;
  display: block;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  padding: 10px;
  color: var(--color-main00);
  background: var(--color-main03);
  border-radius: 15px;
  z-index: 1004;
  animation: born 0.4s ease-in-out both;
}

@keyframes born {
  to{
    top: 20px;
  }
}

header{
  padding: 14px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

}

/* 540px para centralizar */
section#dataEscolhida{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--color-main04);
  width: 100%;
  margin-left: 170px;
  margin-top: 15px;
  font-size: clamp(0.875rem, 0.6125rem + 1.4vw, 1.75rem);;
}

.home-view{
  position: relative;
}

.background-card{
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-main04);;
  opacity: 0.4;
}

.card{
  position: fixed;
  bottom: 0;
  z-index: 1001;
  background-color: var(--color-main00);;
  width: 100vw;
  padding: 0 0 30px 0;
  border-radius: 40px 40px 0 0;
  opacity: 1;
  border: none;
  outline: none;
  user-select: none;
  overflow-y: scroll;

}

.header-card{
  position: sticky;
  top:0px;
  height: 100px;
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: var(--color-main00);
  padding: 10px;
  z-index: 1002;
}

.bar{
  position: absolute;
  top: 10px;
  right: 48vw;
  transform: translateX(50%) ;
  width: 40%;
  height: 14px;
  background-color: var(--color-main04);
  border-radius: 10px;
  z-index: 1003;
  cursor: move;
}
  
.bar:active{
  background-color: var(--color-main03);
}

.botao-fechar{
  position: absolute;
  top: 11px;
  left: 15px;
  background-color: var(--color-main04);
  color:#fff;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 37px;
  fill: var(--color-main01);
}

.botao-fechar:active, .botao-adicionar:active{
  scale: 0.9;
}

.botao-fechar:hover, .botao-adicionar:hover{
  cursor: pointer;
  background-color: var(--color-main03);
}

.botao-adicionar{
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--color-main04);
  color:#fff;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 37px;
  fill: var(--color-main01);
}

.header-card > h2{
  margin-top: 20px;
  margin-bottom: -25px;
  font-size: clamp(1.25rem, 1.1579rem + 0.4211vw, 1.5rem);
}

form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-block: 50px;
}

form input[type="text"]{
  background-color: var(--color-main00);
  border: none;
  outline: 0;
  max-width: 90%;
  margin: 10px 0;
  border-radius: 10px;
  padding: 10px;	
}

form input[type="number"]{
  background-color: var(--color-main00);
  border: none;
  outline: 0;
  max-width: 90%;
  margin: 10px 0;
  border-radius: 10px;
  padding: 10px;	
}

.input-container{
  background-color: var(--color-main02);
  font-weight: bold;
  max-width: 90%;
  min-width: 350px;
  margin: 10px 0;
  border-radius: 15px;
  padding: 10px;
}

.default{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.repeat{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#sempre{
  padding: 10px;
  height: 25px;
  width: 25px;
  border-radius: 10px;
}

.container-cores{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  user-select: none;
  cursor: pointer;
  margin: 0;
}

.selecionar-cor{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.input-submit{
  background-color: var(--color-main04);
  color: #fff;
  padding: 10px;
  font-size: 1.04em;
  margin-block: 20px;
  border-radius: 17px;
  user-select: none;
  cursor: pointer;
}

.input-submit:hover{
  background-color: var(--color-main03);
}

.input-submit:active{
  scale: 0.9;
}

footer{
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: var(--color-main03);
  color: #fff;
  padding: 3px 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8em;
  letter-spacing: 1px;
  z-index: 1002;
  cursor: default;
}


/* configurações para tablet */
@media (width >= 480px) {
  section#dataEscolhida{
    margin-left: 0;
  }
}

/* configurações para celular */
@media (width <= 480px) {

  header{
    margin-bottom: 20px;
  }

}

</style>
