// Description des 4 entités du CRUD (Animals, Zones, Food, Purchases).
// Les pages génériques EntityShow.vue (fiche) et EntityForm.vue (formulaire)
// lisent ce fichier : pour changer un champ, on ne modifie qu'ici.
// Rien n'est jamais écrit dans les JSON : le futur backend s'en chargera.

import animals from '@/assets/ANIMAL.json'
import zones from '@/assets/ZONE.json'
import foods from '@/assets/FOOD.json'
import purchases from '@/assets/TICKET.json'
import users from '@/assets/USER.json'
import eats from '@/assets/EAT.json'
import { cleanType } from './ticketTypes'
import { zoneEmoji, zoneBackground } from './zoneStyle'
import { getAnimalImage } from './animalImage'
import { zoneImage, foodImage } from './entityImage'

/* ---------- petits outils de formatage ---------- */

export const money = n => Number(n).toFixed(2) + '€'

export function formatWeight(kg) {
  if (kg < 1) return Math.round(kg * 1000) + ' g'
  return kg.toLocaleString('en-US') + ' kg'
}

export function formatDate(value) {
  return new Date(value.replace(' ', 'T')).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

export const TICKET_TYPES = ['Child Pass', 'Adult Pass', 'Family Pass']

const zoneOf = id => zones.find(z => z.id_zone === Number(id))
const foodOf = id => foods.find(f => f.id_food === Number(id))
const animalOf = id => animals.find(a => a.id_animal === Number(id))
const userOf = id => users.find(u => u.id_user === Number(id))

export const dietOf = idAnimal => eats.filter(e => e.id_animal === idAnimal)
export const eatersOf = idFood => eats.filter(e => e.id_food === idFood)
export const userName = id => (userOf(id) ? userOf(id).name_user : '—')

/* ---------- les 4 entités ---------- */

export const entities = {
  animals: {
    key: 'animals',
    label: 'animal',
    icon: '🦁',
    idField: 'id_animal',
    data: animals,
    title: a => a.species_animal,
    subtitle: a => (zoneOf(a.id_zone) ? zoneOf(a.id_zone).name_zone + ' · ' : '') + a.habitat_animal,
    art: a => ({ image: getAnimalImage(a.species_animal) }),
    fields: [
      { key: 'species_animal', label: 'Species', type: 'text', required: true },
      { key: 'gender_animal', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
      { key: 'habitat_animal', label: 'Habitat', type: 'text' },
      { key: 'id_zone', label: 'Zone', type: 'select', options: zones.map(z => ({ value: z.id_zone, label: z.name_zone })) },
      { key: 'length_animal', label: 'Length (m)', type: 'number', step: '0.01' },
      { key: 'height_animal', label: 'Height (m)', type: 'number', step: '0.01' },
      { key: 'weight_animal', label: 'Weight (kg)', type: 'number', step: '0.01' },
      { key: 'description_animal', label: 'Description', type: 'textarea', full: true }
    ],
    rows: a => [
      { label: 'Species', value: a.species_animal },
      { label: 'Gender', value: a.gender_animal },
      { label: 'Habitat', value: a.habitat_animal },
      { label: 'Length', value: a.length_animal + ' m' },
      { label: 'Height', value: a.height_animal + ' m' },
      { label: 'Weight', value: formatWeight(a.weight_animal) },
      { label: 'Description', value: a.description_animal, full: true }
    ],
    related: a => {
      const zone = zoneOf(a.id_zone)
      return [
        {
          title: 'Lives in',
          items: zone ? [{ label: zone.name_zone, note: zone.place_zone, to: '/zones/' + zone.id_zone }] : []
        },
        {
          title: 'Diet',
          items: dietOf(a.id_animal).map(e => ({
            label: foodOf(e.id_food).name_food,
            note: e.daily_quantity_kg + ' kg / day',
            to: '/foods/' + e.id_food
          }))
        }
      ]
    }
  },

  zones: {
    key: 'zones',
    label: 'zone',
    icon: '🗺️',
    idField: 'id_zone',
    data: zones,
    title: z => z.name_zone,
    subtitle: z => z.theme_zone + ' · ' + z.place_zone,
    art: z => ({ image: zoneImage(z.name_zone), emoji: zoneEmoji(z.id_zone), background: zoneBackground(z.id_zone) }),
    fields: [
      { key: 'name_zone', label: 'Name', type: 'text', required: true },
      { key: 'theme_zone', label: 'Theme', type: 'text' },
      { key: 'place_zone', label: 'Location', type: 'text' },
      { key: 'height_zone', label: 'Height (m)', type: 'number', step: '0.01' },
      { key: 'description_zone', label: 'Description', type: 'textarea', full: true }
    ],
    rows: z => [
      { label: 'Name', value: z.name_zone },
      { label: 'Theme', value: z.theme_zone },
      { label: 'Location', value: z.place_zone },
      { label: 'Height', value: z.height_zone + ' m' },
      { label: 'Description', value: z.description_zone, full: true }
    ],
    related: z => [
      {
        title: 'Animals living here',
        items: animals
          .filter(a => a.id_zone === z.id_zone)
          .map(a => ({ label: a.species_animal, note: a.gender_animal, to: '/animals/' + a.id_animal }))
      }
    ]
  },

  foods: {
    key: 'foods',
    label: 'food',
    icon: '🥬',
    idField: 'id_food',
    data: foods,
    title: f => f.name_food,
    subtitle: f => money(f.price_food) + ' per unit',
    art: f => ({ image: foodImage(f.name_food), emoji: '🥬', background: 'linear-gradient(135deg, #5f7a2e, #a7c957)' }),
    fields: [
      { key: 'name_food', label: 'Name', type: 'text', required: true },
      { key: 'price_food', label: 'Price (€)', type: 'number', step: '0.01' },
      { key: 'quantity_food', label: 'Quantity in stock', type: 'number', step: '1' },
      { key: 'weight_food', label: 'Weight per unit (kg)', type: 'number', step: '0.01' },
      { key: 'description_food', label: 'Description', type: 'textarea', full: true }
    ],
    rows: f => [
      { label: 'Name', value: f.name_food },
      { label: 'Price', value: money(f.price_food) },
      { label: 'In stock', value: f.quantity_food + ' units' },
      { label: 'Weight per unit', value: f.weight_food + ' kg' },
      { label: 'Description', value: f.description_food, full: true }
    ],
    related: f => [
      {
        title: 'Eaten by',
        items: eatersOf(f.id_food).map(e => ({
          label: animalOf(e.id_animal).species_animal,
          note: e.daily_quantity_kg + ' kg / day',
          to: '/animals/' + e.id_animal
        }))
      }
    ]
  },

  purchases: {
    key: 'purchases',
    label: 'purchase',
    icon: '🎟️',
    idField: 'id_ticket',
    data: purchases,
    title: p => 'Purchase #' + p.id_ticket,
    subtitle: p => p.quantity_ticket + ' × ' + cleanType(p.ticket_type) + ' · ' + formatDate(p.payement_date),
    fields: [
      { key: 'ticket_type', label: 'Ticket type', type: 'select', options: TICKET_TYPES, read: v => cleanType(v) },
      { key: 'quantity_ticket', label: 'Quantity', type: 'number', step: '1' },
      { key: 'total_amount', label: 'Total amount (€)', type: 'number', step: '0.01' },
      { key: 'payement_method', label: 'Payment method', type: 'select', options: ['Credit Card', 'Cash'] },
      { key: 'payement_date', label: 'Payment date', type: 'datetime-local', read: v => v.replace(' ', 'T').slice(0, 16) },
      { key: 'id_user', label: 'Customer', type: 'select', options: users.map(u => ({ value: u.id_user, label: u.name_user })) }
    ],
    rows: p => [
      { label: 'Ticket type', value: cleanType(p.ticket_type) },
      { label: 'Quantity', value: p.quantity_ticket },
      { label: 'Unit price', value: money(p.total_amount / p.quantity_ticket) },
      { label: 'Total amount', value: money(p.total_amount) },
      { label: 'Payment method', value: p.payement_method },
      { label: 'Payment date', value: formatDate(p.payement_date) },
      { label: 'Customer', value: userName(p.id_user) }
    ],
    related: () => []
  }
}
