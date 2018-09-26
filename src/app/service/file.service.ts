import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { v4 } from 'uuid';
import { FileElement } from '../file-explorer/model/file-element';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface IFileService {
  add(fileElement: FileElement, callback?);
  delete(id: string);
  update(id: string, update: Partial<FileElement>);
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): any;
}

@Injectable()
export class FileService implements IFileService {
  private map = new Map<string, FileElement>();

  constructor(private _http: Http) {}

  add(fileElement: FileElement, callback?) {
    fileElement.id = fileElement.parent+fileElement.name+ (fileElement.isFolder ? '/': '');
    console.log('fileElement', JSON.stringify(fileElement));
    // this.map.set(fileElement.id, this.clone(fileElement));
    return this._http.put("/api/folder",JSON.parse(JSON.stringify(fileElement)))
    .subscribe(result => {
      console.log(JSON.stringify(result));
      callback? callback() : '';
      this.queryInFolder(fileElement.parent);
      // return fileElement;//this.querySubject.asObservable();
    });
    //return fileElement;
  }

  delete(id: string) {
    this.map.delete(id);
  }

  update(id: string, update: Partial<FileElement>) {
    let element = this.map.get(id);
    element = Object.assign(element, update);
    this.map.set(element.id, element);
  }

  private querySubject: BehaviorSubject<FileElement[]>;
  queryInFolder(folderId: string) {
    const fileElements: FileElement[] = [];
    folderId = folderId.replace(/\//gi, "_");
    return this._http.get("/api/listAll/"+folderId)
    .map(result => {
      var arr = result.json().data;
      arr.forEach(element => {
        fileElements.push(element);
      });
      this.querySubject = new BehaviorSubject(fileElements);
      return fileElements;//this.querySubject.asObservable();
    });
  }

  get(id: string) {
    let fileElement: FileElement;
    console.log('get-id', id);
    id = id.replace(/\//gi, "_");
    this._http.get("/api/folder/"+id)
    .map(result => {
      var arr = result.json().data;
      fileElement = this.clone(arr[0]);
      
      return fileElement;
    });
  }

  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element));
  }
}