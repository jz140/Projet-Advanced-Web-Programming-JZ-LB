<template>
  <article class="stub" :class="{ popular: ticket.popular }">
    <div class="stub-main">
      <span v-if="ticket.popular" class="tag">Most popular</span>
      <h3>{{ ticket.name }}</h3>
      <p class="ages">{{ ticket.ages }}</p>
      <ul class="perks">
        <li v-for="perk in ticket.perks" :key="perk">{{ perk }}</li>
      </ul>
    </div>

    <!-- Ligne de découpe du billet -->
    <div class="stub-foot">
      <div class="price">
        {{ ticket.price }}€ <small>{{ ticket.unit }}</small>
      </div>
      <div class="stub-action">
        <slot />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TicketStub',
  props: {
    ticket: { type: Object, required: true }
  }
}
</script>

<style scoped>
.stub {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
}

.stub.popular {
  box-shadow: 0 0 0 2px var(--orange), var(--shadow);
}

.stub-main {
  position: relative;
  flex: 1;
  padding: 28px 26px 22px;
}

.tag {
  position: absolute;
  top: 18px;
  right: 18px;
  padding: 3px 11px;
  border-radius: 999px;
  background: var(--orange);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
}

h3 {
  color: var(--forest);
  font-size: 1.4rem;
}

.ages {
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.92rem;
}

.perks {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.perks li {
  position: relative;
  padding: 5px 0 5px 24px;
  color: var(--muted);
  font-size: 0.92rem;
}

.perks li::before {
  content: '✔';
  position: absolute;
  left: 0;
  color: var(--green);
  font-weight: 700;
}

/* Pied du billet avec encoches */
.stub-foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 26px 24px;
  border-top: 2px dashed var(--line);
}

.stub-foot::before,
.stub-foot::after {
  content: '';
  position: absolute;
  top: -15px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--notch, var(--cream));
}

.stub-foot::before { left: -14px; }
.stub-foot::after { right: -14px; }

.price {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--forest);
}

.price small {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--muted);
}
</style>