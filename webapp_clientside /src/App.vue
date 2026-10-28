<template>
  <div class="app-shell">
    <NavBar />
    <main class="app-main">
      <router-view />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  name: 'App',
  components: { NavBar, SiteFooter }
}
</script>

<style>
/* Polices (si pas d'internet, Arial est utilisé à la place) */
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Nunito+Sans:wght@400;600;700&display=swap');

:root {
  /* Couleurs (tes verts + ton orange) */
  --forest: #1e3a2b;
  --forest-deep: #142a1f;
  --green: #2d6a4f;
  --leaf: #95d5b2;
  --mint: #e6f0e8;
  --meadow: #f3f7f1;
  --cream: #fdfbf7;
  --sand: #f3eee7;
  --orange: #d97706;
  --orange-dark: #b45309;
  --ink: #1c2421;
  --muted: #526058;
  --line: #e2ece9;

  --font-display: 'Bricolage Grotesque', 'Trebuchet MS', Arial, sans-serif;
  --font-body: 'Nunito Sans', Arial, sans-serif;

  /* Forme "feuille" : deux coins arrondis, deux presque droits */
  --leaf-radius: 30px 6px 30px 6px;
  --shadow: 0 10px 30px rgba(30, 58, 43, 0.1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--cream);
  line-height: 1.55;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.12;
  margin: 0;
}

p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

:focus-visible {
  outline: 3px solid var(--orange);
  outline-offset: 3px;
}

/* ---------- Boutons (utilisables partout) ---------- */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 22px;
  border: 2px solid transparent;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.btn-sm { padding: 8px 16px; font-size: 0.88rem; }
.btn-lg { padding: 15px 28px; font-size: 1rem; }

.btn-orange { background: var(--orange); color: #fff; }
.btn-orange:hover { background: var(--orange-dark); }

.btn-green { background: var(--green); color: #fff; }
.btn-green:hover { background: var(--forest); }

.btn-outline { border-color: var(--green); color: var(--green); background: transparent; }
.btn-outline:hover { background: var(--green); color: #fff; }

.btn-light { border-color: rgba(255, 255, 255, 0.55); color: #fff; background: transparent; }
.btn-light:hover { background: #fff; color: var(--forest); }

.btn:disabled { opacity: 0.45; cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>