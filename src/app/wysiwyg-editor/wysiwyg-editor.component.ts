import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.css']
})
export class WysiwygEditorComponent implements OnInit {
  isPreview: Boolean = false;

  public options: Object = {
    charCounterCount: true,
    placeholderText: 'เริ่มพิมพ์บทความ',
    imageUploadParam: 'image_param',
    imageUploadURL: 'assets/upload_image',
    imageUploadParams: {id: 'formModel'},
    imageUploadMethod: 'POST',

    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events:  {
    'froalaEditor.initialized':  function () {
  },
    'froalaEditor.image.beforeUpload':  function  (e,  editor,  images) {
    if  (images.length) {
      const  reader  =  new  FileReader();
      reader.onload  =  (ev)  =>  {
        const  result  =  ev.target['result'];
        editor.image.insert(result,  null,  null,  editor.image.get());
        console.log(ev.target['result']);
      };
      reader.readAsDataURL(images[0]);
    }
    return  false;
  }
 }
};

  content: any  = '';
  form: FormGroup;
  constructor(private Form: FormBuilder) {
    this.form = this.Form.group({
      formModel: ''
    });
  }
  ngOnInit() {

    this.form.valueChanges.subscribe(form => {
      this.content = form.formModel;
      if (this.content === '') {
        this.isPreview = false;
      }
    });
  }
  onSubmit() {
    console.log(this.content);
  }
  showPreview() {
    if (this.content) {
      this.isPreview = !this.isPreview;
    }
  }
}
