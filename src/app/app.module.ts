import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { MatCardModule } from '@angular/material/card';

import { FileExplorerModule } from './file-explorer/file-explorer.module';

import { AppComponent } from './app.component';
import { CloudObjectsService } from './cloud-objects.service';
import { FileService } from './service/file.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,FileExplorerModule,
    MatCardModule
  ],
  providers: [CloudObjectsService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
