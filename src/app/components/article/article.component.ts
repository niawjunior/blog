import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetContentService } from '../../services/get-content.service';
import { PageViewService } from '../../services/page-view.service';
import {format} from 'date-fns';
import * as th from 'date-fns/locale/th';
import { AuthService } from '../../services/auth.service';
import { HelperService } from '../../services/helper.service';
import { UploadContentService } from '../../services/upload-content.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  getUrl;
  article = '';
  loadingContent = false;
  shareData;
  head = '';
  shareUrl = '';
  postDate = '';
  tag = '';
  view;
  isAdmin = false;
  constructor(
    private contentService: GetContentService,
    private uploadService: UploadContentService,
    public activatedRoute: ActivatedRoute,
    private pageView: PageViewService,
    private auth: AuthService,
    private helper: HelperService,
    private router: Router,
    ) {

  }
  ngOnInit() {
    this.getUrl = this.helper.getCurrentUrl();
    const getArticle = this.contentService.getArticle(this.getUrl);
    this.shareUrl = this.helper.getFullUrl();
    this.auth.isAuthenticated().subscribe(value => {
      if (value) {
        if (value.uid !== 'R1kuI33VUzRpE1nI9hQE2JjUI703') {
          this.isAdmin = false;
          this.pageView.setPageView(this.getUrl);
        } else {
          this.isAdmin = true;
        }
      } else {
        this.pageView.setPageView(this.getUrl);
      }
    });
    if (getArticle) {
      const elem = getArticle;
      this.shareData = elem;
      this.head = elem.title;
      this.tag = elem.tag;
      this.view = elem.view;
      this.postDate = format(elem.timeStamp, 'DD MMMM YYYY : HH:mm', {locale: th});
      this.contentService.setLoad(elem);
      this.contentService.loading(true);
      this.loadingContent = true;
      this.article = JSON.parse(elem.content);
    } else {
      this.contentService.getPostDetail(this.getUrl).then(result => {
        result.subscribe(e => {
          e.forEach(elem => {
            if (elem && elem.status) {
              this.postDate = format(elem.timeStamp, 'DD MMMM YYYY : HH:mm', {locale: th});
              this.head = elem.title;
              this.view = elem.view;
              this.tag = elem.tag;
              this.shareData = elem;
              this.contentService.setLoad(elem);
              this.article = JSON.parse(elem.content);
              this.contentService.loading(true);
              this.loadingContent = true;
            } else {
              this.router.navigateByUrl('/');
            }
           });
          });
      })
    }
  }
  editPost() {
    this.router.navigateByUrl('post/' + this.getUrl);
  }
  openDeletePost() {
    Swal.fire({
      title: 'ยืนยันการลบ!',
      text: 'คุณต้องการลบโพสนี้?',
      type: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: 'ยืนยันการลบ'
    }).then((result) => {
      if (result.value) {
        this.deletePost();
      }
    });
  }
  deletePost() {
    this.uploadService.deleteContent(this.getUrl).then(() => {
      Swal.fire({
        title: 'ลบข้อมูลเรียบร้อยแล้ว',
        type: 'success',
      }).then(() => {
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 500);
      });
    });
  }
}
