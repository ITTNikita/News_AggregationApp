import { askQuestion } from "../utils/readlineUtils";
import { User } from "../models/User";
import {FeedBackService} from '../services/FeedBackService';

export class FeedBackController {
    static async likeAndDisLikeArticle(user:User){
        const articleId= await askQuestion('enter the article id to like or dislike:');
        const userChoice = await askQuestion('enter 1 to like or 0 to dislike: ');
        await FeedBackService.likeAndDisLikeArticle(user.id,articleId,userChoice);
        console.log('User choice submitted');
    }

    static async reportArticle(user:User){
        const articleId = await askQuestion('Enter the Article Id to Report:');
        console.log('article id',articleId)
        await FeedBackService.reportArticle(user.id,articleId);
    }
}
