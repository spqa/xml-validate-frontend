import {Component, OnInit} from '@angular/core';
import {ResourceFile} from "../../shared/models/resource-file";
import {ResourceFileService} from "../resource-file.service";

@Component({
  selector: 'app-resource-file-add',
  templateUrl: './resource-file-add.component.html',
  styleUrls: ['./resource-file-add.component.scss']
})
export class ResourceFileAddComponent implements OnInit {

  resourceFile: ResourceFile = new ResourceFile();
  infoMessage = '';
  isError = false;

  constructor(private resourceFileService: ResourceFileService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isError = false;
    this.infoMessage = "";
    this.resourceFileService.addResourceFile(this.resourceFile).subscribe((result) => {
      if (result.error === true) {
        this.isError = true;
        if (typeof result.message === "string") {
          this.infoMessage = result.message;
        } else {
          for (const member in result.message) {
            console.log(member);
            this.infoMessage = result.message[member][0];
          }
        }
      } else {
        this.resourceFileService.loadResourceFiles();
        this.infoMessage = result.message;
      }
    });
  }

}
