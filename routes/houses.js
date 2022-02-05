var express = require('express');
var router = express.Router();
const { getHouses } = require('../lib/data');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const houses = await getHouses();
  res.json(houses);
});

module.exports = router;