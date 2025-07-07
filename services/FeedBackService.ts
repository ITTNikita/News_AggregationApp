import { BASE_URL } from "../config/constant";
import axios from 'axios';
import { logMessage } from "../logs/LogService";
export class FeedBackService {
    
    static async likeAndDisLikeArticle(userId:string,articleId:string,userChoice:string):Promise<boolean>
    {   logMessage(`User Feedback: ${userId} - ${articleId} - ${userChoice}`);    
        const response=await axios.post(`${BASE_URL}/feedback`,{
            userId,articleId,userChoice
        });
        return true;
    }
    static async reportArticle(userId:string,articleId:string):Promise<boolean>
    {
        logMessage(`Reporting article: ${userId} - ${articleId}`);
        console.log("report the article");
        const response = await axios.post(`${BASE_URL}/feedback/ReportArticle`,{
          userId,articleId
        });
        return true;
    }
}
