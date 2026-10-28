// Images des zones, de la nourriture et des billets.
// Même principe que animalImage.js : on essaie de charger le fichier, et
// si il n'existe pas on renvoie null (la page affiche alors l'emoji de secours).
//
// Dossiers à créer dans src/assets/ :
//   zone_image/    ->  Aquarium.jpg, Savannah.jpg, Australian_Outback.jpg ...  (name_zone, espaces -> _)
//   food_image/    ->  Meat.jpg, Fish.jpg, Aquatic_Plants.jpg ...             (name_food, espaces -> _)
//   home_image/    ->  keeper.jpg                                              (bloc "Become a Keeper for a Day")
// Formats acceptés : .jpg .jpeg .png .webp

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

function firstFound(load) {
  for (const ext of EXTENSIONS) {
    try {
      return load(ext)
    } catch (error) {
      // fichier absent : on essaie l'extension suivante
    }
  }
  return null
}

const fileName = text => text.replaceAll(' ', '_')

export function zoneImage(nameZone) {
  const name = fileName(nameZone)
  return firstFound(ext => require('@/assets/zone_image/' + name + ext))
}

export function homeImage(name) {
  return firstFound(ext => require('@/assets/home_image/' + name + ext))
}

export function foodImage(nameFood) {
  const name = fileName(nameFood)
  return firstFound(ext => require('@/assets/food_image/' + name + ext))
}
