<script>
import animals from '@/assets/ANIMAL.json'
import zones from '@/assets/ZONE.json'
import defaultAnimal from '@/assets/animals_images/default-animal.jpg'

export default {
  name: 'AnimalList',

  data() {
    return {
      animals: animals,
      zones: zones,
      defaultAnimal: defaultAnimal,
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
      try {
        return require(
          '@/assets/animals_images/' +
          animal.species_animal.replaceAll(' ', '_') +
          '.jpg'
        )
      } catch (error) {
        return this.defaultAnimal
      }
    },

    zoneName(idZone) {
      const zone = this.zones.find(z => z.id_zone === idZone)
      return zone ? zone.name_zone : ''
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

    <router-link to="/" class="back-link">← Back to home</router-link>

    <!-- Titre -->
    <div class="page-header">
      <h1>🦁 HappyZoo Animals</h1>
      <p>Discover all the amazing animals living in our zoo.</p>
    </div>

    <!-- Recherche et filtre -->
    <div class="toolbar">
      <input
        v-model="search"
        type="search"
        class="search-input"
        placeholder="Search an animal..."
        aria-label="Search an animal"
      >

      <select v-model="selectedZone" class="zone-select" aria-label="Filter by zone">
        <option value="">All zones</option>
        <option
          v-for="zone in zones"
          :key="zone.id_zone"
          :value="String(zone.id_zone)"
        >
          {{ zone.name_zone }}
        </option>
      </select>

      <button v-if="hasFilter" type="button" class="reset-button" @click="resetFilters">
        Reset
      </button>
    </div>

    <p class="result-count">
      {{ filteredAnimals.length }}
      {{ filteredAnimals.length === 1 ? 'animal' : 'animals' }} found
    </p>

    <!-- Liste des animaux -->
    <div v-if="filteredAnimals.length" class="animal-list">

      <div
        v-for="animal in filteredAnimals"
        :key="animal.id_animal"
        class="animal-card"
      >

        <!-- Image -->
        <div class="animal-image">
          <img
            :src="getAnimalImage(animal)"
            :alt="animal.species_animal"
          >
          <span class="zone-badge">{{ zoneName(animal.id_zone) }}</span>
        </div>

        <!-- Informations -->
        <div class="animal-info">

          <h2>{{ animal.species_animal }}</h2>

          <p class="description">
            {{ animal.description_animal }}
          </p>

          <div class="details">

            <div class="detail">
              <span class="icon">⚥</span>
              <div>
                <small>Gender</small>
                <strong>{{ animal.gender_animal }}</strong>
              </div>
            </div>

            <div class="detail">
              <span class="icon">🌍</span>
              <div>
                <small>Habitat</small>
                <strong>{{ animal.habitat_animal }}</strong>
              </div>
            </div>

            <div class="detail">
              <span class="icon">📏</span>
              <div>
                <small>Length</small>
                <strong>{{ animal.length_animal }} m</strong>
              </div>
            </div>

            <div class="detail">
              <span class="icon">📐</span>
              <div>
                <small>Height</small>
                <strong>{{ animal.height_animal }} m</strong>
              </div>
            </div>

            <div class="detail">
              <span class="icon">⚖️</span>
              <div>
                <small>Weight</small>
                <strong>{{ animal.weight_animal }} kg</strong>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- Aucun résultat -->
    <div v-else class="empty">
      <p>No animal matches your search.</p>
      <button type="button" class="back-button" @click="resetFilters">Reset filters</button>
    </div>

    <div class="page-footer">
      <router-link to="/" class="back-button">← Back to home</router-link>
      <router-link to="/zones" class="back-button back-button-alt">See the zones</router-link>
    </div>

  </div>
</template>

<style scoped>

.animals-page {
  min-height: 100vh;
  padding: 30px 8% 50px;
  background: #f3f7f1;
}

/* BACK LINK */

.back-link {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  background: white;
  color: #245c3a;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background-color 0.2s, color 0.2s;
}

.back-link:hover {
  background: #245c3a;
  color: white;
}

/* HEADER */

.page-header {
  text-align: center;
  margin: 10px 0 35px;
}

.page-header h1 {
  margin: 0;
  color: #245c3a;
  font-size: 42px;
  font-weight: 700;
}

.page-header p {
  margin-top: 12px;
  color: #68756d;
  font-size: 18px;
}

/* TOOLBAR */

.toolbar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.search-input,
.zone-select {
  padding: 12px 16px;
  border: 1px solid #d5e2d8;
  border-radius: 10px;
  background: white;
  color: #245c3a;
  font-size: 15px;
  font-family: inherit;
}

.search-input {
  width: 100%;
  max-width: 340px;
}

.zone-select {
  min-width: 200px;
  cursor: pointer;
}

.reset-button {
  padding: 12px 18px;
  border: 2px solid #d97706;
  border-radius: 10px;
  background: transparent;
  color: #d97706;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.reset-button:hover {
  background: #d97706;
  color: white;
}

.result-count {
  margin: 20px 0 30px;
  text-align: center;
  color: #68756d;
  font-size: 14px;
}

/* LIST */

.animal-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
}

/* CARD */

.animal-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.animal-card:hover {
  transform: translateY(-8px);

  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.15);
}

/* IMAGE */

.animal-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.animal-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  transition: transform 0.4s ease;
}

.animal-card:hover .animal-image img {
  transform: scale(1.08);
}

.zone-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  background: white;
  color: #245c3a;
  font-size: 12px;
  font-weight: bold;
}

/* INFORMATION */

.animal-info {
  padding: 25px;
}

.animal-info h2 {
  margin: 0 0 12px;

  color: #245c3a;

  font-size: 25px;
}

.description {
  color: #68756d;
  line-height: 1.6;
  min-height: 75px;
}

/* DETAILS */

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 12px;

  margin-top: 20px;
}

.detail {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 10px;

  background: #f3f7f1;

  border-radius: 10px;
}

.icon {
  font-size: 20px;
}

.detail small {
  display: block;

  color: #7b887f;

  font-size: 11px;
}

.detail strong {
  display: block;

  color: #245c3a;

  font-size: 14px;
}

/* EMPTY */

.empty {
  padding: 40px 0;
  text-align: center;
  color: #68756d;
  font-size: 18px;
}

/* BOTTOM BUTTONS */

.page-footer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 50px;
}

.back-button {
  padding: 12px 22px;
  border-radius: 6px;
  background: #2d6a4f;
  border: 2px solid #2d6a4f;
  color: white;
  font-weight: bold;
  font-size: 16px;
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.back-button:hover {
  background: #1b4332;
  border-color: #1b4332;
}

.back-button-alt {
  background: transparent;
  color: #2d6a4f;
}

.back-button-alt:hover {
  background: #2d6a4f;
  border-color: #2d6a4f;
  color: white;
}

:focus-visible {
  outline: 3px solid #d97706;
  outline-offset: 2px;
}

/* MOBILE */

@media (max-width: 600px) {

  .animals-page {
    padding: 20px 20px 40px;
  }

  .page-header h1 {
    font-size: 32px;
  }

  .animal-list {
    grid-template-columns: 1fr;
  }

  .details {
    grid-template-columns: 1fr;
  }

}

@media (prefers-reduced-motion: reduce) {
  .animal-card,
  .animal-image img,
  .back-link,
  .back-button {
    transition: none;
  }

  .animal-card:hover {
    transform: none;
  }

  .animal-card:hover .animal-image img {
    transform: none;
  }
}

</style>