import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/core/service/categorie.service';
import { DocumentService } from 'src/app/core/service/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  activeInfo = 'categorie1';
  id: any;
  categoryList: any;
  documentList: any;

  constructor(
    private documentService: DocumentService,
    private categoryService: CategorieService
  ) {}

  ngOnInit(): void {
    this.getDocuments(1);
    this.getCategories();
    // this.getSingleData(1);
  }

  getCategories() {
    this.categoryService.getCategorie().subscribe((res) => {
      this.categoryList = res;
      // console.log('categoryList data :', this.categoryList);
    });
  }

  getDocuments(id: number) {
    this.documentService.getDocument(id).subscribe((res) => {
      this.documentList = res;
      // console.log('documentList data :', res);
    });
  }

  getDocumentData(id: number) {
    this.documentService.getDocument(id).subscribe((res) => {
      this.documentList = res;
      // console.log('document data :', res);
    });
  }

  activeButton(category: any) {
    this.activeInfo = category.nom;
    this.getDocuments(category.id);
    this.id = category.id;
    // console.log('id =', this.id);
  }
}
