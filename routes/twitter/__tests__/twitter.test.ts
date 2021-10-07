import supertest from 'supertest';
import app from '../../../'
describe('Twitter test suite', () => {
    it('GET /twitter with valid username', async () => {
        await supertest(app)
        .get('/tweets?username=elonmusk')
        .expect(200)
        .then((res) => {
            expect('userData' in res.body).toBeTruthy();
            expect('tweetData' in res.body).toBeTruthy();
        })
    })

    it('GET /twitter with no username', async () => {
        await supertest(app)
        .get('/tweets')
        .expect(400)
    })

    it('GET /twitter with valid username and no tweets', async () => {
        await supertest(app)
        .get('/tweets?username=___')
        .expect(200)
        .then((res) => {
            expect('tweetData' in res.body).not.toBeTruthy();
        })
    })
})