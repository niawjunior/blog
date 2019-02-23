import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.css']
})


export class WysiwygEditorComponent implements OnInit {
  form: FormGroup;
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
    console.log(this.form.value);
  }
}
