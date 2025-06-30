import { ExternalServerService } from '../services/ExternalServerService';
import { askQuestion } from '../utils/readlineUtils';
import { AdminService } from '../services/AdminService';

export class ExternalServerController {
  static async showStatuses() {
    try {
      const servers = await ExternalServerService.fetchStatuses();
      console.log('\nList of external servers:\n');
      servers.forEach((server: { name: string; status: string; lastAccessed: string }, index: number) => {
        console.log(`${index + 1}. ${server.name} - ${server.status} - Last Accessed: ${server.lastAccessed}`);
      });
    } catch (err: any) {
      console.error(' Failed to fetch server statuses:', err.message);
    }
  }

  static async showDetails() {
    try {
      const details = await ExternalServerService.fetchDetails();
      console.log('\nList of external server details:\n');
      details.forEach((server: { name: string; api_key: string }, index: number) => {
        console.log(`${index + 1}. ${server.name} - <${server.api_key}>`);
      });
    } catch (err: any) {
      console.error(' Failed to fetch server details:', err.message);
    }
  }

  static async updateDetails() {
    const id = await askQuestion('Enter the external server ID: ');
    const updatedKey = await askQuestion('Enter the updated API key: ');
    try {
      await ExternalServerService.updateServerKey(id, updatedKey);
      console.log('Server key updated successfully.');
    } catch (err: any) {
      console.error('Failed to update server key:', err.message);
    }
  }

  static async addNewNewsServer() {
    const name = await askQuestion('Enter API name: ');
    const apiurl = await askQuestion('Enter API URL: ');
    const key = await askQuestion('Enter API key: ');
    const article_id = await askQuestion('Enter the Article Id: ');
    const title = await askQuestion('Enter the title:');
    const description =await askQuestion('Enter the Description: ');
    const source_name = await askQuestion('Enter the source name: ');
    const url = await askQuestion('Enter the URL of Article: ');
    const category = await askQuestion('Enter the category: ');
    const dataKey = await askQuestion('Enter the Data Key: ');
    const content = await askQuestion('Enter the content: ');
    const isActiveInput = await askQuestion('Is Active? (1 for Yes, 0 for No): '); 

    const isActive = parseInt(isActiveInput) || 0;
    

    try {
      await ExternalServerService.addNewServer({ name, apiurl, key,article_id,title,description, source_name,url,category,dataKey,content,isActive });
      console.log(' New API server added successfully.');
    } catch (err: any) {
      console.error(' Failed to add new API server:', err.message);
    }
  }

  static async addNewCategory()
  {
    try{
    const category:string = await askQuestion('Enter the new Category:');
    const response = await ExternalServerService.addNewCategory(category);
    console.log(response.message);
    }catch(err)
    {
      console.log("error",err)
    }

  }

  static async hideArticle() {
  console.log("Hide the article");
  console.log('1. Hide the article for all users');
  console.log('2. Hide the category');
  console.log('3. Hide the articles based on specific keyword');
  console.log('4. Back');

  const choice = await askQuestion('Enter your choice from 1 to 4: ');

  switch (choice) {
  

    case '1': {
      const articleId = await askQuestion('Enter the Article ID: ');
      await AdminService.hideArticleGlobally(articleId);
      console.log(`Article ${articleId} hidden for all users`);
      break;
    }

    case '2': {
      const categoryName = await askQuestion('Enter the Category to hide: ');
      await AdminService.hideCategory(categoryName);
      console.log(`Category "${categoryName}" hidden`);
      break;
    }

    case '3': {
      const keyword = await askQuestion('Enter the keyword to filter out: ');
      await AdminService.filterArticlesByKeyword(keyword);
      console.log(`Articles containing keyword "${keyword}" will be hidden`);
      break;
    }

    case '4': {
      console.log('Returning to the previous menu...');
      break;
    }

    default: {
      console.log('Invalid choice. Please enter a number from 1 to 5.');
      break;
    }
  }
}
}
