<template>
  <header class="menu-haut">
    <div class="container conteneur-nav">
      <router-link to="/" class="mon-logo">🌿Happy<span>Zoo</span></router-link>

      <nav class="liens-nav" aria-label="Main navigation">
        <router-link to="/" class="nav-link">Home</router-link>

        <!-- Menu déroulant "Data" : s'ouvre au survol, un clic sur un choix change de page -->
        <div
          ref="dropdown"
          class="dropdown"
          @pointerenter="onEnter"
          @pointerleave="onLeave"
          @focusout="onFocusOut"
          @keydown.esc="open = false"
        >
          <button
            type="button"
            class="nav-link dropdown-toggle"
            :class="{ active: dataActive }"
            aria-haspopup="true"
            :aria-expanded="open"
            @click="onToggle"
          >
            Data <span class="chevron" :class="{ up: open }">▾</span>
          </button>

          <transition name="menu">
            <ul v-show="open" class="dropdown-menu">
              <li>
                <router-link to="/animals" class="dropdown-item">
                  <span class="item-icon">🦁</span>
                  <span class="item-text">
                    <strong>Animals</strong>
                    <small>{{ animalCount }} residents</small>
                  </span>
                </router-link>
              </li>
              <li>
                <router-link to="/zones" class="dropdown-item">
                  <span class="item-icon">🗺️</span>
                  <span class="item-text">
                    <strong>Zones</strong>
                    <small>{{ zoneCount }} habitats</small>
                  </span>
                </router-link>
              </li>
            </ul>
          </transition>
        </div>

        <router-link to="/#activites" class="nav-link" active-class="" exact-active-class="">Experiences</router-link>
        <router-link to="/#tarifs" class="nav-link" active-class="" exact-active-class="">Tickets</router-link>
      </nav>

      <div class="boutons-nav">
        <a href="#" class="bouton-moncompte" @click.prevent>My Account</a>
        <router-link to="/#tarifs" class="bouton-reserver" active-class="" exact-active-class="">Book Now</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import animals from '@/assets/ANIMAL.json'
import zones from '@/assets/ZONE.json'

export default {
  name: 'NavBar',

  data() {
    return {
      open: false,
      closeTimer: null,
      lastPointer: ''
    }
  },

  computed: {
    animalCount() {
      return animals.length
    },
    zoneCount() {
      return zones.length
    },
    // "Data" est surligné quand on est sur /animals ou /zones
    dataActive() {
      return ['/animals', '/zones'].includes(this.$route.path)
    }
  },

  watch: {
    // On referme le menu à chaque changement de page
    '$route'() {
      this.open = false
    }
  },

  mounted() {
    document.addEventListener('click', this.onDocumentClick)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
    clearTimeout(this.closeTimer)
  },

  methods: {
    onEnter(event) {
      this.lastPointer = event.pointerType
      if (event.pointerType === 'mouse') {
        clearTimeout(this.closeTimer)
        this.open = true
      }
    },
    onLeave(event) {
      if (event.pointerType === 'mouse') {
        // petit délai pour ne pas fermer si le curseur dévie un instant
        this.closeTimer = setTimeout(() => {
          this.open = false
        }, 150)
      }
    },
    onToggle() {
      // Souris : le survol l'a déjà ouvert, un clic ne doit pas le refermer
      if (this.lastPointer === 'mouse') {
        this.open = true
      } else {
        this.open = !this.open
      }
    },
    onFocusOut(event) {
      const next = event.relatedTarget
      if (next && !this.$refs.dropdown.contains(next)) {
        this.open = false
      }
    },
    onDocumentClick(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.open = false
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
}

.menu-haut {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
  border-bottom: 1px solid #e2ece9;
  padding: 18px 0;
  font-family: Arial, sans-serif;
}

.conteneur-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mon-logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e3a2b;
  text-decoration: none;
}

.mon-logo span {
  color: #d97706;
}

.liens-nav {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-link {
  color: #1c2421;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.nav-link:hover {
  color: #2d6a4f;
}

.nav-link.router-link-exact-active,
.nav-link.active {
  color: #2d6a4f;
  border-bottom-color: #d97706;
}

/* Le bouton "Data" doit ressembler aux autres liens */
.dropdown-toggle {
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  font-family: inherit;
  cursor: pointer;
}

.chevron {
  display: inline-block;
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.chevron.up {
  transform: rotate(180deg);
}

/* ---------- Menu déroulant ---------- */

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: #ffffff;
  border: 1px solid #e2ece9;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(30, 58, 43, 0.15);
}

/* zone invisible qui comble l'espace entre le bouton et le menu */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #1c2421;
  text-decoration: none;
  transition: background-color 0.15s;
}

.dropdown-item:hover,
.dropdown-item:focus-visible {
  background-color: #f3f7f1;
}

.dropdown-item.router-link-exact-active {
  background-color: #e6f0e8;
}

.item-icon {
  font-size: 1.4rem;
}

.item-text strong {
  display: block;
  color: #1e3a2b;
}

.item-text small {
  color: #68756d;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

/* ---------- Boutons à droite ---------- */

.boutons-nav {
  display: flex;
  gap: 10px;
}

.bouton-moncompte,
.bouton-reserver {
  display: inline-block;
  padding: 12px 22px;
  font-size: 0.95rem;
  font-weight: bold;
  border-radius: 6px;
  border: 2px solid transparent;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.bouton-moncompte {
  border-color: #2d6a4f;
  color: #2d6a4f;
}

.bouton-moncompte:hover {
  background-color: #2d6a4f;
  color: #ffffff;
}

.bouton-reserver {
  background-color: #d97706;
  color: #ffffff;
}

.bouton-reserver:hover {
  background-color: #b45309;
}

:focus-visible {
  outline: 3px solid #d97706;
  outline-offset: 2px;
}

@media (max-width: 900px) {
  .conteneur-nav {
    flex-direction: column;
    gap: 15px;
  }

  .liens-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 18px;
  }

  .dropdown-menu {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active,
  .chevron {
    transition: none;
  }
}
</style>