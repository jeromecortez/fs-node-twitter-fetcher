import express from 'express';
import { getTweets } from '../../controller/twitter';
import { validateTwitter, validate } from '../../middleware/twitter/validator'
const router = express.Router();

router.get('/', validateTwitter(), validate, getTweets);
export default router;