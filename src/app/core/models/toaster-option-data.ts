import { IndividualConfig } from "ngx-toastr";

export interface ToasterOptionData {
  message?: string;
  title?: string;
  type?: string;
  params: Partial<IndividualConfig>;
}
