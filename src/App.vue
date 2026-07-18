<template>
  <div id="app">
    <nav class="app-nav">
      <router-link to="/Hacking">Hacking</router-link>
      <router-link to="/Signaling">Signaling</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
  html,
  body {
    margin: 0;
    overflow: hidden;
    height: 100%;
  }

  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .app-nav {
    display: flex;
    gap: 16px;
    padding: 12px 16px;
    background: #111;
  }

  .app-nav a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
  }

  .app-nav a.router-link-active {
    text-decoration: underline;
  }
</style>

