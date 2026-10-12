<template>
  <div class="happyzoo-wrapper">
    <!-- ========== BANNIÈRE ========== -->
    <section class="grand-banner">
      <div class="container contenu-banner">
        <span class="petit-badge">An unforgettable adventure</span>
        <h1>Explore wildlife closer to nature</h1>
        <p>
          Wander through {{ zones.length }} themed zones and meet
          {{ animals.length }} fascinating animals.
        </p>

        <div class="bloc-boutons">
          <router-link to="/#tarifs" class="bouton-reserver grand-bouton">Get my tickets</router-link>
          <router-link to="/zones" class="bouton-decouvrir grand-bouton">Discover the zones</router-link>
        </div>

        <!-- Chiffres cliquables, calculés à partir des fichiers JSON -->
        <div class="stats">
          <router-link to="/animals" class="stat">
            <strong>{{ animals.length }}</strong>
            <span>Animals</span>
          </router-link>
          <router-link to="/zones" class="stat">
            <strong>{{ zones.length }}</strong>
            <span>Zones</span>
          </router-link>
          <div class="stat stat-info">
            <strong>09:30</strong>
            <span>Open every day</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ZONES MISES EN AVANT ========== -->
    <section id="zones" class="section-zones">
      <div class="container">
        <div class="titre-section">
          <span class="tag-titre">Trails &amp; Habitats</span>
          <h2>Explore our Thematic Zones</h2>
          <p>Each zone is specially designed to respect the natural biotope of our residents.</p>
        </div>

        <div class="grille-3-colonnes">
          <article v-for="zone in featuredZones" :key="zone.id_zone" class="carte-zone">
            <div class="boite-image" :style="{ background: zoneBackground(zone.id_zone) }">
              <span class="etiquette">{{ zone.theme_zone }}</span>
              <span class="emoji-zone" aria-hidden="true">{{ zoneEmoji(zone.id_zone) }}</span>
            </div>
            <div class="contenu-texte">
              <h3>{{ zone.name_zone }}</h3>
              <p>{{ zone.description_zone }}</p>

              <div class="info-surface">
                <span>{{ zone.place_zone }}</span>
                <span>{{ countAnimals(zone.id_zone) }} animals</span>
              </div>

              <router-link
                :to="{ path: '/animals', query: { zone: zone.id_zone } }"
                class="lien-zone"
              >
                See the animals
              </router-link>
            </div>
          </article>
        </div>

        <div class="voir-tout">
          <router-link to="/zones" class="bouton-decouvrir">See all {{ zones.length }} zones</router-link>
          <router-link to="/animals" class="bouton-contour">Meet all the animals</router-link>
        </div>
      </div>
    </section>

    <!-- ========== EXPÉRIENCE ========== -->
    <section id="activites" class="section-soigneur">
      <div class="container bloc-promo">
        <div class="texte-promo">
          <span class="tag-titre">Closer to the beasts</span>
          <h2>Become a Keeper for a Day</h2>
          <p>
            Take part in supervised feeding with our animal team and understand the
            lifestyle and diet of our favorite species.
          </p>

          <a href="#" class="bouton-reserver" @click.prevent>Book a workshop</a>
        </div>
        <div class="image-promo">
          <img
            src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&amp;fit=crop&amp;w=800&amp;q=80"
            alt="Animal interaction"
          />
        </div>
      </div>
    </section>

    <!-- ========== BILLETS ========== -->
    <section id="tarifs" class="section-tarifs fond-gris">
      <div class="container">
        <div class="titre-section">
          <span class="tag-titre">Online Ticketing</span>
          <h2>Choose Your Package</h2>
          <p>Buy your tickets in advance to avoid waiting at the checkout.</p>
        </div>

        <div class="grille-3-colonnes">
          <div class="billet1">
            <h3>Child Ticket</h3>
            <p class="sous-titre">3 to 12 years old included</p>
            <div class="prix">14€<span>/pers</span></div>
            <ul class="liste-avantages">
              <li>✔ Full access to zones</li>
              <li>✔ Animations &amp; animated snacks</li>
              <li>✔ Fun map included</li>
            </ul>
            <button class="bouton-acheter">Buy</button>
          </div>

          <div class="billet2 populaire">
            <span class="tag-populaire">Most popular</span>
            <h3>Adult Ticket</h3>
            <p class="sous-titre">From 13 years old</p>
            <div class="prix">22€<span>/pers</span></div>
            <ul class="liste-avantages">
              <li>✔ Unlimited access to all zones</li>
              <li>✔ Access to educational shows</li>
              <li>✔ Skip-the-line entry</li>
            </ul>
            <button class="bouton-acheter full-btn">Buy</button>
          </div>

          <div class="billet3">
            <h3>Family Pass</h3>
            <p class="sous-titre">2 Adults + 2 Children</p>
            <div class="prix">62€<span>/pack</span></div>
            <ul class="liste-avantages">
              <li>✔ Advantageous combined ticket</li>
              <li>✔ Interactive mobile guide</li>
              <li>✔ 10% off in our restaurants</li>
            </ul>
            <button class="bouton-acheter">Buy</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== PIED DE PAGE ========== -->
    <footer class="pied-de-page">
      <div class="container colonnes-footer">
        <div class="colonne1">
          <div class="mon-logo">🌿 Happy<span>Zoo</span></div>
          <p>A park committed to wildlife preservation and public awareness.</p>
        </div>
        <div class="colonne2">
          <h4>Navigation</h4>
          <ul>
            <li><router-link to="/animals">The Animals</router-link></li>
            <li><router-link to="/zones">The Zones</router-link></li>
            <li><router-link to="/#activites">Experiences</router-link></li>
            <li><router-link to="/#tarifs">Tickets &amp; Prices</router-link></li>
          </ul>
        </div>
        <div class="colonne3">
          <h4>Opening Hours</h4>
          <p>Monday to Sunday<br />09:30 AM to 06:30 PM</p>
          <p>Ticket offices close at 05:00 PM</p>
        </div>
        <div class="colonne4">
          <h4>Contact</h4>
          <p>📍 Reserve Road, 75000 Paris</p>
          <p>📞 01 23 45 67 89</p>
          <p>✉ contact@zoowildlife.fr</p>
        </div>
      </div>
      <div class="bas-du-footer">
        <p>&copy; 2026 HappyZoo. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import animals from '@/assets/ANIMAL.json'
import zones from '@/assets/ZONE.json'
import { zoneEmoji, zoneBackground } from '@/utils/zoneStyle'

export default {
  name: 'HelloWorld',

  data() {
    return {
      animals,
      zones
    }
  },

  computed: {
    // Aquarium, Savannah, Arctic : les 3 zones mises en avant sur l'accueil
    featuredZones() {
      return [1, 2, 5]
        .map(id => this.zones.find(zone => zone.id_zone === id))
        .filter(Boolean)
    }
  },

  methods: {
    zoneEmoji,
    zoneBackground,
    countAnimals(idZone) {
      return this.animals.filter(animal => animal.id_zone === idZone).length
    }
  }
}
</script>

<style scoped>
.happyzoo-wrapper {
  font-family: Arial, sans-serif;
  color: #1c2421;
  background-color: #ffffff;
  line-height: 1.5;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease-in-out;
}

h1, h2, h3, h4, p, ul {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
}

/* ---------- Boutons ---------- */

.bouton-reserver,
.bouton-decouvrir,
.bouton-contour,
.bouton-acheter {
  display: inline-block;
  padding: 12px 22px;
  font-size: 0.95rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  text-align: center;
  transition: all 0.2s ease-in-out;
}

.bouton-reserver,
.bouton-acheter.full-btn {
  background-color: #d97706;
  color: #ffffff;
}

.bouton-reserver:hover,
.bouton-acheter.full-btn:hover {
  background-color: #b45309;
}

.bouton-decouvrir {
  background-color: #2d6a4f;
  color: #ffffff;
}

.bouton-decouvrir:hover {
  background-color: #1b4332;
}

.bouton-contour,
.bouton-acheter {
  border-color: #2d6a4f;
  background-color: transparent;
  color: #2d6a4f;
}

.bouton-contour:hover,
.bouton-acheter:hover {
  background-color: #2d6a4f;
  color: #ffffff;
}

.bouton-acheter {
  width: 100%;
}

:focus-visible {
  outline: 3px solid #d97706;
  outline-offset: 2px;
}

/* ---------- Bannière ---------- */

.petit-badge {
  display: inline-block;
  background-color: #f3eee7;
  color: #1e3a2b;
  padding: 5px 12px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 20px;
  margin-bottom: 10px;
}

.grand-banner {
  background-color: #1e3a2b;
  color: #ffffff;
  padding: 80px 0 60px;
  text-align: center;
}

.grand-banner h1 {
  font-size: 2.8rem;
  color: #ffffff;
  margin-bottom: 15px;
}

.grand-banner p {
  font-size: 1.15rem;
  color: #f3eee7;
  margin-bottom: 30px;
}

.bloc-boutons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 50px;
}

.stat {
  min-width: 150px;
  padding: 14px 24px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  text-align: center;
}

a.stat:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #d97706;
}

.stat strong {
  display: block;
  font-size: 2rem;
  color: #ffffff;
}

.stat span {
  color: #f3eee7;
  font-size: 0.9rem;
}

/* ---------- Sections ---------- */

.section-zones,
.section-soigneur,
.section-tarifs {
  padding: 60px 0;
}

.fond-gris {
  background-color: #fdfbf7;
}

.titre-section {
  text-align: center;
  margin-bottom: 40px;
}

.tag-titre {
  color: #d97706;
  font-weight: bold;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.titre-section h2 {
  font-size: 2.2rem;
  color: #1e3a2b;
  margin: 5px 0;
}

.titre-section p {
  color: #526058;
}

.grille-3-colonnes {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

.carte-zone,
.billet1, .billet2, .billet3 {
  background-color: #ffffff;
  border: 1px solid #e2ece9;
  border-radius: 12px;
  width: 300px;
  flex-grow: 1;
  box-shadow: 0 8px 20px rgba(30, 58, 43, 0.08);
}

.boite-image {
  position: relative;
  height: 190px;
  padding: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.etiquette {
  background-color: #ffffff;
  color: #1e3a2b;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
}

.emoji-zone {
  position: absolute;
  right: 20px;
  bottom: 14px;
  font-size: 4rem;
  line-height: 1;
}

.contenu-texte {
  padding: 22px;
}

.contenu-texte h3 {
  color: #1e3a2b;
  margin-bottom: 8px;
}

.contenu-texte p {
  color: #526058;
  font-size: 0.95rem;
  margin-bottom: 15px;
  min-height: 46px;
}

.info-surface {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #2d6a4f;
  border-top: 1px solid #e2ece9;
  padding-top: 12px;
  font-size: 0.85rem;
}

.lien-zone {
  display: inline-block;
  margin-top: 14px;
  font-weight: bold;
  color: #d97706;
}

.lien-zone:hover {
  color: #b45309;
  text-decoration: underline;
}

.voir-tout {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 40px;
}

/* ---------- Promo ---------- */

.bloc-promo {
  background-color: #1e3a2b;
  color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  gap: 30px;
  align-items: center;
}

.texte-promo {
  flex: 1;
}

.texte-promo .tag-titre {
  color: #d97706;
}

.texte-promo h2 {
  color: #ffffff;
  font-size: 2rem;
  margin: 10px 0;
}

.texte-promo p {
  color: #f3eee7;
  margin-bottom: 20px;
}

.image-promo {
  flex: 1;
}

.image-promo img {
  border-radius: 12px;
}

/* ---------- Billets ---------- */

.billet1,
.billet2,
.billet3 {
  padding: 30px;
  text-align: center;
}

.billet2.populaire {
  border: 2px solid #d97706;
  background-color: #ffffff;
}

.tag-populaire {
  background-color: #d97706;
  color: #ffffff;
  font-weight: bold;
  padding: 4px 12px;
  font-size: 0.75rem;
  border-radius: 12px;
  margin-bottom: 12px;
  display: inline-block;
  text-transform: uppercase;
}

.prix {
  font-size: 2.4rem;
  font-weight: bold;
  color: #1e3a2b;
  margin: 15px 0;
}

.prix span {
  font-size: 0.9rem;
  color: #526058;
}

.liste-avantages {
  text-align: left;
  margin-bottom: 25px;
}

.liste-avantages li {
  padding: 8px 0;
  border-bottom: 1px solid #e2ece9;
  font-size: 0.9rem;
  color: #526058;
}

/* ---------- Pied de page ---------- */

.pied-de-page {
  background-color: #1e3a2b;
  color: #f3eee7;
  padding: 50px 0 20px;
}

.mon-logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
}

.mon-logo span {
  color: #d97706;
}

.colonnes-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
  margin-bottom: 40px;
}

.colonne1, .colonne2, .colonne3, .colonne4 {
  flex: 1;
  min-width: 200px;
}

.colonne2 h4, .colonne3 h4, .colonne4 h4 {
  color: #ffffff;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.colonne2 ul li {
  margin-bottom: 10px;
}

.colonne2 a:hover {
  color: #d97706;
}

.bas-du-footer {
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  font-size: 0.85rem;
  color: #a9b8ae;
}

@media (max-width: 768px) {
  .grand-banner h1 {
    font-size: 2.1rem;
  }

  .bloc-promo {
    flex-direction: column;
    padding: 25px;
  }
}
</style>