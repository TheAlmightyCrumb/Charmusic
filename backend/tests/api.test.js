const request = require('supertest');
const app = require('../app');
const { Song, Album, Artist } = require('../models');

const artistMock = [
    {
      id: 1,
      artistName: "Jake",
      coverImg: "IMAGE",
      uploadedAt: "2020-09-24",
      createdAt: "2020-09-24 17:03:00",
      updatedAt: "2020-09-24 17:03:00"
    },
    {
      id: 2,
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

  it('Can get a single artist', async () => {
    await request(app).post('/artists').send(artistMock[0]);
    const { body: getSingleArtistResponseBody } = await request(app).get(`/artists/${artistMock[0].id}`);
    expect(getSingleArtistResponseBody.artist.artistName).toBe(artistMock[0].artistName);
    expect(getSingleArtistResponseBody.artist.id).toBe(artistMock[0].id);
  })
})