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
import { ProcedureService } from './Procedure.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-procedure',
  templateUrl: './Procedure.component.html',
  styleUrls: ['./Procedure.component.css'],
  providers: [ProcedureService]
})
export class ProcedureComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  procedure_date = new FormControl('', Validators.required);
  procedure_code = new FormControl('', Validators.required);
  procedure_desc = new FormControl('', Validators.required);
  procedure_reasonCode = new FormControl('', Validators.required);
  procedure_reasonDesc = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  record_date = new FormControl('', Validators.required);
  record_code = new FormControl('', Validators.required);
  record_reasonCode = new FormControl('', Validators.required);
  record_reasonDesc = new FormControl('', Validators.required);
  doctor = new FormControl('', Validators.required);
  patient = new FormControl('', Validators.required);

  constructor(public serviceProcedure: ProcedureService, fb: FormBuilder) {
    this.myForm = fb.group({
      procedure_date: this.procedure_date,
      procedure_code: this.procedure_code,
      procedure_desc: this.procedure_desc,
      procedure_reasonCode: this.procedure_reasonCode,
      procedure_reasonDesc: this.procedure_reasonDesc,
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
    return this.serviceProcedure.getAll()
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
      $class: 'mc.thesis.demo.Procedure',
      'procedure_date': this.procedure_date.value,
      'procedure_code': this.procedure_code.value,
      'procedure_desc': this.procedure_desc.value,
      'procedure_reasonCode': this.procedure_reasonCode.value,
      'procedure_reasonDesc': this.procedure_reasonDesc.value,
      'id': this.id.value,
      'record_date': this.record_date.value,
      'record_code': this.record_code.value,
      'record_reasonCode': this.record_reasonCode.value,
      'record_reasonDesc': this.record_reasonDesc.value,
      'doctor': this.doctor.value,
      'patient': this.patient.value
    };

    this.myForm.setValue({
      'procedure_date': null,
      'procedure_code': null,
      'procedure_desc': null,
      'procedure_reasonCode': null,
      'procedure_reasonDesc': null,
      'id': null,
      'record_date': null,
      'record_code': null,
      'record_reasonCode': null,
      'record_reasonDesc': null,
      'doctor': null,
      'patient': null
    });

    return this.serviceProcedure.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'procedure_date': null,
        'procedure_code': null,
        'procedure_desc': null,
        'procedure_reasonCode': null,
        'procedure_reasonDesc': null,
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
      $class: 'mc.thesis.demo.Procedure',
      'procedure_date': this.procedure_date.value,
      'procedure_code': this.procedure_code.value,
      'procedure_desc': this.procedure_desc.value,
      'procedure_reasonCode': this.procedure_reasonCode.value,
      'procedure_reasonDesc': this.procedure_reasonDesc.value,
      'record_date': this.record_date.value,
      'record_code': this.record_code.value,
      'record_reasonCode': this.record_reasonCode.value,
      'record_reasonDesc': this.record_reasonDesc.value,
      'doctor': this.doctor.value,
      'patient': this.patient.value
    };

    return this.serviceProcedure.updateAsset(form.get('id').value, this.asset)
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

    return this.serviceProcedure.deleteAsset(this.currentId)
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

    return this.serviceProcedure.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'procedure_date': null,
        'procedure_code': null,
        'procedure_desc': null,
        'procedure_reasonCode': null,
        'procedure_reasonDesc': null,
        'id': null,
        'record_date': null,
        'record_code': null,
        'record_reasonCode': null,
        'record_reasonDesc': null,
        'doctor': null,
        'patient': null
      };

      if (result.procedure_date) {
        formObject.procedure_date = result.procedure_date;
      } else {
        formObject.procedure_date = null;
      }

      if (result.procedure_code) {
        formObject.procedure_code = result.procedure_code;
      } else {
        formObject.procedure_code = null;
      }

      if (result.procedure_desc) {
        formObject.procedure_desc = result.procedure_desc;
      } else {
        formObject.procedure_desc = null;
      }

      if (result.procedure_reasonCode) {
        formObject.procedure_reasonCode = result.procedure_reasonCode;
      } else {
        formObject.procedure_reasonCode = null;
      }

      if (result.procedure_reasonDesc) {
        formObject.procedure_reasonDesc = result.procedure_reasonDesc;
      } else {
        formObject.procedure_reasonDesc = null;
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
      'procedure_date': null,
      'procedure_code': null,
      'procedure_desc': null,
      'procedure_reasonCode': null,
      'procedure_reasonDesc': null,
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
