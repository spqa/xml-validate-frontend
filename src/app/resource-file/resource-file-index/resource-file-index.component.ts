import {Component, OnInit} from '@angular/core';
import {ResourceFileService} from "../resource-file.service";
import {Observable} from "rxjs/Observable";
import {ResourceFile} from "../../shared/models/resource-file";

@Component({
  selector: 'app-resource-file-index',
  templateUrl: './resource-file-index.component.html',
  styleUrls: ['./resource-file-index.component.scss']
})
export class ResourceFileIndexComponent implements OnInit {

  resourceFileStream: Observable<ResourceFile[]>;
  editResourceFile: ResourceFile;
  isError = false;
  errorMessage = '';

  constructor(private resourceFileService: ResourceFileService) {
  }

  ngOnInit() {
    this.resourceFileStream = this.resourceFileService.getResourceFile();
  }

  showEditForm(resourceFile: ResourceFile) {
    window.scrollTo(0, 0);
    this.editResourceFile = resourceFile;
  }

  handleChange() {
    this.resourceFileService.updateResourceFile(this.editResourceFile).subscribe((result) => {
      console.log(result);
      if (result.error === false) {
        this.editResourceFile = null;
      } else {
        this.isError = true;
        this.errorMessage = result.message.name[0];
      }
    });
  }
}
