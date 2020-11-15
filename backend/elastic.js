require("dotenv").config();
const { Client } = require("@elastic/elasticsearch");
const { Song, Album, Artist, Playlist, Library } = require("./models");

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD,
  },
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASS,
  },
});

// const breakingBad = [
//   {
//     character: "Walter White",
//     portrayer: "Bryan Cranston"
//   },
//   {
//     character: "Jessie Pinkman",
//     portrayer: "Aaron Paul",
//   },
//   {
//     character: "Gus Fring",
//     portrayer: "Giancarlo Esposito",
//   }
// ]

const run = async () => {
  // client.msearch({
  //   body: [
  //     { index: "songs" },
  //     { query: { match: { artist: { query: "Aerosmith", fuzziness: "auto" } } } },

  //     { index: "artists" },
  //     { query: { match: { name: { query: "Imagine", fuzziness: "auto" } } } }
  //   ]
  // })
  // .then(res => res.body.responses.forEach(res => console.log(res.hits.hits)))
  // .catch(e => console.log("Your Error: ", e));

  client
    .search({
      index: "songs",
      body: {
        query: {
          query_string: {
            query: "/.*idi.*/gim",
            fields: ["title", "artist"],
            fuzziness: "auto",
          },
        },
      },
      sort: ["_score"],
      size: 6,
    })
    .then((res) => console.log(res.body.hits.hits));

  // await client.index({
  //   index: "breaking-bad",
  //   id: 1,
  //   body: {
  //     character: "Walter White",
  //     portrayer: "Bryan Cranston",
  //   },
  // });

  // await client.index({
  //   index: "breaking-bad",
  //   id: 2,
  //   body: {
  //     character: "Jessie Pinkman",
  //     portrayer: "Aaron Paul",
  //   },
  // });

  // await client.index({
  //   index: "breaking-bad",
  //   id: 3,
  //   body: {
  //     character: "Gus Fring",
  //     portrayer: "Giancarlo Esposito",
  //   },
  // });

  // breakingBad.forEach((item, index) => {
  //   client.index({
  //     index: "breaking-bad",
  //     id: index + 1,
  //     body: item
  //   })
  //   .then(res => console.log(res))
  //   .catch(e => console.log(e))
  // });

  // const allSongs = await Song.findAll({
  //   include: [
  //     {
  //       model: Artist,
  //       attributes: ['coverImg', 'artistName'],
  //       required: true
  //   }
  //   ]
  // });
  // allSongs.forEach(song => {
  //   client.index({
  //     index: "songs",
  //     id: song.id,
  //     body: {
  //       title: song.title,
  //       length: song.length,
  //       image: song.Artist.coverImg,
  //       artist: song.Artist.artistName
  //     }
  //   })
  // })

  // const allAlbums = await Album.findAll({
  //   include: [
  //     {
  //       model: Artist,
  //       attributes: ['artistName'],
  //       required: true
  //     }
  //   ]
  // });

  // allAlbums.forEach(album => {
  //   client.index({
  //     index: "albums",
  //     id: album.id,
  //     body: {
  //       name: album.albumName,
  //       artist: album.Artist.artistName,
  //       released: album.releasedAt,
  //       image: album.coverImg
  //     }
  //   })
  // })

  // const allArtists = await Artist.findAll();

  // allArtists.forEach(artist => {
  //   client.index({
  //     index: "artists",
  //     id: artist.id,
  //     body: {
  //       name: artist.artistName,
  //       image: artist.coverImg
  //     }
  //   })
  // });

  // const allPlaylists = await Playlist.findAll();
  // allPlaylists.forEach(async playlist => {
  //   const songsInPlaylist = await Song.findAll({
  //     include: [
  //       {
  //         model: Library,
  //         attributes: [],
  //         where: {
  //           playlistId: playlist.id
  //         }
  //       }
  //     ]
  //   });
  //   await client.index({
  //     index: "playlists",
  //     id: playlist.id,
  //     body: {
  //       name: playlist.playlistName,
  //       image: playlist.coverImg,
  //       songs: songsInPlaylist.length
  //     }
  //   })
  // });

  // await client.indices.refresh({ index: "breaking-bad" });
  // await client.indices.refresh({ index: "songs" });
  // await client.indices.refresh({ index: "albums" });
  // await client.indices.refresh({ index: "artists" });
  // await client.indices.refresh({ index: "playlists" });

  // const { body } = await client.search({
  //   index: "breaking-bad",
  //   body: {
  //     query: {
  //       match: { character: "white" },
  //     },
  //   },
  // });

  // console.log(body.hits.hits);
};

run().catch((e) => console.log(e));
