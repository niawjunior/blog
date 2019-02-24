import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as $ from 'jquery';

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

  @ViewChild('editor') editor: QuillEditorComponent;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      editor: '',
      storyTitle: ''
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
        console.log(data);
      });

    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  onSubmit() {
    this.content = this.form.value.editor;
    this.title = this.form.value.storyTitle;
    this.slugUrl = this.title.split(' ').join('-');
    if ($(this.form.value.editor).find('img')[0]) {
      this.ogImage = $(this.form.value.editor).find('img')[0].src;
    }

  }
}
