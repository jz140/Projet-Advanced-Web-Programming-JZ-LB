import purchases from '@/assets/TICKET.json'

// Présentation de chaque billet (le PRIX, lui, vient de TICKET.json)
const details = {
  'Child Pass': {
    id: 'child',
    name: 'Child Ticket',
    ages: '3 to 12 years old included',
    emoji: '🐣',
    perks: ['Full access to zones', 'Animations & animated snacks', 'Fun map included']
  },
  'Adult Pass': {
    id: 'adult',
    name: 'Adult Ticket',
    ages: 'From 13 years old',
    emoji: '🦁',
    popular: true,
    perks: ['Unlimited access to all zones', 'Access to educational shows', 'Skip-the-line entry']
  },
  'Family Pass': {
    id: 'family',
    name: 'Family Pass',
    ages: 'For the whole family',
    emoji: '🐘',
    perks: ['Advantageous combined ticket', 'Interactive mobile guide', '10% off in our restaurants']
  }
}

// "Adult Pass Pass" (faute de frappe dans le JSON) devient "Adult Pass"
export function cleanType(type) {
  return type.replace(/\b(\w+)( \1)+\b/g, '$1')
}

// Prix à l'unité = total_amount / quantity_ticket de l'achat le plus récent de chaque type
export function getTicketTypes() {
  const latest = {}

  purchases.forEach(p => {
    const type = cleanType(p.ticket_type)
    if (!latest[type] || p.payement_date > latest[type].date) {
      latest[type] = {
        date: p.payement_date,
        unit: p.total_amount / p.quantity_ticket
      }
    }
  })

  return Object.keys(details)
    .filter(type => latest[type])
    .map(type => ({
      ...details[type],
      price: Math.round(latest[type].unit * 100) / 100,
      unit: 'per person'
    }))
}