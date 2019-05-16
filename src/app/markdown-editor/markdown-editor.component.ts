import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MarkdownService } from 'ngx-markdown';
import { EditorInstance, EditorOption } from 'angular-markdown-editor';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  headers: Headers = new Headers({ 'Content-Type': 'text/plain' });
  constructor(
    private fb: FormBuilder,
    private markdownService: MarkdownService,
    private afStorage: AngularFireStorage,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.http.get('https://00e9e64bacaf3abffffa67122dc8d1aefeba35b6e95ece1a62-apidata.googleusercontent.com/download/storage/v1/b/blog-40f93.appspot.com/o/article%2Ftest.text?qk=AD5uMEvSWGLyZHYIH69TVwksIDthnf4WU_O_7JaDzMrQpFabaIbroAsG8vDg2nCyvPI4OxKwY63Tvn86noD6hGvZ786mVyi47AmmKhZekGDUPkRBgispmXh_GG3En4JN93ktXgDig9MfnRb44WEyHEd7dAyVh5S9PSJbZr5uvpnBcCUWDa4cxJKphysTsZxvV6I-NoU3pWY42GZMNm7RXEy0_OGMUojRv2iJujBaKvi9QC_G_2RT40ZjyZSv0WQmV73Ees-nAtYVJcr8-wQ8XZhviyyhK11B-vuHXDa-_nvoxRj1HZGzU5EpOuF8IrQgk9_jNLCcYch03WaziDm338za3WuRbvbTVTs1NPCVAxWkjtFwcyizvlPujhTXlmjNTOv4xBnK_PJ8AWlnmNmSon8TVCB7qc4Y1ouSyL6K9xQVlUHYnlsKNqmF0_PMhHBVY3h2I2BTvNq_0t01_ClwwZ1mkiLL5Y0Go_Bns6yc_M-gV6KRog9rDv-MBRts4Pb6zNuCh-p52hCpZQi0zpDaXVjeJoyTdjLN-INkQlwLRwyHzQYXZDxNT7UoKHyuEGuLPK01qw_Bex8fuhN8COvuhW8PHPsqrwuNLaUoVL1cxUheHPko3wtyM4A4sQgxc9eJfrg18YELphAJjv_cj1spJl30jW0DYzDtarSXcEvVSBbqXTksg2_Msw2k1C-TVHsQYGugwOakjaOi_s5WcJ8mU3JCiHh0bKxJ-1Pjmg0pPv-0H5u_6nwqw12hMrHG8YqKUZHwPDHuO4HuZ2-GvfZy4LGTQZ1jVpKPOw', {
    headers: new HttpHeaders().set('Content-Type', 'text/plain')
  }).subscribe(value => {
    console.log(value);
  })
    // this.afStorage.ref('article').child('test.text').getDownloadURL()
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onFullscreenExit: (e) => this.hidePreview(e),
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val)
    };

    // put the text completely on the left to avoid extra white spaces
this.markdownText =
`### Markdown example
---
This is an **example** where we bind a variable to the \`markdown\` component that is also bind to the editor.
#### example.component.ts
\`\`\`javascript
function hello() {
alert('Hello World');
}
\`\`\`
#### example.component.html
\`\`\`html
<textarea [(ngModel)]="markdown"></textarea>
<markdown [data]="markdown"></markdown>
\`\`\``;

    this.buildForm(this.markdownText);
    this.onFormChanges();
  }


  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [markdownText],
      isPreview: [true]
    });
  }

  /** highlight all code found, needs to be wrapped in timer to work properly */
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

  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;
      }
    });
  }
}
