import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.css']
})
export class WysiwygEditorComponent implements OnInit {
  content: any  = '';
  form: FormGroup;
  constructor(private Form: FormBuilder) {
    this.form = this.Form.group({
      htmlContent: ''
    });
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'เริ่มพิมพ์บทความ',
    translate: 'no',
    uploadUrl: '',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  ngOnInit() {

    this.form.valueChanges.subscribe(form => {
      this.content = form.htmlContent;
    });
  }
  onSubmit() {
    console.log(this.content);
  }
}
