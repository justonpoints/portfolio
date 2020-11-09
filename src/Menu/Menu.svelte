<script>
import {location} from 'svelte-spa-router'

let active = ""
let menu = "NAVIGATION HERE"
let hand = "right"
let current = $location;
$: $location,updateCurrent();

function updateCurrent(){
  current = $location;
}


function toggleActive(){
    if(active === "active"){
        active = ""
        menu = "MENU"
    }
    else{
        active = "active"
        menu="CLOSE"
    }
}

function changehand(){
  if(hand === "left"){
    hand = "right"
  }
  else{
    hand = "left"
  }
}

</script>

<div class="floating-btn {active} {hand}" on:click={toggleActive}>
    {menu}
</div>

<div class="circular-menu {active} {hand}">

  <menu class="items-wrapper">
    <a href="#/home" class:current="{current === '/home' || current === '/'}" class="menu-item" on:click={toggleActive}>Home</a>
    <a href="#/prototypes" class:current="{current === '/prototypes'}" class="menu-item" on:click={toggleActive}>Projects</a>
    <a href="#/styles" class:current="{current === '/styles'}" class="menu-item" on:click={toggleActive}>Style</a>
    <a href="#/grid" class:current="{current === '/grid'}" class="menu-item" on:click={toggleActive}>Grid</a>
    <a href="#/sizetester" class:current="{current === '/sizetester'}" class="menu-item" on:click={toggleActive}>Mobile Tester</a>
    <a href="#/skills" class:current="{current === '/skills'}" class="menu-item" on:click={toggleActive}>Skills</a>
    <div class="menu-item" on:click={changehand}>Switch {hand}</div>
    <div class="menu-item close" on:click={toggleActive}>Close</div>
  </menu>

</div>

<style>

.floating-btn {
  position: fixed;
  display: block;
  width: 25px;
  height: 33%;
  border-top-right-radius: 150px;
  border-bottom-right-radius: 150px;
  border-top-left-radius: unset;
  border-bottom-left-radius: unset;
  background-color:#325050;
  color:#FFF;
  text-align: center;
  cursor: pointer;
  font-size:18px;
  writing-mode: vertical-rl;
  z-index: 30;
  left:0px;
  right:unset;
  top:30%;
}

.floating-btn.active {
    display:none;
}



.circular-menu {
  position: fixed;
  top: 50%;
  left: 0px;
  z-index: 20;
}

.circular-menu.active:after {
  display: block;
  content: ' ';
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -2;
  background-color:#b45032;
  transform: scale3d(5.5, 5.5, 1);
  transition-timing-function: cubic-bezier(.68, 1.55, .265, 1);
  box-shadow: 2px 3px 10px #000;
}

.circular-menu .items-wrapper {
  padding: 0;
  margin: 0;
}

.circular-menu .menu-item {
  display: flex;
  position: absolute;
  left:0px;
  z-index: -1;
  display: none;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  text-align: center;
  background-color: hsla(0,0%,0%,.5);
  transition: transform .3s ease, background .2s ease;
  align-items:center;
  justify-content:center;
}

.circular-menu.active .menu-item {
    display:flex;
}

.circular-menu .menu-item:hover {
  background-color: hsla(0,0%,0%,.3);
}

.circular-menu.active .menu-item {
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.circular-menu.active .menu-item:nth-child(1) {
  transform: translate3d(0,-200px,0);
}

.circular-menu.active .menu-item:nth-child(2) {
  transform: translate3d(75px,-150px,0);
}

.circular-menu.active .menu-item:nth-child(3) {
  transform: translate3d(120px,-80px,0);
}

.circular-menu.active .menu-item:nth-child(4) {
  transform: translate3d(140px,0px,0);
}

.circular-menu.active .menu-item:nth-child(5) {
  transform: translate3d(120px,80px,0);
}

.circular-menu.active .menu-item:nth-child(6) {
  transform: translate3d(75px,150px,0);
}

.circular-menu.active .menu-item:nth-child(7) {
  transform: translate3d(0px,200px,0);
}

.circular-menu.active .menu-item.close {
  transform: translate3d(0px,0px,0);
}

/*lefthander*/
.floating-btn.left {
  writing-mode: vertical-rl;
  right:0px;
  left: unset;
  border-top-left-radius: 150px;
  border-bottom-left-radius: 150px;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
}

.circular-menu.active.left:after {
  top: 0;
  left: 0;
  z-index: -2;
  transform: scale3d(5.5, 5.5, 1);
  box-shadow: 2px 3px 10px #000;
}

.circular-menu.left {
  right: 0px;
  left:unset;
}

.circular-menu.left .menu-item {
  left:unset;
  right:0px;
}

.circular-menu.active.left .menu-item:nth-child(2) {
  transform: translate3d(-75px,-150px,0);
}

.circular-menu.active.left .menu-item:nth-child(3) {
  transform: translate3d(-120px,-80px,0);
}

.circular-menu.active.left .menu-item:nth-child(4) {
  transform: translate3d(-140px,0px,0);
}

.circular-menu.active.left .menu-item:nth-child(5) {
  transform: translate3d(-120px,80px,0);
}

.circular-menu.active.left .menu-item:nth-child(6) {
  transform: translate3d(-75px,150px,0);
}

.circular-menu.active.left .menu-item:nth-child(7) {
  transform: translate3d(0px,200px,0);
}

.current{
   background-color:#325050 !important;
}

</style>