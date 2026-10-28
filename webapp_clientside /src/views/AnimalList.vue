<script>
import animals from '@/assets/ANIMAL.json'
import zones from '@/assets/ZONE.json'
import { getAnimalImage } from '@/utils/animalImage'
import PageHeader from '@/components/PageHeader.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
  name: 'AnimalList',

  components: { PageHeader, ActionButtons },

  data() {
    return {
      animals: animals,
      zones: zones,
      search: ''
    }
  },

  computed: {
    // La zone choisie est stockée dans l'URL (/animals?zone=2),
    // ce qui permet d'arriver ici depuis la page des zones déjà filtré.
    selectedZone: {
      get() {
        return this.$route.query.zone ? String(this.$route.query.zone) : ''
      },
      set(value) {
        this.$router.replace({ query: value ? { zone: value } : {} })
      }
    },

    filteredAnimals() {
      const text = this.search.trim().toLowerCase()

      return this.animals.filter(animal => {
        const matchZone =
          !this.selectedZone || String(animal.id_zone) === this.selectedZone

        const matchSearch =
          !text ||
          animal.species_animal.toLowerCase().includes(text) ||
          animal.description_animal.toLowerCase().includes(text)

        return matchZone && matchSearch
      })
    },

    hasFilter() {
      return this.search.trim() !== '' || this.selectedZone !== ''
    }
  },

  methods: {
    getAnimalImage(animal) {
      return getAnimalImage(animal.species_animal)
    },

    zoneName(idZone) {
      const zone = this.zones.find(z => z.id_zone === idZone)
      return zone ? zone.name_zone : ''
    },

    formatWeight(kg) {
      if (kg < 1) return Math.round(kg * 1000) + ' g'
      return kg.toLocaleString('en-US') + ' kg'
    },

    resetFilters() {
      this.search = ''
      this.selectedZone = ''
    }
  }
}
</script>

<template>
  <div class="animals-page">

    <PageHeader
      title="HappyZoo Animals"
      lead="Discover all the amazing animals living in our zoo."
      icon="🦁"
    >
      <!-- Recherche et filtre, dans la bannière -->
      <div class="toolbar">
        <input
          v-model="search"
          type="search"
          class="field search-input"
          placeholder="Search an animal..."
          aria-label="Search an animal"
        >

        <select v-model="selectedZone" class="field zone-select" aria-label="Filter by zone">
          <option value="">All zones</option>
          <option
            v-for="zone in zones"
            :key="zone.id_zone"
            :value="String(zone.id_zone)"
          >
            {{ zone.name_zone }}
          </option>
        </select>

        <button v-if="hasFilter" type="button" class="btn btn-light btn-sm" @click="resetFilters">
          Reset
        </button>

        <!-- ADD : ouvre le formulaire vide -->
        <router-link to="/animals/new" class="btn btn-orange add-btn">+ New animal</router-link>
      </div>
    </PageHeader>

    <div class="container content">

      <p class="result-count">
        {{ filteredAnimals.length }}
        {{ filteredAnimals.length === 1 ? 'animal' : 'animals' }} found
      </p>

      <!-- Liste des animaux -->
      <div v-if="filteredAnimals.length" class="animal-list">

        <article
          v-for="animal in filteredAnimals"
          :key="animal.id_animal"
          class="animal-card"
        >

          <div class="animal-image">
            <img :src="getAnimalImage(animal)" :alt="animal.species_animal">
            <span class="zone-badge">{{ zoneName(animal.id_zone) }}</span>
          </div>

          <div class="animal-info">
            <h2>{{ animal.species_animal }}</h2>
            <p class="description">{{ animal.description_animal }}</p>

            <!-- Mesures -->
            <div class="measures">
              <div class="measure">
                <strong>{{ animal.length_animal }} m</strong>
                <small>Length</small>
              </div>
              <div class="measure">
                <strong>{{ animal.height_animal }} m</strong>
                <small>Height</small>
              </div>
              <div class="measure">
                <strong>{{ formatWeight(animal.weight_animal) }}</strong>
                <small>Weight</small>
              </div>
            </div>

            <div class="tags">
              <span class="tag">{{ animal.gender_animal }}</span>
              <span class="tag">{{ animal.habitat_animal }}</span>
            </div>

            <ActionButtons class="card-actions" base="/animals" :id="animal.id_animal" />
          </div>

        </article>

      </div>

      <!-- Aucun résultat -->
      <div v-else class="empty">
        <p>😕 No animal matches your search.</p>
        <button type="button" class="btn btn-green" @click="resetFilters">Reset filters</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.animals-page {
  background: var(--meadow);
  min-height: 100vh;
  padding-bottom: 60px;
}

/* Barre d'outils dans la bannière */

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.field {
  padding: 12px 18px;
  border: none;
  border-radius: 999px;
  background: #fff;
  color: var(--forest);
  font-family: var(--font-body);
  font-size: 0.98rem;
}

.search-input {
  width: 100%;
  max-width: 340px;
}

.add-btn {
  margin-left: auto;
}

.card-actions {
  margin-top: 18px;
}

.zone-select {
  min-width: 210px;
  cursor: pointer;
}

.content {
  padding-top: 32px;
}

.result-count {
  margin-bottom: 24px;
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 700;
}

/* Liste */

.animal-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 30px;
}

.animal-card {
  overflow: hidden;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s;
}

.animal-card:hover {
  box-shadow: 0 0 0 2px var(--green), var(--shadow);
}

.animal-image {
  position: relative;
  height: 210px;
  overflow: hidden;
}

.animal-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.animal-card:hover .animal-image img {
  transform: scale(1.05);
}

.zone-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 12px;
  border-radius: 999px;
  background: #fff;
  color: var(--forest);
  font-size: 0.78rem;
  font-weight: 700;
}

.animal-info {
  padding: 22px 24px 26px;
}

.animal-info h2 {
  color: var(--forest);
  font-size: 1.6rem;
}

.description {
  min-height: 52px;
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.95rem;
}

.measures {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 18px;
}

.measure {
  padding: 12px 8px;
  background: var(--meadow);
  border-radius: 14px 4px 14px 4px;
  text-align: center;
}

.measure strong {
  display: block;
  color: var(--green);
  font-family: var(--font-display);
  font-size: 1.05rem;
}

.measure small {
  color: var(--muted);
  font-size: 0.75rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tag {
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--mint);
  color: var(--forest);
  font-size: 0.82rem;
  font-weight: 700;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 60px 0;
  color: var(--muted);
  font-size: 1.15rem;
}

@media (max-width: 560px) {
  .animal-list {
    grid-template-columns: 1fr;
  }
}
</style>