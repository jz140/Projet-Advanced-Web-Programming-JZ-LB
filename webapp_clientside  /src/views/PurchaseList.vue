<template>
  <div class="purchase-page">
    <PageHeader
      title="HappyZoo Purchases"
      :lead="purchases.length + ' orders, ' + money(revenue) + ' collected.'"
      icon="🎟️"
    >
      <div class="toolbar">
        <select v-model="type" class="field" aria-label="Filter by ticket type">
          <option value="">All ticket types</option>
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
        <router-link to="/purchases/new" class="btn btn-orange">+ New purchase</router-link>
      </div>
    </PageHeader>

    <div class="container content">
      <!-- Présentation en BILLETS horizontaux -->
      <ul class="stubs">
        <li v-for="p in filtered" :key="p.id_ticket" class="stub">
          <div class="stub-main">
            <h2>{{ p.quantity_ticket }} × {{ cleanType(p.ticket_type) }}</h2>
            <p>{{ formatDate(p.payement_date) }} · {{ p.payement_method }}</p>
            <p class="who">Customer: {{ userName(p.id_user) }}</p>
            <ActionButtons base="/purchases" :id="p.id_ticket" />
          </div>

          <div class="stub-price">
            <small>#{{ p.id_ticket }}</small>
            <strong>{{ money(p.total_amount) }}</strong>
          </div>
        </li>
      </ul>
      <p v-if="!filtered.length" class="empty">No purchase for this ticket type.</p>
    </div>
  </div>
</template>

<script>
import purchases from '@/assets/TICKET.json'
import { cleanType } from '@/utils/ticketTypes'
import { money, formatDate, userName, TICKET_TYPES } from '@/utils/entities'
import PageHeader from '@/components/PageHeader.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
  name: 'PurchaseList',
  components: { PageHeader, ActionButtons },
  data() { return { type: '', types: TICKET_TYPES } },
  computed: {
    purchases() {
      return [...purchases].sort((a, b) => b.payement_date.localeCompare(a.payement_date))
    },
    filtered() {
      return this.purchases.filter(p => !this.type || cleanType(p.ticket_type) === this.type)
    },
    revenue() { return purchases.reduce((sum, p) => sum + p.total_amount, 0) }
  },
  methods: { cleanType, money, formatDate, userName }
}
</script>

<style scoped>
.purchase-page { min-height: 100vh; padding-bottom: 60px; background: var(--meadow); }
.toolbar { display: flex; flex-wrap: wrap; gap: 12px; }
.field { min-width: 210px; padding: 12px 18px; border: none; border-radius: 999px; background: #fff; color: var(--forest); font-family: var(--font-body); font-size: 0.98rem; cursor: pointer; }
.content { padding-top: 36px; }

.stubs { display: flex; flex-direction: column; gap: 22px; margin: 0; padding: 0; list-style: none; }

.stub { display: grid; grid-template-columns: 1fr 190px; background: #fff; border-radius: var(--leaf-radius); box-shadow: var(--shadow); }
.stub-main { padding: 22px 26px; }
.stub-main h2 { color: var(--forest); font-size: 1.4rem; }
.stub-main p { margin-top: 4px; color: var(--muted); font-size: 0.93rem; }
.stub-main .who { margin-bottom: 14px; }

/* ligne de découpe */
.stub-price { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; border-left: 2px dashed var(--line); }
.stub-price small { color: var(--muted); font-weight: 700; }
.stub-price strong { color: var(--orange); font-family: var(--font-display); font-size: 2rem; }

.empty { padding: 30px; color: var(--muted); text-align: center; }

@media (max-width: 700px) {
  .stub { grid-template-columns: 1fr; }
  .stub-price { padding: 16px; border-left: none; border-top: 2px dashed var(--line); }
}
</style>
