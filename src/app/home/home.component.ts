import { Component, OnInit, Query } from '@angular/core';
import { ClientService, Album, Artist, Imageresult, RootObject} from '../client.service';
import { FormsModule, ReactiveFormsModule, Validator, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public apiUrl = 'https://localhost:5001/api/v1/albums';
  Albums$: Album[];
  Artist$: Artist[];
  AlbumsSelected$: Album[];
  AlbumsSelectByGenre$: Album[];
  AlbumSelectedByArtistId$: Album[];
  albumSearch$: string;
  ItemsPerPage$: number [] = [10, 20, 30];
  itemsperpage: number;
  AlbumSelectedById$: Album;
  selectedArtist;
  data: Array<any>;
  totalRecords: number;
  page = 0;
  sorting = 0;
  choise: string;
  sort: string;
  public selectedAlbum = 0;
  id: number;
  ualbid: number;
  error: any;

  ///
  ACovers$: Imageresult[];
  Acover;




  constructor( private cliService: ClientService, private http: HttpClient ) { }




  ngOnInit() {
    this.cliService.getAllArtist()
        .subscribe(data => this.Artist$ = data);

  }

  ///////////////////////////// ALBUM ////////////////////////////////////////////

  GetAllAlbums() {
        return this.cliService.getAlbums()
        .subscribe(data => this.Albums$ = data);

  }

  GetAlbumById(albumid: number) {
    console.log(albumid);
    return this.cliService.getAlbumById(albumid).subscribe(data => this.AlbumSelectedById$ = data);
  }

  //////////////
  GeAlbumByAlbumGenre() {
    console.log(this.albumSearch$);
    return this.cliService.GetAlbumByGenre(this.albumSearch$)
    .subscribe(data => this.AlbumsSelectByGenre$ = data);

  }
  ///////////////////
  GetAlbumByArtistId() {
    console.log(this.selectedArtist);
    return this.cliService.getAlbumsByArtistId(this.selectedArtist).subscribe(data => this.AlbumSelectedByArtistId$ = data);

  }

  GetAlbumsPaging(value: number) {

      console.log(this.page);
      console.log(this.itemsperpage);
      switch (value) {
        case 0:
          this.page = 0;
          return this.cliService.getAlbumsPaging(this.page, this.itemsperpage, this.choise)
          .subscribe(data => this.Albums$ = data);
          break;
        case 1:
          this.page++;
          this.selectedAlbum += this.itemsperpage;
          return this.cliService.getAlbumsPaging(this.page, this.itemsperpage, this.choise)
          .subscribe(data => this.Albums$ = data);
          break;
        case 2:
          this.page--;
          this.selectedAlbum -= this.itemsperpage;

          return this.cliService.getAlbumsPaging(this.page, this.itemsperpage, this.choise)
          .subscribe(data => this.Albums$ = data);
          break;
        case 3:
            this.sorting++;
            if (this.sorting % 2 === 0) {
              this.choise = 'asc';

            } else {
              this.choise = 'desc';
            }
            return this.cliService.getAlbumsPaging(this.page, this.itemsperpage, this.choise)
            .subscribe(data => this.Albums$ = data);
            break;
      }

    // https://localhost:5001/api/v1/albums?page=2&length=2
    // https://localhost:5001/api/v1/books?sort=title&dir=desc
    // https://localhost:5001/api/v1/albums?page=2&length=2&sort=title&dir=desc

  }


  PostAlbum(title: string, Bgenre: string , Bartistid: number, releaseDate: Date) {
    // html leest alles in als string ook al geef ik dit aan als number dus parse ik nog een expliciet om naar int.
    Bartistid = +Bartistid;
    const rdate = new Date(releaseDate);
    return this.cliService.postAlbum( title, Bgenre, Bartistid, rdate);
    }


  DeleteAlbum(Bdelete: number) {
    return this.cliService.deleteAlbum(Bdelete);
  }

  UpdateAlbum(Btitle: string, Bgenre: string , BalbumId: number, releaseDate: Date, bartistId: number) {
    BalbumId = +BalbumId;
    bartistId = +bartistId;
    const udate = new Date(releaseDate);
    console.log(this.ualbid);
    return this.cliService.updateAlbum(Bgenre, Btitle, BalbumId, udate, bartistId);
  }
  ///////////////////////////// ALBUM ////////////////////////////////////////////

  ///////////////////////////// ARTIST ////////////////////////////////////////////
  GetAllArtists() {
    return this.cliService.getAllArtist()
    .subscribe(data => this.Artist$ = data);
}

GetSelectedArtist() {
  console.log(this.selectedArtist);
  return this.cliService.getAllArtist().subscribe(data => this.Artist$ = data);


}

PostArtist(Aname: string) {
  console.log(Aname);
  return this.cliService.postArtist(Aname);
}


  ///////////////////////////// ARTIST ////////////////////////////////////////////


  //////////// 3RD PARTY //////////////////////



      GetAlbumCover(albumName: string) {
        this.cliService.getAlbumCovers(albumName).subscribe(AcoverI => {
          this.ACovers$ = AcoverI;
          // tslint:disable-next-line:no-string-literal
          this.Acover = this.ACovers$['image_results'];
        });
      }
  ///////////////////////////////////////////

  /////////////// OTHERSTUFF //////////////////

  isNextValid() {
    if (this.selectedAlbum > this.Albums$.length) {
      return true;
    } else {
        return false;
    }
  }

  isPreviousValid() {
    if (this.selectedAlbum <= 0) {
        return true;
    } else if (this.selectedAlbum >= 10) {
        return false;
    }
  }
/////////////// OTHERSTUFF //////////////////
}
