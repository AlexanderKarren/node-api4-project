const express = require('express');

const Blogs = require('./postDb.js')

const router = express.Router();

router.get('/', (req, res) => {
  Blogs.get().then(response => {
    res.status(200).json(response);
  })
  .catch(error => res.status(500).json({ errorMessage: "Could not access data"}))
});

router.get('/:id', (req, res) => {
  Blogs.getById(req.params.id).then(response => {
    if (response) res.status(200).json(response);
    else res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}`})
  })
  .catch(error => res.status(500).json({ errorMessage: "Could not access data" }))
});

router.delete('/:id', validatePostId, (req, res) => {
  Blogs.remove(req.params.id).then(response => res.status(200).json(response))
  .catch(error => res.status(500).json({ errorMessage: "Could not access data" }))
});

router.put('/:id', validatePostId, (req, res) => {
  console.log(req.body);
  Blogs.update(req.params.id, req.body).then(response => res.status(200).json(response))
  .catch(error => res.status(500).json({ errorMessage: "Could not access data" }))
});

// custom middleware

function validatePostId(req, res, next) {
  Blogs.getById(req.params.id).then(response => {
    if (response) next();
    else res.status(404).json( { errorMessage: `Could not find blogpost with id ${req.params.id}`})
  })
  .catch(error => res.status(500).json({ errorMessage: "Could not access data" }))
}

module.exports = router;
