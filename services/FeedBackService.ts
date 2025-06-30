import { BASE_URL } from "../config/constant";
import axios from 'axios';
export class FeedBackService {
    static async likeAndDisLikeArticle(userId:string,articleId:string,userChoice:string):Promise<boolean>
    {       
        const response=await axios.post(`${BASE_URL}/feedback`,{
            params:{userId,articleId,userChoice}
        });
        return true;
    }
    static async reportArticle(userId:string,articleId:string):Promise<boolean>
    {
        console.log("report the article");
        const response = await axios.post(`${BASE_URL}/feedback/ReportArticle`,{
            params:{userId,articleId}
        });
        return true;
    }
}
