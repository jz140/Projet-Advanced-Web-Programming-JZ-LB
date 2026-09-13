CREATE DATABASE IF NOT EXISTS zoo;
USE zoo;

DROP TABLE IF EXISTS ANIMAL;
DROP TABLE IF EXISTS USER;
DROP TABLE IF EXISTS ZONE;
DROP TABLE IF EXISTS EMPLOYEE;
DROP TABLE IF EXISTS ENCLOSURE;
DROP TABLE IF EXISTS EAT;
DROP TABLE IF EXISTS INTERACT;
DROP TABLE IF EXISTS TICKET;
DROP TABLE IF EXISTS FOOD;

CREATE TABLE ZONE (
    id_zone INT AUTO_INCREMENT PRIMARY KEY,
    name_zone VARCHAR(100) NOT NULL,
    description_zone TEXT,
    theme_zone VARCHAR(100),
    place_zone VARCHAR(100),
    height_zone DECIMAL(10, 2)
);

CREATE TABLE FOOD (
    id_food INT AUTO_INCREMENT PRIMARY KEY,
    name_food VARCHAR(100) NOT NULL,
    description_food TEXT,
    price_food DECIMAL(10, 2),
    quantity_food INT,
    weight_food DECIMAL(10, 2)
);

CREATE TABLE USER (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    function_user VARCHAR(100),
    name_user VARCHAR(100) NOT NULL,
    gender_user VARCHAR(20),
    email_user VARCHAR(150) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL
);

CREATE TABLE ANIMAL (
    id_animal INT AUTO_INCREMENT PRIMARY KEY,
    species_animal VARCHAR(100) NOT NULL,
    gender_animal VARCHAR(20),
    habitat_animal VARCHAR(100),
    description_animal TEXT,
    length_animal DECIMAL(10, 2),
    height_animal DECIMAL(10, 2),
    weight_animal DECIMAL(10, 2),
    id_zone INT NOT NULL,
    CONSTRAINT fk_animal_zone FOREIGN KEY (id_zone) REFERENCES ZONE(id_zone) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TICKET (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    payement_date DATETIME NOT NULL,
    quantity_ticket INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payement_method VARCHAR(50),
    ticket_type VARCHAR(50),
    id_user INT NOT NULL,
    CONSTRAINT fk_ticket_user FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE EAT (
    id_animal INT NOT NULL,
    id_food INT NOT NULL,
    PRIMARY KEY (id_animal, id_food),
    CONSTRAINT fk_eat_animal FOREIGN KEY (id_animal) REFERENCES ANIMAL(id_animal) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_eat_food FOREIGN KEY (id_food) REFERENCES FOOD(id_food) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE INTERACT (
    id_animal INT NOT NULL,
    id_user INT NOT NULL,
    PRIMARY KEY (id_animal, id_user),
    CONSTRAINT fk_interact_animal FOREIGN KEY (id_animal) REFERENCES ANIMAL(id_animal) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_interact_user FOREIGN KEY (id_user) REFERENCES USER(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);



-- user and her various roles--
INSERT INTO USER (id_user, function_user, name_user, gender_user, email_user, password_user) VALUES
(1, 'Veterinarian', 'Jean Dupont', 'Male', 'jean.dupont@zoo.com', 'password123'),
(2, 'Keeper', 'Marie Curie', 'Female', 'marie.curie@zoo.com', 'password123'),
(3, 'Biologist', 'Pierre Martin', 'Male', 'pierre.martin@zoo.com', 'password123'),
(4, 'Zoo Manager', 'Sophie Bernard', 'Female', 'sophie.bernard@zoo.com', 'password123'),
(5, 'Cleaner', 'Luc Thomas', 'Male', 'luc.thomas@zoo.com', 'password123'),
(6, 'Security Officer', 'Julie Petit', 'Female', 'julie.petit@zoo.com', 'password123'),
(7, 'Nutritionist', 'Antoine Robert', 'Male', 'antoine.robert@zoo.com', 'password123'),
(8, 'Guide', 'Clara Richard', 'Female', 'clara.richard@zoo.com', 'password123'),
(9, 'Maintenance Worker', 'David Durand', 'Male', 'david.durand@zoo.com', 'password123'),
(10, 'Visitor', 'Paul Moreau', 'Male', 'paul.moreau@visitor.com', 'password123');

-- zone for animals --
INSERT INTO ZONE (id_zone, name_zone, description_zone, theme_zone, place_zone, height_zone) VALUES
(1, 'Aquarium', 'Zone dedicated to aquatic animals and marine life', 'Marine Life', 'Sector A', 8.00),
(2, 'Savannah', 'African grassland habitat with large mammals', 'African Savannah', 'Sector B', 4.50),
(3, 'Jungle', 'Dense tropical forest habitat', 'Tropical Jungle', 'Sector C', 12.00),
(4, 'Desert', 'Hot and dry habitat for desert animals', 'Desert', 'Sector D', 5.00),
(5, 'Arctic', 'Cold habitat for animals living in polar regions', 'Polar', 'Sector E', 6.00),
(6, 'Australian Outback', 'Australian habitat with unique native species', 'Outback', 'Sector F', 3.50),
(7, 'Mountain', 'Mountainous habitat for animals living at high altitudes', 'Mountain', 'Sector G', 10.00),
(8, 'Rainforest', 'Warm and humid tropical forest habitat', 'Tropical Rainforest', 'Sector H', 14.00),
(9, 'Wetlands', 'Habitat containing rivers, lakes and marshes', 'Wetlands', 'Sector I', 3.00),
(10, 'Farm', 'Domestic animal zone representing a traditional farm', 'Farm Animals', 'Sector J', 2.50);

 -- food -- 
 INSERT INTO FOOD (id_food, name_food, description_food, price_food, quantity_food, weight_food) VALUES
(1, 'Meat', 'Fresh beef and chicken for carnivores', 120.50, 250, 25.00),
(2, 'Fish', 'Herring, mackerel and capelin for aquatic animals', 85.00, 400, 20.00),
(3, 'Grass', 'Fresh green forage and grassland turf', 15.00, 1500, 50.00),
(4, 'Leaves', 'Eucalyptus, acacia and fresh tree branches', 35.00, 300, 10.00),
(5, 'Fruits', 'Assorted tropical fruits (bananas, apples, melons)', 45.00, 600, 15.00),
(6, 'Insects', 'Live crickets, mealworms and locusts', 60.00, 100, 2.00),
(7, 'Bamboo', 'Fresh bamboo shoots and stalks', 90.00, 200, 30.00),
(8, 'Seeds', 'Mixed grains, sunflower seeds and nuts', 25.00, 800, 25.00),
(9, 'Aquatic Plants', 'Water hyacinths and aquatic vegetation', 30.00, 350, 15.00),
(10, 'Hay', 'Dry meadow hay bales for herbivores', 18.00, 1200, 40.00);

INSERT INTO ANIMAL (id_animal, name_animal, species_animal, gender_animal, habitat_animal, description_animal, length_animal, height_animal, weight_animal, id_zone) VALUES
-- Aquarium (Zone 1)
(1, 'Great White Shark', 'Female', 'Ocean', 'Large marine predator found in temperate oceans', 5.20, 1.40, 1100.00, 1),
(2,  'Blue Whale', 'Female', 'Ocean', 'Largest known animal on Earth', 25.00, 4.00, 120000.00, 1),
(3,  'Bottlenose Dolphin', 'Male', 'Ocean', 'Intelligent marine mammal known for social behavior', 3.50, 1.20, 300.00, 1),
(4, 'Octopus', 'Female', 'Ocean', 'Highly intelligent marine animal with eight arms', 1.50, 0.50, 15.00, 1),
(5,  'Sea Turtle', 'Female', 'Ocean', 'Marine reptile that spends most of its life in the sea', 1.20, 0.60, 90.00, 1),

-- Savannah (Zone 2)
(6,  'Lion', 'Male', 'Savannah', 'Large African carnivore living in social groups', 2.50, 1.20, 190.00, 2),
(7,  'Zebra', 'Female', 'Savannah', 'African herbivore recognized by its black and white stripes', 2.40, 1.40, 350.00, 2),
(8,  'Giraffe', 'Female', 'Savannah', 'Tall African herbivore with a very long neck', 4.50, 5.00, 800.00, 2),
(9,  'Elephant', 'Male', 'Savannah', 'Large African mammal with a trunk and large ears', 6.00, 3.20, 5000.00, 2),
(10, 'Cheetah', 'Female', 'Savannah', 'Fast African predator specialized for high-speed hunting', 2.20, 0.90, 60.00, 2),

-- Jungle (Zone 3)
(11,  'Orangutan', 'Male', 'Tropical Jungle', 'Intelligent arboreal ape living in tropical forests', 1.50, 1.20, 80.00, 3),
(12, 'Toucan', 'Female', 'Tropical Jungle', 'Colorful tropical bird with a large bill', 0.50, 0.20, 0.60, 3),
(13, 'Sloth', 'Male', 'Tropical Jungle', 'Slow-moving mammal that spends most of its time in trees', 0.70, 0.50, 6.00, 3),
(14,  'Giant Panda', 'Female', 'Bamboo Forest', 'Bear species that mainly feeds on bamboo', 1.50, 0.90, 100.00, 3),
(15,  'Macaw', 'Male', 'Tropical Jungle', 'Large colorful parrot native to tropical forests', 0.90, 0.40, 1.20, 3),

-- Desert (Zone 4)
(16,  'Scorpion', 'Male', 'Desert', 'Small desert predator with venomous claws and tail', 0.15, 0.08, 0.03, 4),
(17, 'Dromedary Camel', 'Female', 'Desert', 'Desert mammal adapted to extreme heat and limited water', 3.00, 2.10, 600.00, 4),
(18, 'Fennec Fox', 'Female', 'Desert', 'Small desert fox with very large ears', 0.40, 0.25, 1.50, 4),
(19,  'Desert Tortoise', 'Male', 'Desert', 'Slow-moving reptile adapted to dry environments', 0.35, 0.20, 10.00, 4),
(20, 'Meerkat', 'Female', 'Desert', 'Small social mammal that lives in underground burrows', 0.35, 0.25, 0.80, 4),

-- Arctic (Zone 5)
(21,  'Polar Bear', 'Male', 'Arctic', 'Large Arctic predator adapted to cold environments', 2.50, 1.60, 500.00, 5),
(22, 'Walrus', 'Male', 'Arctic Ocean', 'Large marine mammal with tusks and thick skin', 3.20, 1.50, 1000.00, 5),
(23,  'Penguin', 'Male', 'Antarctic', 'Flightless bird adapted to cold marine environments', 0.90, 0.70, 15.00, 5),
(24, 'Arctic Fox', 'Female', 'Arctic Tundra', 'Small fox adapted to extremely cold climates', 0.75, 0.30, 5.00, 5),
(25, 'Harbor Seal', 'Female', 'Arctic Ocean', 'Marine mammal that lives in cold coastal waters', 1.80, 0.80, 100.00, 5),

-- Australian Outback (Zone 6)
(26,  'Kangaroo', 'Female', 'Australian Outback', 'Large Australian marsupial known for powerful jumping', 1.50, 1.80, 70.00, 6),
(27,  'Wombat', 'Male', 'Australian Outback', 'Strong burrowing marsupial native to Australia', 1.00, 0.50, 30.00, 6),
(28, 'Koala', 'Female', 'Australian Forest', 'Arboreal Australian marsupial that mainly eats eucalyptus leaves', 0.80, 0.60, 10.00, 6),
(29, 'Emu', 'Male', 'Australian Outback', 'Large flightless bird native to Australia', 1.90, 1.60, 45.00, 6),
(30, 'Tasmanian Devil', 'Female', 'Australian Forest', 'Small carnivorous marsupial native to Tasmania', 0.65, 0.30, 8.00, 6),

-- Mountain (Zone 7)
(31, 'Mountain Goat', 'Female', 'Mountain', 'Mountain herbivore adapted to steep rocky terrain', 1.40, 0.90, 90.00, 7),
(32, 'Snow Leopard', 'Male', 'Mountain', 'Rare big cat living in high mountain ranges', 2.20, 0.70, 55.00, 7),
(33, 'Red Panda', 'Female', 'Mountain Forest', 'Small mammal living in high-altitude forests', 0.60, 0.30, 5.00, 7),
(34, 'Alpine Marmot', 'Male', 'Mountain', 'Small mountain rodent that lives in burrows', 0.55, 0.20, 5.00, 7),
(35, 'Golden Eagle', 'Female', 'Mountain', 'Large bird of prey found in mountainous regions', 0.90, 0.70, 5.00, 7),

-- Rainforest (Zone 8)
(36,  'Jaguar', 'Male', 'Tropical Rainforest', 'Powerful spotted predator found in tropical forests', 2.00, 0.75, 100.00, 8),
(37,'Poison Dart Frog', 'Female', 'Tropical Rainforest', 'Small brightly colored frog found in humid forests', 0.05, 0.03, 0.01, 8),
(38,  'Chimpanzee', 'Male', 'Tropical Rainforest', 'Intelligent great ape living in social groups', 1.20, 0.80, 60.00, 8),
(39,  'Green Iguana', 'Female', 'Tropical Rainforest', 'Large herbivorous lizard living in tropical forests', 1.50, 0.50, 8.00, 8),
(40, 'Capybara', 'Male', 'Tropical Rainforest', 'Largest living rodent and a strong swimmer', 1.20, 0.50, 55.00, 8),

-- Wetlands (Zone 9)
(41, 'Flamingo', 'Female', 'Wetlands', 'Tall pink water bird with long legs', 1.10, 1.30, 3.00, 9),
(42,  'Hippopotamus', 'Male', 'River', 'Large semi-aquatic mammal that spends much time in water', 3.50, 1.50, 1500.00, 9),
(43, 'Crocodile', 'Male', 'Wetlands', 'Large aquatic reptile and powerful predator', 4.50, 1.00, 500.00, 9),
(44, 'Pelican', 'Female', 'Wetlands', 'Large water bird with a distinctive throat pouch', 1.60, 0.80, 6.00, 9),
(45, 'Otter', 'Female', 'River', 'Playful semi-aquatic mammal and skilled swimmer', 1.00, 0.40, 10.00, 9),

-- Farm (Zone 10)
(46,  'Cow', 'Female', 'Farm Meadow', 'Domestic dairy cow raised in educational farm area', 2.20, 1.50, 650.00, 10),
(47,  'Goat', 'Female', 'Farm Pen', 'Friendly domestic goat that interacts with visitors', 1.20, 0.80, 45.00, 10),
(48, 'Sheep', 'Male', 'Farm Meadow', 'Woolly domestic sheep kept in family grazing pasture', 1.30, 0.90, 70.00, 10),
(49,  'Chicken', 'Female', 'Poultry Coop', 'Domestic egg-laying hen in farm poultry enclosure', 0.40, 0.35, 2.50, 10),
(50,  'Pig', 'Male', 'Farm Barn', 'Intelligent farm pig in designated mud and rest area', 1.50, 0.80, 180.00, 10);

INSERT INTO TICKET (id_ticket, payement_date, quantity_ticket, total_amount, payement_method, ticket_type, id_user) VALUES
(1, '2026-09-01 10:15:00', 2, 50.00, 'Credit Card', 'Adult Pass', 10),
(2, '2026-09-02 11:30:00', 1, 15.00, 'Cash', 'Child Pass', 10),
(3, '2026-09-05 09:45:00', 4, 90.00, 'Credit Card', 'Family Pass', 10),
(4, '2026-09-08 14:00:00', 2, 60.00, 'Cash', 'Adult Pass Pass', 10),
(5, '2026-09-10 16:20:00', 1, 25.00, 'Credit Card', 'Adult Pass', 10);