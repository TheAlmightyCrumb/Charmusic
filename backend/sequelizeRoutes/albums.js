const { Router } = require('express');
const { Album, Artist } = require('../models');

let router = Router();

router.route('/')

/* Get all albums */
.get(async (req, res) => {
    const allAlbums = await Album.findAll({ include: [{model: Artist , attributes: ['artistName']}], raw: true});
    return res.json(allAlbums);
})

/* Add an album to the database */
.post(async (req, res) => {
    try {
        const newAlbum = await Album.create(req.body);
        return res.status(201).json({ newAlbum });
    }
    catch(err) {
        return res.status(500).json({ error: err.message });
    }
});

router.route('/:id')

/* Get an album by id */
.get(async (req, res) => {
    try {
        const specAlbum = await Album.findByPk(req.params.id, { include: [{model: Artist , attributes: ['artistName']}], raw: true });
        return res.status(200).json({ specAlbum });
    }
    catch(err) {
        return res.status(500).json({ error: err.message });
    }
})

/* Edit an album by its unique identifier */
.put(async (req, res) =>{
    try {
        const [updated] = await Album.update(req.body, { where: { id: req.params.id }});
        if (updated) {
            const updatedAlbum = await Album.findByPk(req.params.id);
            return res.status(200).json({ updatedAlbum });
        }
        throw new Error('No such artist');
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
})

/* Delete an album using its unique identifier */
.delete(async (req, res) =>{
    try {
        const deleted = await Album.destroy({ where: { id: req.params.id } });
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