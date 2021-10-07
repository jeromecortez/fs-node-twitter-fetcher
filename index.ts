import express, { json, urlencoded } from 'express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import twitter from './routes/twitter';

const app = express();
app.use(json({ limit: '10kb' }));
app.use(urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/tweets', twitter);

// swagger
const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Material UI Twitter API',
            version: '0.1.2',
            description: 'Simple API connected to twitter for fetching user tweetrs'
        }
    },
    apis: ['./routes/**/*.yaml']
}
const specs = swaggerJsDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Connection establisted at port ${PORT}`);
    });
}

export default app;