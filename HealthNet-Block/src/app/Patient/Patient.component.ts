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
import { PatientService } from './Patient.service';
import { DoctorService } from '../Doctor/Doctor.service';
import 'rxjs/add/operator/toPromise';

// Asset construction services
import { AllergyService } from '../Allergy/Allergy.service';
import { ConditionService } from '../Condition/Condition.service';
import { ImmunizationService } from '../Immunization/Immunization.service';
import { MedicationService } from '../Medication/Medication.service';
import { ObservationService } from '../Observation/Observation.service';
import { ProcedureService } from '../Procedure/Procedure.service';

@Component({
  selector: 'app-patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.css'],
  providers: [
    PatientService,
    DoctorService,
    AllergyService,
    ConditionService,
    ImmunizationService,
    MedicationService,
    ObservationService,
    ProcedureService
  ]
})
export class PatientComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private allDoctors;
  private participant;
  private currentId;
  private errorMessage;

  private patientRecord = {
    allergies: [],
    conditions: [],
    immunizations: [],
    medications: [],
    observations: [],
    procedures: []
  };
  
  id = new FormControl('', Validators.required);
  birthDate = new FormControl('', Validators.required);
  deathDate = new FormControl('', Validators.required);
  prefix = new FormControl('', Validators.required);
  first = new FormControl('', Validators.required);
  last = new FormControl('', Validators.required);
  ethinicity = new FormControl('', Validators.required);
  gender = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  publicKey = new FormControl('', Validators.required);
  allowedDoctor = new FormControl('', Validators.required);


  constructor(
    public servicePatient: PatientService, public serviceDoctor: DoctorService,
    public serviceAllergy: AllergyService, public serviceCondition: ConditionService,
    public serviceImmunization: ImmunizationService, public serviceMedication: MedicationService,
    public serviceObservation: ObservationService, public serviceProcedure: ProcedureService,
    fb: FormBuilder
    ) {
    
      this.myForm = fb.group({
      id: this.id,
      birthDate: this.birthDate,
      deathDate: this.deathDate,
      prefix: this.prefix,
      first: this.first,
      last: this.last,
      ethinicity: this.ethinicity,
      gender: this.gender,
      address: this.address,
      publicKey: this.publicKey,
      allowedDoctor: this.allowedDoctor
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  async loadAll(): Promise<any> {
    const tempParticipantsList = [];
    const tempDoctorsList = [];

    await this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempParticipantsList.push(participant);
      });
      this.allParticipants = tempParticipantsList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });

    return this.serviceDoctor.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(doctor => {
        tempDoctorsList.push(doctor);
      });
      this.allDoctors = tempDoctorsList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'mc.thesis.demo.Patient',
      'id': this.id.value,
      'birthDate': this.birthDate.value,
      'deathDate': this.deathDate.value,
      'prefix': this.prefix.value,
      'first': this.first.value,
      'last': this.last.value,
      'ethinicity': this.ethinicity.value,
      'gender': this.gender.value,
      'address': this.address.value,
      'publicKey': this.publicKey.value,
      'allowedDoctor': this.allDoctors.filter(doc => doc.id === this.allowedDoctor.value)[0]
    };

    this.myForm.setValue({
      'id': null,
      'birthDate': null,
      'deathDate': null,
      'prefix': null,
      'first': null,
      'last': null,
      'ethinicity': null,
      'gender': null,
      'address': null,
      'publicKey': null,
      'allowedDoctor': null
    });

    return this.servicePatient.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'birthDate': null,
        'deathDate': null,
        'prefix': null,
        'first': null,
        'last': null,
        'ethinicity': null,
        'gender': null,
        'address': null,
        'publicKey': null,
        'allowedDoctor': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'mc.thesis.demo.Patient',
      'birthDate': this.birthDate.value,
      'deathDate': this.deathDate.value,
      'prefix': this.prefix.value,
      'first': this.first.value,
      'last': this.last.value,
      'ethinicity': this.ethinicity.value,
      'gender': this.gender.value,
      'address': this.address.value,
      'publicKey': this.publicKey.value,
      'allowedDoctor': this.allDoctors.filter(doc => doc.id === this.allowedDoctor.value)[0]
    };

    return this.servicePatient.updateParticipant(form.get('id').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.servicePatient.deleteParticipant(this.currentId)
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

    return this.servicePatient.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'birthDate': null,
        'deathDate': null,
        'prefix': null,
        'first': null,
        'last': null,
        'ethinicity': null,
        'gender': null,
        'address': null,
        'publicKey': null,
        'allowedDoctor': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.birthDate) {
        formObject.birthDate = result.birthDate;
      } else {
        formObject.birthDate = null;
      }

      if (result.deathDate) {
        formObject.deathDate = result.deathDate;
      } else {
        formObject.deathDate = null;
      }

      if (result.prefix) {
        formObject.prefix = result.prefix;
      } else {
        formObject.prefix = null;
      }

      if (result.first) {
        formObject.first = result.first;
      } else {
        formObject.first = null;
      }

      if (result.last) {
        formObject.last = result.last;
      } else {
        formObject.last = null;
      }

      if (result.ethinicity) {
        formObject.ethinicity = result.ethinicity;
      } else {
        formObject.ethinicity = null;
      }

      if (result.gender) {
        formObject.gender = result.gender;
      } else {
        formObject.gender = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.publicKey) {
        formObject.publicKey = result.publicKey;
      } else {
        formObject.publicKey = null;
      }

      if (result.allowedDoctor) {
        formObject.allowedDoctor = this.allDoctors.filter(doc => doc.id === result.allowedDoctor.id)[0];
      } else {
        formObject.allowedDoctor = null;
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


  async getRecord(id: string): Promise<any> {
    const patientRecord = {
      allergies: [],
      conditions: [],
      immunizations: [],
      medications: [],
      observations: [],
      procedures: []
    };

    const resourceId = `resource:mc.thesis.demo.Patient#${id}`;

    await this.serviceAllergy.getAll()
    .toPromise()
    .then((results) => {
      patientRecord.allergies = results.filter(allergy => allergy.patient === resourceId);
    });

    await this.serviceCondition.getAll()
    .toPromise()
    .then((results) => {
      patientRecord.conditions = results.filter(condition => condition.patient === resourceId);
    });

    await this.serviceImmunization.getAll()
    .toPromise()
    .then((results) => {
      patientRecord.immunizations = results.filter(immunization => immunization.patient === resourceId);
    });

    await this.serviceMedication.getAll()
    .toPromise()
    .then((results) => {
      patientRecord.medications = results.filter(medication => medication.patient === resourceId);
    });

    await this.serviceObservation.getAll()
    .toPromise()
    .then((results) => {
      patientRecord.observations = results.filter(observation => observation.patient === resourceId);
    });

    await this.serviceProcedure.getAll()
    .toPromise()
    .then((results) => {
      patientRecord.procedures = results.filter(procedure => procedure.patient === resourceId);
    });

    this.patientRecord = patientRecord;
  }

  resetRecord(): void {
    this.patientRecord = {
      allergies: [],
      conditions: [],
      immunizations: [],
      medications: [],
      observations: [],
      procedures: []
    };
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'birthDate': null,
      'deathDate': null,
      'prefix': null,
      'first': null,
      'last': null,
      'ethinicity': null,
      'gender': null,
      'address': null,
      'publicKey': null,
      'allowedDoctor': null
    });
  }
}
