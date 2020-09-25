const { Router } = require('express');
const { Song, Album, Artist, Library} = require('../models');
const { Op } = require('sequelize');

let router = Router();

router.route('/')

/* Get all songs */
.get(async (req, res) => {
    const allSongs = await Song.findAll({
        include: [
            {
                model: Artist,
                attributes: ['artistName'],
                required: true
            },
            {
                model: Album,
                attributes: ['albumName'],
                required: true
            }
        ],
        raw: true
    });
    return res.json(allSongs);
})

/* Add a song to the database */
.post(async (req, res) => {
    try {
        const newSong = await Song.create(req.body);
        return res.status(201).json({ newSong });
    }
    catch(err) {
        return res.status(500).json({ error: err.message });
    }
});

router.route('/:id')

/* Get a song by id */
.get (async (req, res) => {
    try {
        if (Object.keys(req.query)[0] == "playlist") {
            const songsInPlaylist = await Song.findAll({
                include: [
                    {
                        model: Library,
                        attributes: [],
                        where: {
                            playlistId: req.query.playlist,
                            songId: { [Op.ne]: req.params.id }
                        }
                    },
                    {
                        model: Artist,
                        attributes: ["artistName"],
                        required: true,
                    },
                    {
                        model: Album,
                        attributes: ["albumName"],
                        required: true,
                    }
                ],
                raw: true
            })
            return res.status(200).send(songsInPlaylist);
        } else if (Object.keys(req.query)[0] == "artist") {
            const artist = await Artist.findByPk(req.query.artist);
            const songsOfArtist = await artist.getSongs({
                where: {
                    id: { [Op.ne]: req.params.id },
                },
                include: [
                    {
                        model: Artist,
                        attributes: ["artistName"],
                        required: true,
                    },
                    {
                        model: Album,
                        attributes: ["albumName"],
                        required: true,
                    }
                ],
                raw: true
            });
            return res.status(200).json(songsOfArtist);
        } else if (Object.keys(req.query)[0] == "album") {
            const album = await Album.findByPk(req.query.album);
            const songsOfAlbum = await album.getSongs({
                where: {
                    id: { [Op.ne]: req.params.id },
                },
                include: [
                    {
                        model: Artist,
                        attributes: ["artistName"],
                        required: true,
                    },
                    {
                        model: Album,
                        attributes: ["albumName"],
                        required: true,
                    }
                ],
                raw: true
            });
            return res.status(200).json(songsOfAlbum);
        }
        else {
          const specSong = await Song.findByPk(req.params.id, {
            include: [
              {
                model: Artist,
                attributes: ["artistName"],
                required: true,
              },
              {
                model: Album,
                attributes: ["albumName"],
                required: true,
              },
            ],
            raw: true,
          });
          return res.status(200).json({ specSong });
        }
    }
    catch(err) {
        return res.status(500).json({ error: err.message });
    }
})

/* Edit a song by its unique identifier */
.put(async (req, res) =>{
    try {
        const [updated] = await Song.update(req.body, { where: { id: req.params.id }});
        if (updated) {
            const updatedSong = await Album.findByPk(req.params.id);
            return res.status(200).json({ updatedSong });
        }
        throw new Error('No such song');
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
})

/* Delete a song using its unique identifier */
.delete(async (req, res) =>{
    try {
        const deleted = await Song.destroy({ where: { id: req.params.id } });
        if (deleted) {
            return res.status(204).send('Deleted Successfully');
        }
        throw new Error('No such song')
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;