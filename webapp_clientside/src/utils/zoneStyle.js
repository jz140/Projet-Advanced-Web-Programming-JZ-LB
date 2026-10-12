const styles = {
  1: { emoji: '🐋', from: '#0b4f6c', to: '#1d8fa8' },
  2: { emoji: '🦁', from: '#a8681a', to: '#e0a43a' },
  3: { emoji: '🐒', from: '#1b4332', to: '#40916c' },
  4: { emoji: '🐪', from: '#9a5a2e', to: '#d9a066' },
  5: { emoji: '🐧', from: '#3a6b8c', to: '#8fc3de' },
  6: { emoji: '🦘', from: '#9c4a1a', to: '#d97706' },
  7: { emoji: '🏔️', from: '#46566b', to: '#8a9bb0' },
  8: { emoji: '🐆', from: '#14532d', to: '#2d9a5f' },
  9: { emoji: '🦩', from: '#2f6f6a', to: '#c9788a' },
  10: { emoji: '🐄', from: '#5f7a2e', to: '#a7c957' }
}

const fallback = { emoji: '🌿', from: '#1e3a2b', to: '#2d6a4f' }

export function zoneEmoji(id) {
  return (styles[id] || fallback).emoji
}

export function zoneBackground(id) {
  const s = styles[id] || fallback
  return `linear-gradient(135deg, ${s.from}, ${s.to})`
}