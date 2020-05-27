import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, of, throwError, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { JsonPipe } from '@angular/common';






@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public apiUrl = 'https://localhost:5001/api/v1/';




  constructor( private httpclnt: HttpClient) {}


  ///////////////////////////// ALBUM ////////////////////////////////////////////
  getAlbums() {
    return this.httpclnt.get<Album[]>(this.apiUrl + 'albums');


  }

  getAlbumById(id: number) {
    return this.httpclnt.get<Album>(this.apiUrl + 'albums/' + id );
  }

  getAlbumsByArtistId(artistId: number) {
    return this.httpclnt.get<Album[]>(this.apiUrl + 'albums/artist?idin=' + artistId);
  }

  ////////// COMBINE //////////////
  getAlbumsPaging(page: number, itemsperpage: number, dir: string ) {
    return this.httpclnt.get<Album[]>(this.apiUrl + 'albums?page=' + page + '&length=' + itemsperpage + '&sort=title' + '&dir=' + dir);
    // https://localhost:5001/api/v1/albums?page=2&length=2
  }

  getAlbumsSorting(sort: string, dir: string) {
    return this.httpclnt.get<Album[]>(this.apiUrl + 'albums?sort=' + sort + '&dir=' + dir);
      // https://localhost:5001/api/v1/books?sort=title&dir=desc

  }

  GetAlbumByGenre(genre: string) {
      return this.httpclnt.get<Album[]>(this.apiUrl + 'albums?genre=' + genre);

    // http://localhost:5000/api/v1/albums?genre=hip-hop
  }

  /////////////////////////////

  postAlbum = function(btitle: string = '', bgenre: string = '', bartistid: number, releastedate: Date ) {
    return this.httpclnt.post(this.apiUrl  + 'albums', {
      title:  btitle,
      genre: bgenre,
      artistId: bartistid,
      release_date: releastedate} ).subscribe();

  };


  updateAlbum(bgenre: string = '', btitle: string = '', balbum: number, brelease: Date, bartistId: number ) {

    return this.httpclnt.put(this.apiUrl + 'albums', {
      title: btitle,
      genre: bgenre,
      albumId: balbum,
      release_date: brelease,
      artistId: bartistId
    } ).subscribe();

  }


  deleteAlbum(Bid: number) {


    const deleteUrl = this.apiUrl  + 'albums' + '/' + Bid;
    console.log(deleteUrl);
    return this.httpclnt.delete(deleteUrl).subscribe();
  }
  ///////////////////////////// ALBUM ////////////////////////////////////////////

  ///////////////////////////// ARTIST //////////////////////////////////////////

  getAllArtist() {
    return this.httpclnt.get<Artist[]>(this.apiUrl + 'artists');

  }

  postArtist(Aname: string) {
    return this.httpclnt.post(this.apiUrl  + 'artists', {
      artistname: Aname} ).subscribe();
  }


    ///////////////////////////// ARTIST //////////////////////////////////////////

    //////////// 3RD PARTY //////////////////

    getAlbumCovers(name: string) {
      // tslint:disable-next-line:max-line-length
      return this.httpclnt.get<Imageresult[]>('https://app.zenserp.com/api/v2/search?apikey=366e9220-9faa-11ea-8be8-4fbb886d6906&q=' + name + '&tbm=isch&device=desktop');
   }

}

export interface Album {
    albumId: number;
    artistId: number;
    title: string;
    genre: string;
    release_date: Date;
}

export interface Artist {
  id: number;
  artistname: string;

}







export interface RootObject {
image_results: Imageresult[];
}
export interface Imageresult {
  thumbnail: string;
}

