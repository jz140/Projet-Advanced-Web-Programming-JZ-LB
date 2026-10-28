<script>
import purchases from '@/assets/TICKET.json'
import { getTicketTypes, cleanType } from '@/utils/ticketTypes'
import PageHeader from '@/components/PageHeader.vue'
import TicketStub from '@/components/TicketStub.vue'

const MAX_QTY = 20

export default {
  name: 'TicketsPage',

  components: { PageHeader, TicketStub },

  data() {
    const tickets = getTicketTypes()

    const qty = {}
    tickets.forEach(t => { qty[t.id] = 0 })

    return {
      tickets,
      qty,
      date: new Date().toISOString().slice(0, 10),
      today: new Date().toISOString().slice(0, 10),
      booked: false,
      reference: ''
    }
  },

  computed: {
    lines() {
      return this.tickets
        .filter(t => this.qty[t.id] > 0)
        .map(t => ({ id: t.id, label: t.name, qty: this.qty[t.id], total: this.qty[t.id] * t.price }))
    },

    ticketCount() {
      return Object.values(this.qty).reduce((a, b) => a + b, 0)
    },

    total() {
      const sum = this.lines.reduce((acc, l) => acc + l.total, 0)
      return Math.round(sum * 100) / 100
    },

    canBook() {
      return this.ticketCount > 0 && !!this.date
    },

    // Les achats de TICKET.json, du plus récent au plus ancien
    history() {
      return [...purchases].sort((a, b) => b.payement_date.localeCompare(a.payement_date))
    }
  },

  methods: {
    cleanType,

    change(id, delta) {
      this.qty[id] = Math.min(MAX_QTY, Math.max(0, this.qty[id] + delta))
    },

    // Pas de paiement ni de serveur pour l'instant : on affiche juste la confirmation.
    book() {
      if (!this.canBook) return
      this.reference = 'HZ-' + Math.floor(100000 + Math.random() * 900000)
      this.booked = true
    },

    reset() {
      Object.keys(this.qty).forEach(k => { this.qty[k] = 0 })
      this.booked = false
    },

    formatDate(value) {
      return new Date(value + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    },

    formatPurchaseDate(value) {
      return new Date(value.replace(' ', 'T')).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    }
  }
}
</script>

<template>
  <div class="tickets-page">

    <PageHeader
      title="Tickets"
      lead="Choose your date and your tickets. Buying in advance means no waiting at the entrance."
      icon="🎟️"
    />

    <div class="container layout">

      <!-- Colonne de gauche : choix -->
      <div class="choices">

        <section class="block">
          <h2>1. Pick a date</h2>
          <label class="date-field">
            <span>Day of your visit</span>
            <input v-model="date" type="date" :min="today">
          </label>
        </section>

        <section class="block">
          <h2>2. Choose your tickets</h2>
          <div class="stubs">
            <TicketStub v-for="ticket in tickets" :key="ticket.id" :ticket="ticket">
              <div class="stepper">
                <button
                  type="button"
                  :aria-label="'Remove one ' + ticket.name"
                  :disabled="qty[ticket.id] === 0"
                  @click="change(ticket.id, -1)"
                >−</button>
                <output>{{ qty[ticket.id] }}</output>
                <button
                  type="button"
                  :aria-label="'Add one ' + ticket.name"
                  @click="change(ticket.id, 1)"
                >+</button>
              </div>
            </TicketStub>
          </div>
        </section>

        <!-- Historique : vient de TICKET.json -->
        <section class="block">
          <h2>Recent purchases</h2>
          <ul class="history">
            <li v-for="p in history" :key="p.id_ticket" class="history-row">
              <div class="history-main">
                <strong>{{ p.quantity_ticket }} × {{ cleanType(p.ticket_type) }}</strong>
                <small>{{ formatPurchaseDate(p.payement_date) }} · {{ p.payement_method }}</small>
              </div>
              <span class="history-amount">{{ p.total_amount }}€</span>
            </li>
          </ul>
        </section>

      </div>

      <!-- Colonne de droite : récapitulatif -->
      <aside class="summary">

        <template v-if="!booked">
          <h2>Your visit</h2>

          <p v-if="!lines.length" class="hint">
            Add at least one ticket to start your booking.
          </p>

          <ul v-else class="lines">
            <li v-for="line in lines" :key="line.id">
              <span>{{ line.qty }} × {{ line.label }}</span>
              <strong>{{ line.total }}€</strong>
            </li>
          </ul>

          <p v-if="lines.length && date" class="when">📅 {{ formatDate(date) }}</p>

          <div class="total">
            <span>Total</span>
            <strong>{{ total }}€</strong>
          </div>

          <button type="button" class="btn btn-orange full" :disabled="!canBook" @click="book">
            Book now
          </button>
        </template>

        <!-- Confirmation -->
        <template v-else>
          <h2>Booking ready 🎉</h2>
          <p class="when">Reference <strong>{{ reference }}</strong></p>
          <p class="when">📅 {{ formatDate(date) }}</p>

          <ul class="lines">
            <li v-for="line in lines" :key="line.id">
              <span>{{ line.qty }} × {{ line.label }}</span>
              <strong>{{ line.total }}€</strong>
            </li>
          </ul>

          <div class="total">
            <span>Total</span>
            <strong>{{ total }}€</strong>
          </div>

          <button type="button" class="btn btn-outline full" @click="reset">New booking</button>
          <router-link to="/" class="btn btn-green full">Back to home</router-link>
        </template>

        <div class="open-hours">
          <strong>Open every day</strong>
          <span>09:30 to 18:30, last entry at 17:00</span>
        </div>

      </aside>

    </div>
  </div>
</template>

<style scoped>
.tickets-page {
  min-height: 100vh;
  padding-bottom: 60px;
  background: var(--meadow);
  --notch: var(--meadow);
}

.layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 36px;
  align-items: start;
  padding-top: 44px;
}

.block {
  margin-bottom: 42px;
}

.block h2 {
  margin-bottom: 18px;
  color: var(--forest);
  font-size: 1.5rem;
}

/* Date */

.date-field {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-weight: 700;
  font-size: 0.9rem;
}

.date-field input {
  padding: 12px 18px;
  border: 2px solid var(--line);
  border-radius: 999px;
  background: #fff;
  color: var(--forest);
  font-family: var(--font-body);
  font-size: 1rem;
}

/* Billets */

.stubs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 26px;
}

/* Boutons + / - */

.stepper {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.stepper button {
  width: 34px;
  height: 34px;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: #fff;
  color: var(--green);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.stepper button:hover:not(:disabled) {
  background: var(--green);
  color: #fff;
}

.stepper button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.stepper output {
  min-width: 22px;
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--forest);
}

/* Historique */

.history {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.history-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  background: #fff;
  border-radius: 20px 5px 20px 5px;
  box-shadow: var(--shadow);
}

.history-main strong {
  display: block;
  color: var(--forest);
}

.history-main small {
  color: var(--muted);
}

.history-amount {
  color: var(--orange);
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
}

/* Récapitulatif */

.summary {
  position: sticky;
  top: 90px;
  padding: 28px;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
}

.summary h2 {
  margin-bottom: 16px;
  color: var(--forest);
  font-size: 1.5rem;
}

.hint {
  color: var(--muted);
  font-size: 0.93rem;
}

.lines {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lines li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.93rem;
}

.when {
  margin-top: 12px;
  color: var(--muted);
  font-size: 0.93rem;
}

.total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 18px 0;
  font-weight: 700;
}

.total strong {
  color: var(--orange);
  font-family: var(--font-display);
  font-size: 2.2rem;
}

.full {
  width: 100%;
  margin-top: 10px;
}

.open-hours {
  margin-top: 22px;
  padding-top: 16px;
  border-top: 2px dashed var(--line);
  color: var(--muted);
  font-size: 0.88rem;
}

.open-hours strong {
  display: block;
  color: var(--forest);
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .summary {
    position: static;
  }
}
</style>