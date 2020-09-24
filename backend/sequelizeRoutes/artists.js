const { Router } = require('express');
const { Artist } = require('../models');

let router = Router();

router
.get('/', async (req, res) => {
    const allArtists = await Artist.findAll();
    return res.json(allArtists);
});

module.exports = router;