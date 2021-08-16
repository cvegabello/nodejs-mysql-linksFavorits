const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add', {Action: 'Add new link Page' });
  });

router.post('/add', async (req, res) => {
  let { title, url, description } = req.body;
  title = title.toUpperCase()
  const newLink = {
    title,
    url,
    description
  };
  await pool.query('INSERT INTO links set ?', [newLink]);
  req.flash('success', 'Link saved successfully');
  res.redirect('/links');
});

router.get('/', async (req, res) => {
  const links = await pool.query('SELECT * FROM links');
  res.render('links/list', {links});

});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [id]);
  req.flash('success', 'Link Removed Successfully');
  res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const link = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
  res.render('links/edit', {link: link[0], Action: 'Edit new link Page' });
});

router.post('/edit/:id', async (req, res) => {
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