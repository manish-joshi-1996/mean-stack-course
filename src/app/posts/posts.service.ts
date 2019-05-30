import { Posts } from './posts.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class PostsService{
private posts: Posts[] = [];
private postsUpdated = new Subject<Posts[]>();

constructor( private http: HttpClient){}

getPosts(){
  this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
  .pipe(map((postData)=>{
return postData.posts.map(post =>{
  return {
    title: post.title,
    content: post.content,
    id: post._id
  };
});
  }))
  .subscribe((transformedposts)=>{
    this.posts= transformedposts;
    this.postsUpdated.next([...this.posts]);
  });
}
getPostUpdateListener(){
  return this.postsUpdated.asObservable();
}
getPost(id: string){
  return {...this.posts.find(p => p.id === id)};
}

addPost(title : string, content : string){
  const post: Posts = {id: null, title: title, content: content};
  this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts',post)
  .subscribe((responseData) => {
    const id = responseData.postId;
    post.id = id;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  });
}

updatePost(id: string, title: string, content: string){
  const post:Posts = {id: id, title: title, content: content};
  this.http.put("http://localhost:3000/api/posts/" + id,post)
  .subscribe(response => console.log(response));

}

deletePost(postId: string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
}

}
