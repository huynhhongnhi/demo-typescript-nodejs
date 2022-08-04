import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

// Getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    const result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    const posts: [Post] = result.data;
    return res.status(200).json({
        data: posts
    });
};

export default { getPosts }