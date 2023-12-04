import { Component, OnInit } from '@angular/core';
import { PostServiceService } from './post-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularPost';

  postForm!: FormGroup;
  posts: any[] = [];
  allData: any[] = [];
  userData: any;
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      email: ['', Validators.required],
      phone: [''],
      website: ['']
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const newPost = this.postForm.value;

      this.postService.post(newPost).subscribe(
        response => {
          console.log('Record created successfully:', response);
          this.posts.push(response);
          this.postForm.reset();
        },
        error => {
          console.error('Error creating record:', error);
        }
      );
    }
  }

  onUpdate(post: any) {
    const recordId = post.id;
    const updatedData = this.postForm.value;

    this.postService.update(recordId, updatedData).subscribe(
      response => {
        console.log('Record updated successfully:', response);
        // Update the local posts array or perform any necessary actions
      },
      error => {
        console.error('Error updating record:', error);
      }
    );
  }

  onDelete(post: any) {
    const recordId = post.id;
  
    this.postService.delete(recordId).subscribe(
      response => {
        console.log('Record deleted successfully:', response);
        // Remove the deleted record from the local array
        this.posts = this.posts.filter(p => p.id !== recordId);
      },
      error => {
        console.error('Error deleting record:', error);
      }
    );
  }

  getAllData() {
    this.dataService.getAllData().subscribe((data: any) => {
      this.allData = data;
      this.userData = null;
    });
  }

  getUserData() {
    if (this.userId) {
      this.dataService.getDataById(this.userId).subscribe((data: any) => {
        this.userData = data;
        this.allData = [];
      });
    }
  }
}