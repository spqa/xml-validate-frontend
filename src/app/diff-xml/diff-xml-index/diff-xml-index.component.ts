import {Component, OnInit} from '@angular/core';
import {BundleGroup} from "../../shared/models/bundle-group";
import * as _ from "lodash";

@Component({
  selector: 'app-diff-xml-index',
  templateUrl: './diff-xml-index.component.html',
  styleUrls: ['./diff-xml-index.component.scss']
})
export class DiffXmlIndexComponent implements OnInit {

  bundles: BundleGroup[];

  constructor() {
  }

  ngOnInit() {
  }

  onUpload(files: FileList) {
    this.bundles = Array.from(files).reduce((currentBundles: BundleGroup[], file: File) => {
      // filter xml file
      if (!_.endsWith(file.name, ".xml")) {
        return currentBundles;
      }
      // get name of xml bundle by split "_"
      const name = file.name.split("_")[0];
      let bundle: BundleGroup = _.find(currentBundles, {name: name});
      if (bundle) {
        bundle.files.push(file);
        return currentBundles;
      }
      bundle = new BundleGroup();
      bundle.name = name;
      bundle.files.push(file);
      currentBundles.push(bundle);
      return currentBundles;
    }, []);

    console.log(this.bundles);
  }


}
