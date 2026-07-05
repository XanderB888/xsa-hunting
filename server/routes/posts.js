const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');

// GET /api/posts — all posts, newest first, with username
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT posts.*, users.username,
        COUNT(comments.id) AS comment_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN comments ON comments.post_id = posts.id
      GROUP BY posts.id, users.username
      ORDER BY posts.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id — one post with its comments
router.get('/:id', authenticate, async (req, res) => {
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
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      photo, caption, location, species, sex, distance,
      shot_image, shot_x, shot_y, time_of_day, wind, weather,
      firearm_brand, caliber, ammo, grain
    } = req.body;

    const userId = req.user.id;

    const result = await pool.query(`
      INSERT INTO posts
        (user_id, photo, caption, location, species, sex, distance,
         shot_image, shot_x, shot_y, time_of_day, wind, weather,
         firearm_brand, caliber, ammo, grain)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      RETURNING *
    `, [userId, photo, caption, location, species, sex, distance,
        shot_image, shot_x, shot_y, time_of_day, wind, weather,
        firearm_brand, caliber, ammo, grain]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const check = await pool.query('SELECT user_id FROM posts WHERE id = $1', [id]);

    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (check.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own posts' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// POST /api/posts/:id/comments — add a comment to a post
router.post('/:id/comments', authenticate, async (req, res) => {
  try {
    const { id } = req.params;          // the post id
    const { text } = req.body;
    const userId = req.user.id;

    const result = await pool.query(`
      INSERT INTO comments (post_id, user_id, text)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [id, userId, text]);

    // join to get the username for the returned comment
    const commentWithUser = await pool.query(`
      SELECT comments.*, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.id = $1
    `, [result.rows[0].id]);

    res.status(201).json(commentWithUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;