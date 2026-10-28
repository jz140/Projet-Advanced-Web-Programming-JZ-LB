<template>
  <div class="show-page">
    <PageHeader
      :title="item ? config.title(item) : 'Not found'"
      :lead="item ? config.subtitle(item) : 'This ' + config.label + ' does not exist.'"
      :icon="config.icon"
    />

    <div class="container content">
      <div class="top-row">
        <router-link :to="'/' + entity" class="btn btn-outline btn-sm">← Back to the list</router-link>
        <ActionButtons v-if="item" :base="'/' + entity" :id="itemId" hide-show />
      </div>

      <article v-if="item" class="sheet" :class="{ 'no-art': !config.art }">
        <div v-if="config.art" class="sheet-art" :style="art.background ? { background: art.background } : {}">
          <img v-if="art.image" :src="art.image" :alt="config.title(item)">
          <span v-else class="sheet-emoji" aria-hidden="true">{{ art.emoji }}</span>
        </div>

        <dl class="sheet-rows">
          <div v-for="row in config.rows(item)" :key="row.label" class="row" :class="{ full: row.full }">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
        </dl>
      </article>

      <section v-for="section in related" :key="section.title" class="related">
        <h2>{{ section.title }}</h2>
        <ul>
          <li v-for="it in section.items" :key="it.label">
            <router-link :to="it.to">
              <strong>{{ it.label }}</strong>
              <small>{{ it.note }}</small>
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { entities } from '@/utils/entities'
import PageHeader from '@/components/PageHeader.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
  name: 'EntityShow',
  components: { PageHeader, ActionButtons },
  props: { entity: { type: String, required: true } },

  computed: {
    config() { return entities[this.entity] },
    itemId() { return this.$route.params.id },
    item() {
      return this.config.data.find(i => String(i[this.config.idField]) === String(this.itemId))
    },
    art() { return this.item && this.config.art ? this.config.art(this.item) : {} },
    related() {
      return this.item ? this.config.related(this.item).filter(s => s.items.length) : []
    }
  }
}
</script>

<style scoped>
.show-page { min-height: 100vh; padding-bottom: 60px; background: var(--meadow); }
.content { padding-top: 32px; }

.top-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 26px;
}

.sheet {
  display: grid;
  grid-template-columns: 300px 1fr;
  overflow: hidden;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
}

.sheet.no-art { grid-template-columns: 1fr; }
.sheet-art { display: grid; place-items: center; min-height: 260px; }
.sheet-art img { display: block; width: 100%; height: 100%; object-fit: cover; }
.sheet-emoji { font-size: 6rem; line-height: 1; }

.sheet-rows {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin: 0;
  padding: 30px;
  align-content: start;
}

.row { padding: 12px 16px; background: var(--meadow); border-radius: 14px 4px 14px 4px; }
.row.full { grid-column: 1 / -1; }
dt { color: var(--muted); font-size: 0.78rem; font-weight: 700; }
dd { margin: 2px 0 0; color: var(--forest); font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; }

.related { margin-top: 38px; }
.related h2 { margin-bottom: 14px; color: var(--forest); font-size: 1.4rem; }
.related ul { display: flex; flex-wrap: wrap; gap: 12px; margin: 0; padding: 0; list-style: none; }
.related a {
  display: block;
  padding: 12px 20px;
  background: #fff;
  border-radius: 18px 5px 18px 5px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.2s;
}
.related a:hover { box-shadow: 0 0 0 2px var(--green), var(--shadow); }
.related strong { display: block; color: var(--forest); }
.related small { color: var(--muted); }

@media (max-width: 760px) {
  .sheet { grid-template-columns: 1fr; }
  .sheet-art { min-height: 200px; }
  .sheet-rows { grid-template-columns: 1fr; }
}
</style>
