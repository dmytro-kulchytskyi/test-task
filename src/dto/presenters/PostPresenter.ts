import { PostStatus } from "../../database/models/enums/PostStatus";
import { Post } from "../../database/models/post";


export class PostPresenter {
  constructor(post: Post) {
    this.userId = post.userId.toString();
    this.title = post.title;
    this.summary =  post.summary;
    this.text =  post.text;
    this.communityId = post.communityId.toJSON();
    this.likes = post.likes;
    this.status = post.status;
  }

  public userId: string;
  public title: string;
  public summary: string;
  public text: string;
  public communityId: string;
  public likes: number = 0;
  public status: PostStatus;
}