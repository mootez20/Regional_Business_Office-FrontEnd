import { AlbumService } from 'src/app/core/service/album.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from 'src/app/core/models';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  public album: Album = {} as Album;

  public STORAGE_URL = environment.storageUrl;

  constructor(
    private router: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.albumService.getAlbumById(id).subscribe((res) => (this.album = res));
  }
}
