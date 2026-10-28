<template>
  <div class="home">

    <!-- ========== BANNIÈRE ========== -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <span class="blob blob-1"></span>
        <span class="blob blob-2"></span>
      </div>

      <div class="container hero-grid">
        <div class="hero-text">
          <span class="badge">An unforgettable adventure</span>
          <h1>Explore wildlife closer to nature</h1>
          <p class="lead">
            Wander through {{ zones.length }} themed zones and meet
            {{ animals.length }} fascinating animals.
          </p>

          <div class="hero-actions">
            <router-link to="/tickets" class="btn btn-orange btn-lg">Get my tickets</router-link>
            <router-link to="/zones" class="btn btn-light btn-lg">Discover the zones</router-link>
          </div>
        </div>

        <!-- Petit billet "aujourd'hui" -->
        <aside class="today" aria-label="Today at HappyZoo">
          <div class="today-top">
            <small>Open today</small>
            <strong>09:30 – 18:30</strong>
            <span>Last entry at 17:00</span>
          </div>
          <div class="today-foot">
            <div>
              <small>Tickets from</small>
              <strong>{{ minPrice }}€</strong>
            </div>
            <router-link to="/tickets" class="btn btn-orange btn-sm">Book now</router-link>
          </div>
        </aside>
      </div>

      <!-- Les 10 habitats : un clic ouvre la liste des animaux de la zone -->
      <div class="container">
        <nav class="habitats" aria-label="Pick a habitat">
          <p class="habitats-title">Pick a habitat</p>
          <ul>
            <li v-for="zone in zones" :key="zone.id_zone">
              <router-link :to="{ path: '/animals', query: { zone: zone.id_zone } }" class="habitat">
                <span class="habitat-dot" :style="{ background: zoneBackground(zone.id_zone) }">
                  <img v-if="zoneImage(zone.name_zone)" :src="zoneImage(zone.name_zone)" :alt="zone.name_zone">
                </span>
                <span class="habitat-name">{{ zone.name_zone }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <!-- ========== ZONES MISES EN AVANT ========== -->
    <section class="section section-first">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Explore our thematic zones</h2>
            <p>Each zone is designed to respect the natural biotope of its residents.</p>
          </div>
          <router-link to="/zones" class="more">See all {{ zones.length }} zones →</router-link>
        </div>

        <div class="zone-grid">
          <article v-for="zone in featuredZones" :key="zone.id_zone" class="zcard">
            <div class="zcard-top" :style="{ background: zoneBackground(zone.id_zone) }">
              <img v-if="zoneImage(zone.name_zone)" :src="zoneImage(zone.name_zone)" :alt="zone.name_zone" class="zcard-img">
              <span class="chip">{{ zone.theme_zone }}</span>
            </div>
            <div class="zcard-body">
              <h3>{{ zone.name_zone }}</h3>
              <p>{{ zone.description_zone }}</p>
              <div class="zcard-meta">
                <span>{{ zone.place_zone }}</span>
                <span>{{ countAnimals(zone.id_zone) }} animals</span>
              </div>
              <router-link :to="{ path: '/animals', query: { zone: zone.id_zone } }" class="zcard-link">
                See the animals →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== RECORDS (calculés avec ANIMAL.json) ========== -->
    <section class="section records-section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>The big and the small</h2>
            <p>A few records among our {{ animals.length }} residents.</p>
          </div>
          <router-link to="/animals" class="more">Meet all the animals →</router-link>
        </div>

        <div class="records">
          <router-link
            v-for="record in records"
            :key="record.label"
            :to="{ path: '/animals', query: { zone: record.animal.id_zone } }"
            class="record"
          >
            <small>{{ record.label }}</small>
            <h3>{{ record.animal.species_animal }}</h3>
            <strong>{{ record.value }}</strong>
            <span class="record-zone">{{ zoneName(record.animal.id_zone) }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ========== PETIT BLOC KEEPER (HTML + CSS + un peu de JS) ========== -->
    <section class="section">
      <div class="container">
        <div class="keeper">
          <div class="keeper-text">
            <span class="badge badge-orange">Closer to the beasts</span>
            <h2>Become a Keeper for a Day</h2>
            <p>
              Take part in supervised feedings with our animal team and discover
              how our favourite species live and eat.
            </p>
            <!-- Le petit bout de JS : ce bouton affiche / cache la liste -->
            <button
              type="button"
              class="btn btn-light"
              :aria-expanded="showKeeper"
              @click="showKeeper = !showKeeper"
            >
              {{ showKeeper ? 'Hide details' : "What's included?" }}
            </button>

            <ul v-if="showKeeper" class="keeper-list">
              <li>Keeper outfit to keep</li>
              <li>Behind-the-scenes access</li>
              <li>Supervised feeding</li>
              <li>Souvenir photo</li>
            </ul>
          </div>

          <img v-if="keeperImage" :src="keeperImage" alt="A keeper feeding an animal" class="keeper-img">
        </div>
      </div>
    </section>

    <!-- ========== BILLETS ========== -->
    <section class="section tickets-section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Choose your ticket</h2>
            <p>Buy in advance to skip the line at the entrance.</p>
          </div>
          <router-link to="/tickets" class="more">Go to tickets →</router-link>
        </div>

        <div class="ticket-grid">
          <TicketStub v-for="ticket in tickets" :key="ticket.id" :ticket="ticket">
            <router-link to="/tickets" class="btn btn-sm" :class="ticket.popular ? 'btn-orange' : 'btn-outline'">
              Choose
            </router-link>
          </TicketStub>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import animals from '@/assets/ANIMAL.json'
import zones from '@/assets/ZONE.json'
import { zoneBackground } from '@/utils/zoneStyle'
import { zoneImage, homeImage } from '@/utils/entityImage'
import { getTicketTypes } from '@/utils/ticketTypes'
import TicketStub from '@/components/TicketStub.vue'

function formatWeight(kg) {
  if (kg < 1) return Math.round(kg * 1000) + ' g'
  return kg.toLocaleString('en-US') + ' kg'
}

export default {
  name: 'HelloWorld',

  components: { TicketStub },

  data() {
    return {
      animals,
      zones,
      tickets: getTicketTypes(),
      showKeeper: false,
      keeperImage: homeImage('keeper')
    }
  },

  computed: {
    minPrice() {
      return Math.min(...this.tickets.map(t => t.price))
    },

    // Aquarium, Savannah, Arctic : les 3 zones mises en avant sur l'accueil
    featuredZones() {
      return [1, 2, 5]
        .map(id => this.zones.find(zone => zone.id_zone === id))
        .filter(Boolean)
    },

    records() {
      const biggest = key => this.animals.reduce((a, b) => (b[key] > a[key] ? b : a))
      const smallest = key => this.animals.reduce((a, b) => (b[key] < a[key] ? b : a))

      const heaviest = biggest('weight_animal')
      const tallest = biggest('height_animal')
      const lightest = smallest('weight_animal')

      return [
        { label: 'Heaviest', animal: heaviest, value: formatWeight(heaviest.weight_animal) },
        { label: 'Tallest', animal: tallest, value: tallest.height_animal + ' m' },
        { label: 'Lightest', animal: lightest, value: formatWeight(lightest.weight_animal) }
      ]
    }
  },

  methods: {
    zoneBackground,
    zoneImage,

    countAnimals(idZone) {
      return this.animals.filter(animal => animal.id_zone === idZone).length
    },

    zoneName(idZone) {
      const zone = this.zones.find(z => z.id_zone === idZone)
      return zone ? zone.name_zone : ''
    }
  }
}
</script>

<style scoped>
/* ---------- Bannière ---------- */

.hero {
  position: relative;
  padding: 70px 0 0;
  background: var(--forest);
  color: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 64px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-bottom-right-radius: 64px;
}

.blob {
  position: absolute;
  background: var(--green);
  border-radius: 50% 8% 50% 8%;
}

.blob-1 {
  top: -140px;
  right: -60px;
  width: 460px;
  height: 460px;
  opacity: 0.5;
  transform: rotate(20deg);
}

.blob-2 {
  bottom: 40px;
  left: -120px;
  width: 280px;
  height: 280px;
  opacity: 0.3;
  transform: rotate(-12deg);
}

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 50px;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 999px;
  background: var(--sand);
  color: var(--forest);
  font-size: 0.82rem;
  font-weight: 700;
}

.badge-orange {
  background: var(--orange);
  color: #fff;
}

.hero h1 {
  margin: 18px 0 16px;
  font-size: clamp(2.4rem, 5.5vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.lead {
  max-width: 520px;
  color: var(--mint);
  font-size: 1.18rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

/* Billet "aujourd'hui" */

.today {
  position: relative;
  background: #fff;
  color: var(--ink);
  border-radius: var(--leaf-radius);
  transform: rotate(2deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.today-top {
  padding: 28px 28px 22px;
}

.today small,
.today span {
  display: block;
  color: var(--muted);
  font-size: 0.88rem;
}

.today-top strong {
  display: block;
  margin: 4px 0;
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--forest);
}

.today-foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 28px 24px;
  border-top: 2px dashed var(--line);
}

.today-foot::before,
.today-foot::after {
  content: '';
  position: absolute;
  top: -15px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--forest);
}

.today-foot::before { left: -14px; }
.today-foot::after { right: -14px; }

.today-foot strong {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--orange);
}

/* Habitats */

.habitats {
  position: relative;
  top: 62px;
  margin-top: 54px;
  padding: 22px 24px 20px;
  background: #fff;
  color: var(--ink);
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
}

.habitats-title {
  margin-bottom: 14px;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--forest);
}

.habitats ul {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  padding: 0 0 4px;
  overflow-x: auto;
  list-style: none;
}

.habitat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 84px;
}

.habitat-dot {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  overflow: hidden;
  border-radius: 20px 5px 20px 5px;
  transition: transform 0.2s;
}

.habitat-dot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.habitat:hover .habitat-dot {
  transform: rotate(-6deg) scale(1.08);
}

.habitat-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--forest);
  text-align: center;
}

/* ---------- Sections ---------- */

.section {
  padding: 70px 0;
}

.section-first {
  padding-top: 150px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 34px;
}

.section-head h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  color: var(--forest);
}

.section-head p {
  margin-top: 8px;
  color: var(--muted);
}

.more {
  font-weight: 700;
  color: var(--orange);
}

.more:hover {
  color: var(--orange-dark);
  text-decoration: underline;
}

/* Cartes de zones */

.zone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 28px;
}

.zcard {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
}

.zcard-top {
  position: relative;
  height: 180px;
  padding: 16px;
}

.chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: #fff;
  color: var(--forest);
  font-size: 0.78rem;
  font-weight: 700;
}

.zcard-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.zcard-top .chip {
  position: relative;
}

.zcard-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
}

.zcard-body h3 {
  color: var(--forest);
  font-size: 1.5rem;
}

.zcard-body p {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.95rem;
}

.zcard-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--green);
  font-size: 0.86rem;
  font-weight: 700;
}

.zcard-link {
  margin-top: auto;
  padding-top: 16px;
  font-weight: 700;
  color: var(--orange);
}

.zcard-link:hover {
  color: var(--orange-dark);
  text-decoration: underline;
}

/* Records */

.records-section {
  background: var(--meadow);
}

.records {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.record {
  position: relative;
  padding: 28px;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s;
}

.record:hover {
  box-shadow: 0 0 0 2px var(--green), var(--shadow);
}

.record small {
  color: var(--orange);
  font-weight: 700;
  font-size: 0.9rem;
}

.record h3 {
  margin: 6px 0 10px;
  color: var(--forest);
  font-size: 1.5rem;
}

.record strong {
  display: block;
  font-family: var(--font-display);
  font-size: 2.3rem;
  color: var(--green);
}

.record-zone {
  display: inline-block;
  margin-top: 12px;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--mint);
  color: var(--forest);
  font-size: 0.8rem;
  font-weight: 700;
}

/* Petit bloc Keeper */

.keeper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px;
  padding: 36px 40px;
  background: var(--forest);
  color: #fff;
  border-radius: 48px 8px 48px 8px;
}

.keeper-text {
  max-width: 520px;
}

.keeper h2 {
  margin: 12px 0 10px;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.keeper p {
  margin-bottom: 20px;
  color: var(--mint);
}

.keeper-img {
  flex-shrink: 0;
  width: 360px;
  max-width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: var(--leaf-radius);
}

.keeper-list {
  min-width: 260px;
  margin: 22px 0 0;
  padding: 22px 26px;
  list-style: none;
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--leaf-radius);
}

.keeper-list li {
  position: relative;
  padding: 7px 0 7px 26px;
}

.keeper-list li::before {
  content: '✔';
  position: absolute;
  left: 0;
  color: var(--leaf);
  font-weight: 700;
}

/* Billets */

.tickets-section {
  --notch: var(--cream);
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 28px;
}

/* ---------- Mobile ---------- */

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .today {
    max-width: 380px;
  }

  .keeper {
    padding: 28px 24px;
  }

  .section-first {
    padding-top: 140px;
  }
}
</style>