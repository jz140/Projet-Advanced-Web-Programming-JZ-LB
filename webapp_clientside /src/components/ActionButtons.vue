<template>
  <div class="row-actions">
    <router-link v-if="!hideShow" :to="base + '/' + id" class="act act-show">Show</router-link>
    <router-link :to="base + '/' + id + '/edit'" class="act act-edit">Edit</router-link>
    <!-- DELETE : volontairement sans effet (le backend s'en occupera) -->
    <button type="button" class="act act-delete" @click="onDelete">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  props: {
    base: { type: String, required: true },   // ex. '/animals'
    id: { type: [Number, String], required: true },
    hideShow: { type: Boolean, default: false }
  },
  methods: {
    onDelete() {
      // TODO (backend) : DELETE /api/<entité>/<id> puis rafraîchir la liste.
      // Pour l'instant : rien ne se passe.
    }
  }
}
</script>

<style scoped>
.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.act {
  padding: 6px 15px;
  border: 2px solid transparent;
  border-radius: 999px;
  background: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.act-show { border-color: var(--green); color: var(--green); }
.act-show:hover { background: var(--green); color: #fff; }

.act-edit { background: var(--mint); color: var(--forest); }
.act-edit:hover { background: var(--leaf); }

.act-delete { border-color: #b4372c; color: #b4372c; }
.act-delete:hover { background: #b4372c; color: #fff; }
</style>
