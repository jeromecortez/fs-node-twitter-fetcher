import { RequestHandler} from 'express';
import axios, { AxiosResponse } from 'axios';
import createHttpError, { HttpError } from 'http-errors';

export const getTweets: RequestHandler = async (req, res) => {
    try {
        const { TWITTER_API_URL, TWITTER_BEARER_TOKEN, TWITTER_API_VERSION } = process.env;
        const twitterIdRes = await axios.get(`${TWITTER_API_URL}${TWITTER_API_VERSION}/users/by/username/${req.query.username}?user.fields=id,profile_image_url,username,name`, 
        {
            headers: {
                Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
            }
        }) as AxiosResponse<{ data: { id: string; name: string; username: string; profile_image_url: string; }}>;
        if ('errors' in twitterIdRes.data ) throw createHttpError(404, 'Twitter user not found')
        const { data: { id } } = twitterIdRes.data;
        const TWEET_QUERY = 'tweet.fields=attachments,author_id,created_at,geo,id,lang,referenced_tweets,reply_settings,source,text,withheld&max_results=9';
        const twitterRes = await axios.get(`${TWITTER_API_URL}${TWITTER_API_VERSION}/users/${id}/tweets?${TWEET_QUERY}`, 
        {
            headers: {
                Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
            }
        }) as AxiosResponse<{ [key: string]: string }>

        if (twitterRes.status === 200) {
            return res.status(200).json({ tweetData: twitterRes.data.data, userData: twitterIdRes.data.data })
        }
    }
    catch (e) {
        if ('status' in e) { 
            const err = e as HttpError;
            res.status(err.status).json(err); 
        }
        else {
            const err = (e as { response: AxiosResponse }).response;
            res.status(err.status).json(err.data);
        }
    }
}