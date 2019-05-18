import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorInstance, EditorOption } from 'angular-markdown-editor';
import * as mark from 'marked';
import { UploadContentService } from '../services/upload-content.service';
import swal from 'sweetalert';
import { GetContentService } from '../services/get-content.service';
import Swal from 'sweetalert2'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: 'markdown-editor.component.html',
  styleUrls: ['markdown-editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MarkdownEditorComponent implements OnInit {
  bsEditorInstance: EditorInstance;
  markdownText: string;
  showEditor = true;
  templateForm: FormGroup;
  editorOptions: EditorOption;
  uploading = false;
  content;
  title;
  tag;
  slugUrl;
  description;
  result;
  imageName;
  fileImage;
  imageUrl;
  uploadImageUrl;
  compressResult;
  isDisabled = false;
  customTag;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService,
    public uploadService: UploadContentService,
    public contentService: GetContentService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.isAuthenticated().subscribe(user => {
      if (user.emailVerified) {
        this.isAdmin = true;
      }
    });
    this.contentService.getAllPost().then(result => {
      result.subscribe(e => {
        // this.result = e[0];
        // this.markdownText = JSON.parse(this.result.content);
        // this.templateForm.controls['body'].setValue(this.markdownText);
      });
    });
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onFullscreenExit: (e) => this.hidePreview(e),
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    this.templateForm = this.fb.group({
      body: [this.markdownText, Validators.required],
      isPreview: [true],
      articleName: ['', Validators.required],
      articleDescription: ['', Validators.required],
      imageUrl: ['', Validators.required],
      tag: ['', Validators.required]
    });
    // put the text completely on the left to avoid extra white spaces
    this.onFormChanges();
  }

  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview(e) {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }
  clickCustomTag() {
      Swal.fire({
        title: 'กรุณาใส่ Tag ที่ต้องการ',
        input: 'text',
        showConfirmButton: true,
        showCancelButton: true,
        reverseButtons: true,
        onClose: () => {
          if (!this.customTag) {
            this.templateForm.controls['tag'].setValue('');
          } else {
            this.templateForm.controls['tag'].setValue('อื่นๆ');
          }
        }
      }).then(value => {
        if (value.value) {
          this.customTag = value.value;
          this.templateForm.controls['tag'].setValue('อื่นๆ');
        } else {
          this.templateForm.controls['tag'].setValue('');
        }
      });
  }
  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;
      }
    });
  }

  change(event) {
    this.fileImage = event;
    this.readThis(event.target);
  }
  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imageName = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  uploadImage() {
    this.uploading = true;
      this.uploadService.uploadImage(this.fileImage.target.files[0]).then(url => {
        swal({
          title: 'อัพโหลดสำเร็จ',
          icon: 'success'
        }).then(() => {
          this.uploading = false;
          this.imageUrl = url;
        }).catch(() => {
          swal({
            title: 'อัพโหลดไม่สำเร็จ',
            icon: 'error'
          }).then(() => {
            this.uploading = false;
          });
        });
      });
  }
  copy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.imageUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  open(image): void {
    swal({
      icon : image,
      buttons: [false]
    });
  }
  save() {

    const data = JSON.stringify(this.markdownText);
    this.content = data;
    this.title = this.templateForm.value.articleName;
    this.tag =  this.templateForm.value.tag === 'อื่นๆ'​ ? this.customTag : this.templateForm.value.tag;
    this.slugUrl = this.title.split(' ').join('-');
    this.description = this.templateForm.value.articleDescription;
    this.uploadImageUrl = this.templateForm.value.imageUrl;
    const saveData = {
      title: this.title,
      tag: this.tag,
      content: this.content,
      uploadImageUrl: this.uploadImageUrl,
      slugUrl: this.slugUrl,
      description: this.description
    };
    this.uploadService.uploadContent(saveData).then(() => {
      swal({
        title: 'บันทึกสำเร็จ',
        icon: 'success'
      }).then(() => {
        setTimeout(() => {
          window.location.href = '';
        }, 500);
      });
    }).catch((e) => {
      console.log(e);
      swal({
        title: 'ไม่สามารถอัพโหลดได้',
        icon: 'error'
      }).then(() => {
      });
    });
  }
}
