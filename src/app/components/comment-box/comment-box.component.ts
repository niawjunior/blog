import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';
@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.html']
})
export class CommentBoxComponent implements OnInit {
  textLength = 500;
  isLogin = false;
  userDetail;
  userComment;
  @Input() url: any;
  commentForm: FormGroup;
  isDisabledComment =  false;
  images;
  imageDefault = 'https://firebasestorage.googleapis.com/v0/b/blog-40f93.appspot.com/o/631929649c.png?alt=media';
  constructor(
    private comment: CommentService,
    private router: Router,
    private helper: HelperService,
    private form: FormBuilder,
    private auth: AuthService) { }

  ngOnInit() {
    this.getComment();

    this.auth.isAuthenticated().subscribe(value => {
      if (value) {
        this.userDetail = value;
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
    this.commentForm = this.form.group({
      'text': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(500)]))
    });
    this.commentForm.valueChanges.subscribe(value => {
      if (value.text) {
        this.textLength = 500 - value.text.length;
      } else {
        this.textLength = 500;
      }
    });
  }
  postComment() {
    this.isDisabledComment = true;
    const comment = this.commentForm.value.text;
    this.comment.postComment({
      article: this.url,
      email: this.userDetail.email,
      uid: this.userDetail.uid,
      comment: comment,
      timeStamp: Date.now()
    }).then(() => {
      this.commentForm.controls['text'].setValue('');
      this.commentForm.controls['text'].markAsUntouched();
      this.isDisabledComment = false;
      this.getComment();
    }).catch(() => {
      this.isDisabledComment = false;
    });
  }
  getComment() {
    this.comment.getComment(this.url).then(value => {
        value.subscribe(result => {
        this.userComment = result;
      });
    });
  }
  loginToComment() {
    console.log(this.helper.getCurrentUrl());
    this.router.navigateByUrl('/login?callback=' + this.helper.getCurrentUrl());
  }
}
