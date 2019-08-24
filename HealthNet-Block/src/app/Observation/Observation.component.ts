/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ObservationService } from './Observation.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-observation',
  templateUrl: './Observation.component.html',
  styleUrls: ['./Observation.component.css'],
  providers: [ObservationService]
})
export class ObservationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  obs_date = new FormControl('', Validators.required);
  obs_code = new FormControl('', Validators.required);
  obs_desc = new FormControl('', Validators.required);
  obs_value = new FormControl('', Validators.required);
  obs_units = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  record_date = new FormControl('', Validators.required);
  record_code = new FormControl('', Validators.required);
  record_reasonCode = new FormControl('', Validators.required);
  record_reasonDesc = new FormControl('', Validators.required);
  doctor = new FormControl('', Validators.required);
  patient = new FormControl('', Validators.required);

  constructor(public serviceObservation: ObservationService, fb: FormBuilder) {
    this.myForm = fb.group({
      obs_date: this.obs_date,
      obs_code: this.obs_code,
      obs_desc: this.obs_desc,
      obs_value: this.obs_value,
      obs_units: this.obs_units,
      id: this.id,
      record_date: this.record_date,
      record_code: this.record_code,
      record_reasonCode: this.record_reasonCode,
      record_reasonDesc: this.record_reasonDesc,
      doctor: this.doctor,
      patient: this.patient
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceObservation.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'mc.thesis.demo.Observation',
      'obs_date': this.obs_date.value,
      'obs_code': this.obs_code.value,
      'obs_desc': this.obs_desc.value,
      'obs_value': this.obs_value.value,
      'obs_units': this.obs_units.value,
      'id': this.id.value,
      'record_date': this.record_date.value,
      'record_code': this.record_code.value,
      'record_reasonCode': this.record_reasonCode.value,
      'record_reasonDesc': this.record_reasonDesc.value,
      'doctor': this.doctor.value,
      'patient': this.patient.value
    };

    this.myForm.setValue({
      'obs_date': null,
      'obs_code': null,
      'obs_desc': null,
      'obs_value': null,
      'obs_units': null,
      'id': null,
      'record_date': null,
      'record_code': null,
      'record_reasonCode': null,
      'record_reasonDesc': null,
      'doctor': null,
      'patient': null
    });

    return this.serviceObservation.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'obs_date': null,
        'obs_code': null,
        'obs_desc': null,
        'obs_value': null,
        'obs_units': null,
        'id': null,
        'record_date': null,
        'record_code': null,
        'record_reasonCode': null,
        'record_reasonDesc': null,
        'doctor': null,
        'patient': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'mc.thesis.demo.Observation',
      'obs_date': this.obs_date.value,
      'obs_code': this.obs_code.value,
      'obs_desc': this.obs_desc.value,
      'obs_value': this.obs_value.value,
      'obs_units': this.obs_units.value,
      'record_date': this.record_date.value,
      'record_code': this.record_code.value,
      'record_reasonCode': this.record_reasonCode.value,
      'record_reasonDesc': this.record_reasonDesc.value,
      'doctor': this.doctor.value,
      'patient': this.patient.value
    };

    return this.serviceObservation.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceObservation.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceObservation.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'obs_date': null,
        'obs_code': null,
        'obs_desc': null,
        'obs_value': null,
        'obs_units': null,
        'id': null,
        'record_date': null,
        'record_code': null,
        'record_reasonCode': null,
        'record_reasonDesc': null,
        'doctor': null,
        'patient': null
      };

      if (result.obs_date) {
        formObject.obs_date = result.obs_date;
      } else {
        formObject.obs_date = null;
      }

      if (result.obs_code) {
        formObject.obs_code = result.obs_code;
      } else {
        formObject.obs_code = null;
      }

      if (result.obs_desc) {
        formObject.obs_desc = result.obs_desc;
      } else {
        formObject.obs_desc = null;
      }

      if (result.obs_value) {
        formObject.obs_value = result.obs_value;
      } else {
        formObject.obs_value = null;
      }

      if (result.obs_units) {
        formObject.obs_units = result.obs_units;
      } else {
        formObject.obs_units = null;
      }

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.record_date) {
        formObject.record_date = result.record_date;
      } else {
        formObject.record_date = null;
      }

      if (result.record_code) {
        formObject.record_code = result.record_code;
      } else {
        formObject.record_code = null;
      }

      if (result.record_reasonCode) {
        formObject.record_reasonCode = result.record_reasonCode;
      } else {
        formObject.record_reasonCode = null;
      }

      if (result.record_reasonDesc) {
        formObject.record_reasonDesc = result.record_reasonDesc;
      } else {
        formObject.record_reasonDesc = null;
      }

      if (result.doctor) {
        formObject.doctor = result.doctor;
      } else {
        formObject.doctor = null;
      }

      if (result.patient) {
        formObject.patient = result.patient;
      } else {
        formObject.patient = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'obs_date': null,
      'obs_code': null,
      'obs_desc': null,
      'obs_value': null,
      'obs_units': null,
      'id': null,
      'record_date': null,
      'record_code': null,
      'record_reasonCode': null,
      'record_reasonDesc': null,
      'doctor': null,
      'patient': null
      });
  }

}
