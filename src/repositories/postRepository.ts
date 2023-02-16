import { config } from '../config';
import { Post, PostModel } from '../database/models/post';

export class PostRepository {
  async getById(id: string): Promise<Post | null> {
    return await PostModel.findById(id);
  }

  async create(post: Post): Promise<Post> {
    return await PostModel.create(post);
  }

  async getRecomendations(userCountry: string): Promise<Post[]> {
    return await PostModel
      .aggregate<Post>()
      .project({
        title: 1,
        summary: 1,
        text: 1,
        words: 1,
        communityId: 1,
        country: 1,
        likes: 1,
        status: 1 ,
        '_countryMatch': {
          $eq: ['$country', userCountry]
        },
        '_score': {
          $add: { add: [{ $multiply: ['$likes', config.LIKES_MULIPLICATION_INDEX] }, '$words'] } ,
        },
      })
      .sort({ '_countryMatch': 'desc', '_sore': 'desc' })
      .limit(config.RECOMENDATIONS_LENGTH).exec()
  }
}