import {Component, OnInit} from '@angular/core';
import {DiffXmlService} from "../diff-xml.service";
import {BundleGroup} from "../../shared/models/bundle-group";
import * as _ from "lodash";

@Component({
  selector: 'app-diff-xml-index',
  templateUrl: './diff-xml-index.component.html',
  styleUrls: ['./diff-xml-index.component.scss']
})
export class DiffXmlIndexComponent implements OnInit {

  files: FileList;
  bundles: BundleGroup[];
  constructor(private diffService: DiffXmlService) {
  }

  ngOnInit() {
  }

  onUpload(files: FileList) {
    this.bundles = Array.from(files).reduce((currentBundles: BundleGroup[], file: File) => {
      // filter xml file
      if (!_.endsWith(file.name, ".xml")) {
        return currentBundles;
      }
      const name = file.name.split("_")[0];
      const bundle: BundleGroup = _.find(currentBundles, {name: name});
      if (bundle) {
        bundle.files.push(file);
        return currentBundles;
      }
    }, []);
    this.files = files;
  }


}
