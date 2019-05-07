import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent{
  posts=[
    {title:'First Post',content: "This is First Post "},
    {title:'Second Post',content:"This is Second Post"}
  ]
}
