<template>
  <header class="topbar">
    <div class="container bar-inner">
      <router-link to="/" class="logo">🌿Happy<span>Zoo</span></router-link>

      <nav class="links" aria-label="Main navigation">
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

        <router-link to="/tickets" class="nav-link">Tickets</router-link>
      </nav>

      <div class="actions">
        <a href="#" class="btn btn-outline btn-sm" @click.prevent>My Account</a>
        <router-link to="/tickets" class="btn btn-orange btn-sm">Book Now</router-link>
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
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 14px 0;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid var(--line);
}

.bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--forest);
}

.logo span {
  color: var(--orange);
}

.links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  padding: 8px 14px;
  border: none;
  border-radius: 999px;
  background: none;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background: var(--meadow);
  color: var(--green);
}

.nav-link.router-link-exact-active,
.nav-link.active {
  background: var(--mint);
  color: var(--forest);
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
  min-width: 230px;
  margin: 0;
  padding: 8px;
  list-style: none;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px 6px 20px 6px;
  box-shadow: 0 14px 34px rgba(30, 58, 43, 0.16);
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
  border-radius: 12px;
  transition: background-color 0.15s;
}

.dropdown-item:hover,
.dropdown-item:focus-visible {
  background: var(--meadow);
}

.dropdown-item.router-link-exact-active {
  background: var(--mint);
}

.item-icon {
  font-size: 1.4rem;
}

.item-text strong {
  display: block;
  color: var(--forest);
}

.item-text small {
  color: var(--muted);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 960px) {
  .bar-inner {
    flex-direction: column;
    gap: 12px;
  }

  .links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .dropdown-menu {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>