import { UserRepository } from '../repositories/userRepository';
import { CreatePost } from '../dto/CreatePostDto';
import { User } from '../database/models/user';
import { ApiError } from '../error/ApiError';
import { StatusCodes } from 'http-status-codes'
import { Post } from '../database/models/post';
import { Types } from 'mongoose';
import { PostStatus } from '../database/models/enums/PostStatus';
import { PostRepository } from '../repositories/postRepository';
import { intersection } from 'lodash'

// TODO store words list in redis
import whatchlistWords from '../data/watchlistWords.json'
import { sendEmail } from '../lib/emailService';
import { config } from '../config';

export class PostsService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly postRepo: PostRepository
  ) {}

  async createPost(userId: string, createPost: CreatePost): Promise<Post> {
    const user = await this.userRepo.getById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No such user');
    }

    if(!user.communities.includes(new Types.ObjectId(createPost.communityId))) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid communityId');
    }

    //TODO split to multiple functions

    const words = createPost.text.split(/\s+/g);
    const postData = {
      userId: new Types.ObjectId(userId),
      title: createPost.title,
      summary: createPost.summary || words.slice(0, 100).join(' '),
      text: createPost.text,
      words: words.length,
      country: user.country,
      communityId: new Types.ObjectId(createPost.communityId),
      status: PostStatus.Pending
    } as Post;
    const post = await this.postRepo.create(postData);
    await this.validateWords(post.id, words);

    return post;
  }

  async getRecomendations(userId: string): Promise<Post[]> {
    const user = await this.userRepo.getById(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No such user');
    }
    return await this.postRepo.getRecomendations(user.country);
  }

  private async validateWords(postId: string, words: string[]): Promise<void> {
    const sanitizedWords = words.map((w) => w.trim().toLowerCase())
    const watchlistWordsFound = intersection(whatchlistWords, sanitizedWords);
    if (watchlistWordsFound) {
      const message = `Watchlist detected alert ${config.WEBSITE_URL}/post/${postId}`;
      await sendEmail(message);
    }
  }
}

