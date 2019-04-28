import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as $ from 'jquery';
import { UploadContentService } from '../services/upload-content.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.css']
})

export class WysiwygEditorComponent implements OnInit {
  form: FormGroup;
  ogImage: '';
  content: '';
  title: '';
  slugUrl = '';
  tag = '';
  description = '';
  isDisabled = false;
  @ViewChild('editor') editor: QuillEditorComponent;
  constructor(fb: FormBuilder, public uploadService: UploadContentService ) {
    this.form = fb.group({
      editor: new FormControl('', Validators.required),
      storyTitle: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.form
      .controls
      .editor
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        // console.log(data);
      });

    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        // console.log(data);
      });
  }

  onSubmit() {
    this.isDisabled = true;
    this.content = this.form.value.editor;
    this.title = this.form.value.storyTitle;
    this.tag = this.form.value.tag;
    this.slugUrl = this.title.split(' ').join('-');
    if ($(this.form.value.editor).find('img')[0]) {
      this.ogImage = $(this.form.value.editor).find('img')[0].src;
    }
    this.description = String($('p').text()).substr(0, 50);
    this.uploadService.uploadImage(this.ogImage).then(imageUrl => {
      this.uploadService.uploadContent(this.title, this.tag, this.content,  this.slugUrl, imageUrl,  this.description).then(() => {
        swal({
          title: 'บันทึกสำเร็จ',
          icon: 'success'
        }).then(() => {
          setTimeout(() => {
            window.location.href = '';
          }, 500);
        });
      }).catch(() => {
        swal({
          title: 'ไม่สามารถอัพโหลดได้',
          icon: 'error'
        }).then(() => {
          this.isDisabled = false;
        });
      });
    }).catch(() => {
      swal({
        title: 'ไม่สามารถอัพโหลดได้',
        icon: 'error'
      }).then(() => {
        this.isDisabled = false;
      });
    });
  }
}
