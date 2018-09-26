import { CloudObjectsService } from './cloud-objects.service';
import { Component } from '@angular/core';
import { FileElement } from './file-explorer/model/file-element';
import { Observable } from 'rxjs/Observable';
import { FileService } from './service/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloud-doc-explorer';

  users: Array<any>;
  fileElements: Observable<FileElement[]>;
  currentRoot: any;
  currentPath: string;
  canNavigateUp = false;
  constructor(private _cloudObeService: CloudObjectsService, public fileService: FileService) {
    this._cloudObeService.getUsers()
    .subscribe(res => this.users = res);
    this.updateFileElementQuery();
  }

  addFolder(folder: { name: string }) {
    var element = { isFolder: true, name: folder.name, parent: this.currentRoot ? this.currentRoot.id : '' };
    this.fileService.add(element);//, this.updateFileElementQuery());
    //this.updateFileElementQuery();
  }

  updateFileElementQuery() {
    this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : '');
  }
  
  removeElement(element: FileElement) {
    this.fileService.delete(element.id);
    this.updateFileElementQuery();
  }
  
  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    this.fileService.update(event.element.id, { parent: event.moveTo.id });
    this.updateFileElementQuery();
  }
  
  renameElement(element: FileElement) {
    this.fileService.update(element.id, { name: element.name });
    this.updateFileElementQuery();
  }

  navigateUp() {
    if (this.currentRoot && this.currentRoot.parent === undefined) {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      var key = this.currentRoot.parent
      this.currentRoot.id = key;
      this.currentRoot.isFolder = key.endsWith('/');
      var arr = key.split('/');
      key = this.currentRoot.isFolder ? key.substr(0, key.length-1): key;
      if(key.indexOf('/') != -1){ // has /
        this.currentRoot.parent = key.substr(0,key.lastIndexOf('/')+1);
        this.currentRoot.name = key.substr(key.lastIndexOf('/')+1, key.length);
      }
      else { // no /
        this.currentRoot.name = key;
        this.currentRoot.parent = undefined;
      }
      // this.currentRoot = this.fileService.get(this.currentRoot.parent);
      
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }
  
  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }
  
  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

}
