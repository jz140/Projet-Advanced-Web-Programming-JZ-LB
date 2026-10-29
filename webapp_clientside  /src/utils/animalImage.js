import defaultAnimal from '@/assets/animals_images/default-animal.jpg'

// Photo d'un animal (ex. "Blue Whale" -> Blue_Whale.jpg), image par défaut sinon
export function getAnimalImage(species) {
  try {
    return require('@/assets/animals_images/' + species.replaceAll(' ', '_') + '.jpg')
  } catch (error) {
    return defaultAnimal
  }
}
