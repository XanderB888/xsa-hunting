CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  photo VARCHAR(500),
  caption TEXT,
  location VARCHAR(255),
  species VARCHAR(100),
  sex VARCHAR(50),
  distance INTEGER,
  shot_image VARCHAR(500),
  shot_x NUMERIC,
  shot_y NUMERIC,
  time_of_day VARCHAR(100),
  wind VARCHAR(255),
  weather VARCHAR(255),
  firearm_brand VARCHAR(100),
  caliber VARCHAR(100),
  ammo VARCHAR(255),
  grain INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE (user_id, post_id)
);