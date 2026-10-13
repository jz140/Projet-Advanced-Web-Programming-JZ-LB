<template>
  <section class="page-header">
    <div class="header-bg" aria-hidden="true"></div>
    <div class="container">
      <router-link to="/" class="back-link">← Back to home</router-link>

      <div class="head-row">
        <span class="head-icon" aria-hidden="true">{{ icon }}</span>
        <div>
          <h1>{{ title }}</h1>
          <p v-if="lead">{{ lead }}</p>
        </div>
      </div>

      <!-- Barre d'outils optionnelle (recherche, filtres...) -->
      <div v-if="$slots.default" class="head-tools">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: { type: String, required: true },
    lead: { type: String, default: '' },
    icon: { type: String, default: '🌿' }
  }
}
</script>

<style scoped>
.page-header {
  position: relative;
  overflow: hidden;
  padding: 28px 0 56px;
  background: var(--forest);
  color: #fff;
  border-bottom-right-radius: 64px;
  border-bottom-left-radius: 8px;
}

.header-bg {
  position: absolute;
  top: -120px;
  right: -80px;
  width: 380px;
  height: 380px;
  background: var(--green);
  opacity: 0.55;
  border-radius: 190px 20px 190px 20px;
  transform: rotate(18deg);
}

.container {
  position: relative;
}

.back-link {
  display: inline-block;
  padding: 7px 16px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  color: #fff;
  font-size: 0.88rem;
  font-weight: 700;
  transition: background-color 0.2s, color 0.2s;
}

.back-link:hover {
  background: #fff;
  color: var(--forest);
}

.head-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.head-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 74px;
  height: 74px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 24px 6px 24px 6px;
  font-size: 2.2rem;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
}

.head-row p {
  margin-top: 8px;
  max-width: 560px;
  color: var(--mint);
  font-size: 1.05rem;
}

.head-tools {
  margin-top: 30px;
}

@media (max-width: 560px) {
  .head-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>