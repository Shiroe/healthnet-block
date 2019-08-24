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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AllergyComponent } from './Allergy/Allergy.component';
import { ProcedureComponent } from './Procedure/Procedure.component';
import { ObservationComponent } from './Observation/Observation.component';
import { MedicationComponent } from './Medication/Medication.component';
import { ImmunizationComponent } from './Immunization/Immunization.component';
import { ConditionComponent } from './Condition/Condition.component';
import { PatientKeyComponent } from './PatientKey/PatientKey.component';

import { PatientComponent } from './Patient/Patient.component';
import { DoctorComponent } from './Doctor/Doctor.component';

import { AddAllergyComponent } from './AddAllergy/AddAllergy.component';
import { RequestRecordSharingComponent } from './RequestRecordSharing/RequestRecordSharing.component';
import { ShareKeyComponent } from './ShareKey/ShareKey.component';
import { RevokeMedicalRecordsSharingComponent } from './RevokeMedicalRecordsSharing/RevokeMedicalRecordsSharing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Allergy', component: AllergyComponent },
  { path: 'Procedure', component: ProcedureComponent },
  { path: 'Observation', component: ObservationComponent },
  { path: 'Medication', component: MedicationComponent },
  { path: 'Immunization', component: ImmunizationComponent },
  { path: 'Condition', component: ConditionComponent },
  { path: 'PatientKey', component: PatientKeyComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'AddAllergy', component: AddAllergyComponent },
  { path: 'RequestRecordSharing', component: RequestRecordSharingComponent },
  { path: 'ShareKey', component: ShareKeyComponent },
  { path: 'RevokeMedicalRecordsSharing', component: RevokeMedicalRecordsSharingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
