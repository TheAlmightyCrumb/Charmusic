const request = require('supertest');
const app = require('../app');
const { Song, Album, Artist } = require('../models');

const artistMock = [
    {
        artistName: "Jake",
        coverImg: "IMAGE",
        uploadedAt: "2020-09-24",
        createdAt: "2020-09-24 17:03:00",
        updatedAt: "2020-09-24 17:03:00"
    },
    {
        artistName: "Aviram",
        coverImg: "IMAGE",
        uploadedAt: "2020-09-24",
        createdAt: "2020-09-24 17:03:00",
        updatedAt: "2020-09-24 17:03:00"
    }
];

describe('artist requests tests', () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it('Can post new artists and get them', async () => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    await request(app).post('/artists').send(artistMock[0]);
    await request(app).post('/artists').send(artistMock[1]);
    const { body } = await request(app).get('/artists');
    console.log(body);
    expect(body.length).toBe(2);
  })

//   it('Can get single artist', async () => {
//     const { body: newArtist } = await request(app).post('/api/artists').send(artistMock);
//     const { body: getSingleArtistResponseBody } = await request(app).get(`/api/artists/${newArtist.id}`);

//     expect(getSingleArtistResponseBody.name).toBe(artistMock.name)
//     expect(getSingleArtistResponseBody.id).toBe(newArtist.id)
//   })
})