import { Router, Request, Response } from 'express';
import { authMiddleware } from '../auth/authMiddleware';
import { makeValidateBody } from 'express-class-validator';
import { CreatePost } from '../dto/CreatePostDto';
import { AuthRequest } from '../types/AuthRequest';
import { PostsService } from '../services/postsService';
import { PostRepository } from '../repositories/postRepository';
import { UserRepository } from '../repositories/userRepository';
import { PostPresenter } from '../dto/presenters/PostPresenter';

// TODO: use dependency injection instead of mannualy creation of instances
const usersRepo = new UserRepository();
const postsRepo = new PostRepository();
const postsService = new PostsService(usersRepo, postsRepo);

export const postsRouter = Router();

postsRouter.use(authMiddleware)

postsRouter.post('/', makeValidateBody(CreatePost), async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const body: CreatePost = req.body;

  const post = await postsService.createPost(user.id, body);

  const postPresenter = new PostPresenter(post);
  res.json(postPresenter);
});

postsRouter.get('/recomendations', async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user;
  const recomendations = await postsService.getRecomendations(user.id);

  const presenters = recomendations.map((r) => new PostPresenter(r));
  res.json(presenters);
});