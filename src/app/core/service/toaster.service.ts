import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ToasterOptionData } from "../models";

@Injectable()
export class ToasterService {
  constructor(private toastr: ToastrService) {}
  success(option: ToasterOptionData) {
    this.toastr.success(option.message, option.title, option.params);
  }
  error(option: ToasterOptionData) {
    this.toastr.error(option.message, option.title, option.params);
  }
  info(option: ToasterOptionData) {
    this.toastr.info(option.message, option.title, option.params);
  }
  warning(option: ToasterOptionData) {
    this.toastr.warning(option.message, option.title, option.params);
  }
  show(option: ToasterOptionData) {
    option.params.toastClass = "toast toast-access";
    this.toastr.show(option.message, option.title, option.params);
  }
}
