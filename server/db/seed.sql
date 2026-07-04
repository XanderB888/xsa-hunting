INSERT INTO users (username, email, password)
VALUES ('Xander', 'xander@example.com', 'temp_not_hashed_yet');

INSERT INTO posts (user_id, photo, caption, location, species, sex, distance,
  shot_image, shot_x, shot_y, time_of_day, wind, weather,
  firearm_brand, caliber, ammo, grain)
VALUES
(1, 'https://placehold.co/600x400', 'What a walk and stalk to get this Impala',
 'Limpopo, South Africa', 'Impala', 'Ram', 184,
 'https://placehold.co/300x200', 55, 40, 'Early Morning',
 'Little to no wind, 0-5 km/h', 'Sunny, clear skies, 28°C',
 'Howa', '.300 Win Mag', 'Federal Power-Shok Soft Point', 180);

INSERT INTO comments (post_id, user_id, text)
VALUES (1, 1, 'Nice shot placement!');