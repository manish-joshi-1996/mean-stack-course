import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../posts.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
   posts: Posts[] = [];
   private postsSub: Subscription;
   constructor(public postsService: PostsService){}

  ngOnInit(){
 this.postsService.getPosts();
this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Posts[])=>{
  this.posts = posts;
});
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
