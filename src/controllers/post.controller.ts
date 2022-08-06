import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

class PostController {
    
    public async getPosts(req: Request, res: Response, next: NextFunction) {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        const posts = result.data;
        return res.status(200).json({   
            data: posts
        });
    }
    
}

const postController = new PostController();
export { postController };