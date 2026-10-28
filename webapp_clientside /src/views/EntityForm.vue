<template>
  <div class="form-page">
    <PageHeader
      :title="isEdit ? 'Edit ' + config.label : 'New ' + config.label"
      lead="Fill in the form. Nothing is saved for now: the backend will take over later."
      :icon="config.icon"
    />

    <div class="container content">
      <p v-if="isEdit && !item" class="missing">This {{ config.label }} does not exist.</p>

      <!-- novalidate : pour l'instant, cliquer sur Submit ne fait strictement rien -->
      <form v-else class="form-card" novalidate @submit.prevent="onSubmit">
        <div
          v-for="field in config.fields"
          :key="field.key"
          class="field"
          :class="{ full: field.full }"
        >
          <label :for="'f-' + field.key">
            {{ field.label }}<span v-if="field.required" class="req"> *</span>
          </label>

          <select v-if="field.type === 'select'" :id="'f-' + field.key" v-model="form[field.key]">
            <option value="" disabled>Choose…</option>
            <option v-for="o in options(field)" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>

          <textarea v-else-if="field.type === 'textarea'" :id="'f-' + field.key" v-model="form[field.key]" rows="4"></textarea>

          <input
            v-else
            :id="'f-' + field.key"
            v-model="form[field.key]"
            :type="field.type"
            :step="field.step"
          >
        </div>

        <div class="buttons">
          <button type="submit" class="btn btn-orange">Submit</button>
          <router-link :to="isEdit ? '/' + entity + '/' + $route.params.id : '/' + entity" class="btn btn-outline">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { entities } from '@/utils/entities'
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'EntityForm',
  components: { PageHeader },
  props: { entity: { type: String, required: true } },

  data() {
    return { form: {} }
  },

  computed: {
    config() { return entities[this.entity] },
    isEdit() { return !!this.$route.params.id },
    item() {
      if (!this.isEdit) return null
      return this.config.data.find(i => String(i[this.config.idField]) === String(this.$route.params.id))
    },
    // change quand on passe d'un formulaire à un autre (même composant réutilisé)
    sourceKey() { return this.entity + ':' + (this.$route.params.id || 'new') }
  },

  watch: {
    sourceKey: {
      immediate: true,
      handler() { this.form = this.buildForm() }
    }
  },

  methods: {
    // Formulaire vide (New) ou pré-rempli avec l'élément (Edit)
    buildForm() {
      const form = {}
      this.config.fields.forEach(f => {
        let value = this.item ? this.item[f.key] : ''
        if (this.item && f.read) value = f.read(value)
        form[f.key] = value
      })
      return form
    },

    options(field) {
      return field.options.map(o => (typeof o === 'object' ? o : { value: o, label: o }))
    },

    onSubmit() {
      // TODO (backend) : envoyer this.form
      //   - New  : POST /api/<entité>
      //   - Edit : PUT  /api/<entité>/<id>
      // Pour l'instant : rien ne se passe, aucune donnée n'est modifiée.
    }
  }
}
</script>

<style scoped>
.form-page { min-height: 100vh; padding-bottom: 60px; background: var(--meadow); }
.content { padding-top: 40px; }
.missing { color: var(--muted); font-size: 1.1rem; }

.form-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 24px;
  max-width: 820px;
  padding: 34px;
  background: #fff;
  border-radius: var(--leaf-radius);
  box-shadow: var(--shadow);
}

.field { display: flex; flex-direction: column; gap: 6px; }
.field.full { grid-column: 1 / -1; }
label { color: var(--forest); font-size: 0.9rem; font-weight: 700; }
.req { color: var(--orange); }

input, select, textarea {
  padding: 12px 16px;
  border: 2px solid var(--line);
  border-radius: 14px 4px 14px 4px;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 1rem;
}

input:focus, select:focus, textarea:focus { border-color: var(--green); outline: none; }

.buttons { grid-column: 1 / -1; display: flex; gap: 12px; margin-top: 8px; }

@media (max-width: 640px) {
  .form-card { grid-template-columns: 1fr; padding: 22px; }
}
</style>
