import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlbumService } from 'src/app/core/service/album.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Album } from 'src/app/core/models';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit {
  public albumList: Album[] = [];
  public total = 0;
  public page = 1;

  public STORAGE_URL = environment.storageUrl;

  constructor(
    private authService: AuthService,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(({ city }) =>
      this.albumService.getAlbums(city?.id).subscribe((res) => {
        this.albumList = res;
        this.total = res.length;
      })
    );
  }

  pageChanged(page: number) {
    this.page = page;
    window.scrollTo(0, 0);
  }
}
