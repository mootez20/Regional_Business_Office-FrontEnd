import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormService } from 'src/app/core/service/form.service';
import { Form } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  public form = {} as Form;

  public STORAGE_URL = environment.storageUrl;

  constructor(
    private activeModal: NgbActiveModal,
    private formService: FormService
  ) {}

  public save(_form: NgForm) {
    if (_form.valid) {
      this.formService.create(this.form).subscribe((_) => {
        this.close();
      });
    }
  }

  public selectImage(_event: any): void {
    const fileList: FileList = _event.target.files;
    const files = Object.values(fileList || {});
    const file: File = files[0];
    if (file) {
      // this.formService.updateImage(file, this.form).subscribe((image) => {
      //   this.form.image = image.replace('public/', '');
      // });
    }
  }

  public close() {
    this.activeModal.dismiss();
  }
}
