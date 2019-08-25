import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace mc.thesis.demo{
   export enum gender {
      Male,
      Female,
      Other,
   }
   export class Patient extends Participant {
      id: string;
      birthDate: string;
      deathDate: string;
      prefix: string;
      first: string;
      last: string;
      ethinicity: string;
      gender: string;
      address: string;
      publicKey: string;
      allowedDoctor: Doctor;
   }
   export abstract class Record extends Asset {
      id: string;
      record_date: string;
      record_code: string;
      record_reasonCode: string;
      record_reasonDesc: string;
      doctor: string;
      patient: string;
   }
   export class Allergy extends Record {
      allergy_start: string;
      allergy_stop: string;
      allergy_code: string;
      allergy_desc: string;
   }
   export class Procedure extends Record {
      procedure_date: string;
      procedure_code: string;
      procedure_desc: string;
      procedure_reasonCode: string;
      procedure_reasonDesc: string;
   }
   export class Observation extends Record {
      obs_date: string;
      obs_code: string;
      obs_desc: string;
      obs_value: string;
      obs_units: string;
   }
   export class Medication extends Record {
      medication_start: string;
      medication_stop: string;
      medication_code: string;
      medication_desc: string;
      medication_reasonCode: string;
      medication_reasonDesc: string;
   }
   export class Immunization extends Record {
      imm_date: string;
      imm_code: string;
      imm_desc: string;
   }
   export class Condition extends Record {
      cond_start: string;
      cond_stop: string;
      cond_code: string;
      cond_desc: string;
   }
   export class Doctor extends Participant {
      id: string;
      name: string;
      phone: string;
      address: string;
      publicKey: string;
   }
   export class PatientKey extends Asset {
      id: string;
      patient: Patient;
      doctor: Doctor;
      encryptedPatientKeyDoctorPublic: string;
   }
   export class AddAllergy extends Transaction {
      allergy: Allergy;
   }
   export class RequestRecordSharing extends Transaction {
      patient: Patient;
      doctor: Doctor;
   }
   export class RequestRecordSharingNotification extends Event {
      patient: Patient;
      doctor: Doctor;
   }
   export class ShareKey extends Transaction {
      patient: Patient;
      doctor: Doctor;
      encryptedPatientKeyDoctorPublic: string;
   }
   export class ShareKeyNotification extends Event {
      patient: Patient;
      doctor: Doctor;
   }
   export class RevokeMedicalRecordsSharing extends Transaction {
      patient: Patient;
      doctor: Doctor;
   }
   export class RevokeMedicalRecordsSharingNotification extends Event {
      patient: Patient;
      doctor: Doctor;
   }
// }
