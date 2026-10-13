<script>
import zones from '@/assets/ZONE.json'
import animals from '@/assets/ANIMAL.json'
import { zoneEmoji, zoneBackground } from '@/utils/zoneStyle'
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'ZoneList',

  components: { PageHeader },

  data() {
    return {
      zones,
      animals
    }
  },

  methods: {
    zoneEmoji,
    zoneBackground,

    animalsOf(idZone) {
      return this.animals.filter(animal => animal.id_zone === idZone)
    },

    // Affiche 4 noms d'animaux maximum, puis "+N"
    previewOf(idZone) {
      return this.animalsOf(idZone).slice(0, 4)
    },

    extraCount(idZone) {
      return Math.max(this.animalsOf(idZone).length - 4, 0)
    }
  }
}
</script>

<template>
  <div class="zones-page">

    <PageHeader
      title="HappyZoo Zones"
      :lead="zones.length + ' habitats to explore, each home to its own animals.'"
      icon="🗺️"
    />

    <div class="container content">

      <div class="zone-list">

        <article
          v-for="zone in zones"
          :key="zone.id_zone"
          class="zone-card"
        >

          <!-- Panneau coloré -->
          <div class="zone-art" :style="{ background: zoneBackground(zone.id_zone) }">
            <span class="zone-emoji" aria-hidden="true">{{ zoneEmoji(zone.id_zone) }}</span>
          </div>

          <!-- Informations -->
          <div class="zone-info">

            <span class="zone-theme">{{ zone.theme_zone }}</span>
            <h2>{{ zone.name_zone }}</h2>
            <p class="description">{{ zone.description_zone }}</p>

            <div class="facts">
              <div class="fact">
                <small>Location</small>
                <strong>{{ zone.place_zone }}</strong>
              </div>
              <div class="fact">
                <small>Height</small>
                <strong>{{ zone.height_zone }} m</strong>
              </div>
              <div class="fact">
                <small>Animals</small>
                <strong>{{ animalsOf(zone.id_zone).length }}</strong>
              </div>
            </div>

            <div class="chips">
              <span
                v-for="animal in previewOf(zone.id_zone)"
                :key="animal.id_animal"
                class="chip"
              >
                {{ animal.species_animal }}
              </span>
              <span v-if="extraCount(zone.id_zone) > 0" class="chip chip-more">
                +{{ extraCount(zone.id_zone) }}
              </span>
            </div>

            <router-link
              :to="{ path: '/animals', query: { zone: zone.id_zone } }"
              class="see-animals"
            >
              See the animals →
            </router-link>

          </div>

        </article>

      </div>

    </div>
  </div>
</template>

<style scoped>
.zones-page {
  min-height: 100vh;
  padding-bottom: 60px;
  background: var(--meadow);
}

.content {
  padding-top: 44px;
}

.zone-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 30px;
}

.zone-card {
  display: grid;
  grid-template-columns: 170px 1fr;
  overflow: hidden;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s;
}

.zone-card:hover {
  box-shadow: 0 0 0 2px var(--green), var(--shadow);
}

.zone-art {
  display: grid;
  place-items: center;
}

.zone-emoji {
  font-size: 4.6rem;
  line-height: 1;
}

.zone-info {
  display: flex;
  flex-direction: column;
  padding: 24px 26px;
}

.zone-theme {
  align-self: flex-start;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--mint);
  color: var(--forest);
  font-size: 0.76rem;
  font-weight: 700;
}

.zone-info h2 {
  margin-top: 10px;
  color: var(--forest);
  font-size: 1.6rem;
}

.description {
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.95rem;
}

.facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 18px;
}

.fact {
  padding: 10px 8px;
  background: var(--meadow);
  border-radius: 14px 4px 14px 4px;
  text-align: center;
}

.fact small {
  display: block;
  color: var(--muted);
  font-size: 0.74rem;
}

.fact strong {
  color: var(--green);
  font-family: var(--font-display);
  font-size: 1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
}

.chip {
  padding: 3px 11px;
  border-radius: 999px;
  background: var(--sand);
  color: var(--forest);
  font-size: 0.8rem;
}

.chip-more {
  background: var(--forest);
  color: #fff;
  font-weight: 700;
}

.see-animals {
  align-self: flex-start;
  margin-top: auto;
  padding-top: 18px;
  color: var(--orange);
  font-weight: 700;
}

.see-animals:hover {
  color: var(--orange-dark);
  text-decoration: underline;
}

@media (max-width: 560px) {
  .zone-list {
    grid-template-columns: 1fr;
  }

  .zone-card {
    grid-template-columns: 1fr;
  }

  .zone-art {
    height: 120px;
  }
}
</style>