import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PageEvent} from '@angular/material';
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
   isLoading = false;
   totalPosts = 0;
   postsperPage = 2;
   currentPage = 1;
   pageSizeOptions = [1,2,5,10];
   private postsSub: Subscription;
   constructor(public postsService: PostsService){}

  ngOnInit(){
    this.isLoading = true;
 this.postsService.getPosts(this.postsperPage,this.currentPage );
this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData:{posts: Posts[],postCount:number})=>{
  this.isLoading = false;
  this.totalPosts = postData.postCount;
  this.posts = postData.posts;
});
  }
  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsperPage,this.currentPage);
    });
      }

   onChangedPage(pageData: PageEvent) {
     this.isLoading = true;
     this.currentPage = pageData.pageIndex + 1;
     this.postsperPage = pageData.pageSize;
     this.postsService.getPosts(this.postsperPage,this.currentPage);
   }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
