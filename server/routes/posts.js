const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/posts — all posts, newest first, with username
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id — one post with its comments
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const postResult = await pool.query(`
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.id = $1
    `, [id]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const commentsResult = await pool.query(`
      SELECT comments.*, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at ASC
    `, [id]);

    const post = postResult.rows[0];
    post.comments = commentsResult.rows;   // bundle comments into the post

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST /api/posts — create a post
router.post('/', async (req, res) => {
  try {
    const {
      user_id, photo, caption, location, species, sex, distance,
      shot_image, shot_x, shot_y, time_of_day, wind, weather,
      firearm_brand, caliber, ammo, grain
    } = req.body;

    const result = await pool.query(`
      INSERT INTO posts
        (user_id, photo, caption, location, species, sex, distance,
         shot_image, shot_x, shot_y, time_of_day, wind, weather,
         firearm_brand, caliber, ammo, grain)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      RETURNING *
    `, [user_id, photo, caption, location, species, sex, distance,
        shot_image, shot_x, shot_y, time_of_day, wind, weather,
        firearm_brand, caliber, ammo, grain]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM posts WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted', post: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;