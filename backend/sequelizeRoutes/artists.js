const { Router } = require('express');
const { Artist } = require('../models');

let router = Router();

router.route('/'
/* Get all artists */)
.get(async (req, res) => {
    const allArtists = await Artist.findAll();
    return res.json(allArtists);
})

/* Add an artist to the database */
.post(async (req, res) => {
    try {
        const newArtist = await Artist.create(req.body);
        return res.status(201).json({ newArtist });
    }
    catch(err) {
        return res.status(500).json({ error: err.message });
    }
});

router.route('/:id')
/* Get an artist by id */
.get(async (req, res) => {
    try {
        const specArtist = await Artist.findByPk(req.params.id);
        return res.status(200).json({ specArtist });
    }
    catch(err) {
        return res.status(500).json({ error: err.message });
    }
})

/* Edit an artist by its unique identifier */
.put(async (req, res) => {
    try {
        const [updated] = await Artist.update(req.body, { where: { id: req.params.id }});
        if (updated) {
            const updatedArtist = await Artist.findByPk(req.params.id);
            return res.status(200).json({ updatedArtist });
        }
        throw new Error('No such artist');
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
})

/* Delete an artist using its unique identifier */
.delete(async (req, res) => {
    try {
        const deleted = await Artist.destroy({ where: { id: req.params.id } });
        if (deleted) {
            return res.status(204).send('Deleted Successfully');
        }
        throw new Error('No such artist')
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;