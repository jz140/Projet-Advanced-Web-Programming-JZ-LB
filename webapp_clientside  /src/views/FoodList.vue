<template>
  <div class="food-page">
    <PageHeader title="HappyZoo Food" :lead="foods.length + ' products in the kitchen stock.'" icon="🥬">
      <div class="toolbar">
        <input v-model="search" type="search" class="field" placeholder="Search a food..." aria-label="Search a food">
        <router-link to="/foods/new" class="btn btn-orange">+ New food</router-link>
      </div>
    </PageHeader>

    <div class="container content">
      <!-- Présentation en TABLEAU -->
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Unit weight</th>
              <th>Fed to</th>
              <th><span class="sr">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="food in filtered" :key="food.id_food">
              <td>
                <div class="name">
                  <img v-if="foodImage(food.name_food)" :src="foodImage(food.name_food)" :alt="food.name_food" class="thumb">
                  <span v-else class="thumb thumb-emoji" aria-hidden="true">🥬</span>
                  <div>
                    <strong>{{ food.name_food }}</strong>
                    <small>{{ food.description_food }}</small>
                  </div>
                </div>
              </td>
              <td class="price">{{ money(food.price_food) }}</td>
              <td class="stock">
                <span class="bar"><span :style="{ width: stockPercent(food) + '%' }"></span></span>
                {{ food.quantity_food }}
              </td>
              <td>{{ food.weight_food }} kg</td>
              <td>{{ eatersOf(food.id_food).length }} animals</td>
              <td><ActionButtons base="/foods" :id="food.id_food" /></td>
            </tr>
          </tbody>
        </table>
        <p v-if="!filtered.length" class="empty">No food matches your search.</p>
      </div>
    </div>
  </div>
</template>

<script>
import foods from '@/assets/FOOD.json'
import { money, eatersOf } from '@/utils/entities'
import { foodImage } from '@/utils/entityImage'
import PageHeader from '@/components/PageHeader.vue'
import ActionButtons from '@/components/ActionButtons.vue'

export default {
  name: 'FoodList',
  components: { PageHeader, ActionButtons },
  data() { return { foods, search: '' } },
  computed: {
    maxStock() { return Math.max(...this.foods.map(f => f.quantity_food)) },
    filtered() {
      const text = this.search.trim().toLowerCase()
      return this.foods.filter(f =>
        !text || f.name_food.toLowerCase().includes(text) || f.description_food.toLowerCase().includes(text)
      )
    }
  },
  methods: {
    money,
    eatersOf,
    foodImage,
    stockPercent(food) { return Math.round((food.quantity_food / this.maxStock) * 100) }
  }
}
</script>

<style scoped>
.food-page { min-height: 100vh; padding-bottom: 60px; background: var(--meadow); }
.toolbar { display: flex; flex-wrap: wrap; gap: 12px; }
.field { width: 100%; max-width: 340px; padding: 12px 18px; border: none; border-radius: 999px; background: #fff; color: var(--forest); font-family: var(--font-body); font-size: 0.98rem; }
.content { padding-top: 36px; }

.table-wrap { overflow-x: auto; background: #fff; border-radius: var(--leaf-radius); box-shadow: var(--shadow); }
table { width: 100%; border-collapse: collapse; min-width: 820px; }
th { padding: 16px 20px; background: var(--forest); color: #fff; font-size: 0.85rem; text-align: left; }
td { padding: 16px 20px; border-bottom: 1px solid var(--line); vertical-align: middle; }
tbody tr:hover { background: var(--meadow); }
tbody tr:last-child td { border-bottom: none; }

.name { display: flex; align-items: center; gap: 14px; }
.thumb { flex-shrink: 0; width: 56px; height: 56px; object-fit: cover; border-radius: 16px 4px 16px 4px; }
.thumb-emoji { display: grid; place-items: center; background: var(--mint); font-size: 1.6rem; }
.name strong { display: block; color: var(--forest); font-family: var(--font-display); font-size: 1.1rem; }
.name small { color: var(--muted); }
.price { color: var(--orange); font-family: var(--font-display); font-weight: 700; }

.stock { white-space: nowrap; font-weight: 700; color: var(--forest); }
.bar { display: inline-block; width: 90px; height: 8px; margin-right: 10px; overflow: hidden; background: var(--mint); border-radius: 999px; vertical-align: middle; }
.bar span { display: block; height: 100%; background: var(--green); border-radius: 999px; }

.empty { padding: 30px; color: var(--muted); text-align: center; }
.sr { position: absolute; left: -9999px; }
</style>
