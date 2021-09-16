const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add', {Action: 'ADD NEW LINK' });
  });

router.post('/add', isLoggedIn, async (req, res) => {
  let { title, url, description } = req.body;
  title = title.toUpperCase()
  const newLink = {
    title,
    url,
    description,
    user_id:req.user.id
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  req.flash('success', 'Link saved successfully');
  res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
  const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
  res.render('links/list', {links});

});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [id]);
  req.flash('success', 'Link Removed Successfully');
  res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const link = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
  res.render('links/edit', {link: link[0], Action: 'EDIT LINK' });
});

router.post('/edit/:id', isLoggedIn,  async (req, res) => {
  let { title, url, description } = req.body;
  title = title.toUpperCase()
  const { id } = req.params;
  const newLink = {
    title,
    url,  
    description
  };
  await pool.query('UPDATE links SET title = ?, url = ?, description = ? WHERE id = ?', [title, url, description, id]);
  req.flash('success', 'Link to ' + title + ' edit successfully');
  res.redirect('/links');
});

module.exports = router;