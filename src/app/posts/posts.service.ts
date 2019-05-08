import { Posts } from './posts.model';
import {Subject} from 'rxjs';
export class PostsService{
private posts: Posts[] = [];
private postsUpdated = new Subject<Posts[]>();

getPosts(){
  return this.posts;
}
getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}

addPost(title : string, content : string){
  const post: Posts = {title : title, content : content};
  this.posts.push(post);
}

}
