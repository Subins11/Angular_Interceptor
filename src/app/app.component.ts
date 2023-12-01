import { Component } from '@angular/core';
import { PostServiceService } from './post-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularPost';

  postForm: FormGroup;
  posts: any [] =[];
  allData: any[] = [];
  userData: any;
  userId: number = 0;


  constructor(private fb: FormBuilder, private postService: PostServiceService , private dataService: DataService) {
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
