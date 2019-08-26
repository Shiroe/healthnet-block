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

import { Component } from '@angular/core';

// import relevant services for test data creation
import { AllergyService } from '../Allergy/Allergy.service';
import { ConditionService } from '../Condition/Condition.service';
import { ImmunizationService } from '../Immunization/Immunization.service';
import { MedicationService } from '../Medication/Medication.service';
import { ObservationService } from '../Observation/Observation.service';
import { ProcedureService } from '../Procedure/Procedure.service';

import { DoctorService } from '../Doctor/Doctor.service';
import { PatientService } from '../Patient/Patient.service';

import { testData } from './testData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    AllergyService,
    ConditionService,
    ImmunizationService,
    MedicationService,
    ObservationService,
    ProcedureService,
    DoctorService,
    PatientService
  ]
})
export class HomeComponent {

  constructor (
      public serviceAllergy: AllergyService,
      public serviceCondition: ConditionService,
      public serviceImmunization: ImmunizationService,
      public serviceMedication: MedicationService,
      public serviceObservation: ObservationService,
      public serviceProcedure: ProcedureService,
      public serviceDoctor: DoctorService,
      public servicePatient: PatientService
    ) {
  }

  private responseMessage: string = null;
  
  async generateData(): Promise<any> {
    const {
      allergies, conditions, immunizations,
      medications, observations, procedures,
      doctors, patients
    } = testData;

    this.responseMessage = 'Generating...';

    await this.serviceAllergy.addAsset(allergies[0])
    .toPromise()
    .then(() => console.log('Allergy asset created.'));
    
    await this.serviceCondition.addAsset(conditions[0])
    .toPromise()
    .then(() => console.log('Condition asset created.'));
    
    await this.serviceImmunization.addAsset(immunizations[0])
    .toPromise()
    .then(() => console.log('Immunization asset created.'));
    
    await this.serviceMedication.addAsset(medications[0])
    .toPromise()
    .then(() => console.log('Medication asset created.'));
    
    await this.serviceObservation.addAsset(observations[0])
    .toPromise()
    .then(() => console.log('Observation asset created.'));
    
    await this.serviceProcedure.addAsset(procedures[0])
    .toPromise()
    .then(() => console.log('Procedure asset created.'));

    await this.serviceDoctor.addParticipant(doctors[0])
    .toPromise()
    .then(() => console.log('Doctor participant created.'));

    await this.serviceDoctor.addParticipant(doctors[1])
    .toPromise()
    .then(() => console.log('Doctor participant created.'));
    
    await this.servicePatient.addParticipant(patients[0])
    .toPromise()
    .then(() => console.log('Patient participant created.'));
    
    await this.servicePatient.addParticipant(patients[1])
    .toPromise()
    .then(() => console.log('Patient participant created.'));
    

    this.responseMessage = 'Generating Test DATA complete!';
  }
}
