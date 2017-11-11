const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/cerveja', (req, res) => {
  res.send('vamos beber');
});

module.exports = router;
