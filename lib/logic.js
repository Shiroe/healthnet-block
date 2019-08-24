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

"use strict";
/**
 * Write your transction processor functions here
 */

/**
 * This is the transaction function for the ShareKey transaction.
 * It gives a patient's consent to a doctor for accessing the patient's health records.
 *
 * @param {mc.thesis.demo.ShareKey} shareKey -
 * @transaction
 */

const namespace = 'mc.thesis.demo';

async function shareAKey(shareKey) {
  let factory = getFactory();

  let assetRegistry = await getAssetRegistry(`${namespace}.PatientKey`);

  let resource = "resource:";

  let patient = shareKey.patient;
  let doctor = shareKey.doctor;

  // eslint-disable-next-line
  let results = await query("selectPatientKey", {
    p: resource + patient.getFullyQualifiedIdentifier(),
    hp: resource + doctor.getFullyQualifiedIdentifier()
  });

  // If there is a patient key asset that already exists then cancel the transaction and throw an error
  if (results.length > 0) {
    throw new Error(
      "Already shared patient key with doctor: " +
        doctor.name +
        "!"
    );
  }

  // Creates a ShareKey transaction notification
  let shareKeyNotification = factory.newEvent(
    namespace,
    "ShareKeyNotification"
  );

  // Create a new patient key asset
  let patientKey = factory.newResource(
    namespace,
    "PatientKey",
    "" + patient.getIdentifier() + doctor.getIdentifier()
  );

  patientKey.patient = shareKey.patient;
  patientKey.doctor = shareKey.doctor;
  patientKey.encryptedPatientKeyDoctorPublic = shareKey.encryptedPatientKeyDoctorPublic;

  shareKeyNotification.patient = shareKey.patient;
  shareKeyNotification.doctor = shareKey.doctor;

  // Push the notification about the transaction
  emit(shareKeyNotification);

  // Add the new patient key to the blockchain ledger
  await assetRegistry.add(patientKey);

  let patientAssetRegistry = await getParticipantRegistry(`${namespace}.Patient`);

  // Add the doctor to the consent list of the patient who submitted the transaction
  shareKey.patient.allowedDoctor = shareKey.doctor;

  await patientAssetRegistry.update(shareKey.patient);
}

/**
 * This is the transaction function for the AddAllergy transaction.
 *
 * @param {mc.thesis.demo.AddAllergy} allergyTx -
 * @transaction
 */
async function addAllergy(allergyTx) {
  let assetRegistry = await getAssetRegistry(`${namespace}.Allergy`);

  await assetRegistry.add(allergyTx.allergy);
}

/**
 * This is the transaction function for the RevokeMedicalRecordsSharing transaction.
 * It revokes a patient's consent given to a doctor.
 *
 * @param {mc.thesis.demo.RevokeMedicalRecordsSharing} revokeTransaction -
 * @transaction
 */
async function revokeMedicalRecordsSharing(revokeTransaction) {
  let factory = getFactory();

  let assetRegistry = await getAssetRegistry(`${namespace}.PatientKey`);

  let resource = "resource:";

  let patient = revokeTransaction.patient;
  let doctor = revokeTransaction.doctor;

  // eslint-disable-next-line
  let results = await query("selectPatientKey", {
    p: resource + patient.getFullyQualifiedIdentifier(),
    hp: resource + healthProvider.getFullyQualifiedIdentifier()
  });

  // Deletes all patient keys related to the patient and doctor in the transaction
  if (results.length > 0) {
    for (var i = 0; i < results.length; i++) {
      await assetRegistry.remove(results[i]);
    }
  } else {
    throw new Error("No patient key for this Healthcare provider found!");
  }


  // Remove the doctor from the consent list of the patient in the transcation
  patient.allowedDoctor = '';

  let patientAssetRegistry = await getParticipantRegistry(`${namespace}.Patient`);

  // Creates a revoke consent notification
  let revokeMedicalRecordsSharingNotification = factory.newEvent(
    namespace,
    "RevokeMedicalRecordsSharingNotification"
  );

  // Emits the notification
  revokeMedicalRecordsSharingNotification.patient = patient;
  revokeMedicalRecordsSharingNotification.doctor = doctor;
  emit(revokeMedicalRecordsSharingNotification);

  // Update the patient on the blockchain ledger
  await patientAssetRegistry.update(patient);
}

/**
 * This is the transaction function for the RequestRecordSharing transaction.
 * It emits a notfication to the patient about the consent request from the doctor.
 *
 * @param {mc.thesis.demo.RequestRecordSharing} requestRecordSharingTransaction -
 * @transaction
 */
async function requestRecordSharing(requestRecordSharingTransaction) {
  // Creates the notification and emits it.
  let requestRecordSharingNotification = getFactory().newEvent(
    namespace,
    "RequestRecordSharingNotification"
  );
  requestRecordSharingNotification.patient =
    requestRecordSharingTransaction.patient;
  requestRecordSharingNotification.doctor =
    requestRecordSharingTransaction.doctor;
  emit(requestRecordSharingNotification);
}

/**
 * This function checks whether a patient gave a doctor consent
 * by checking whether the doctor is in the patient's consent list.
 * It is used the by access control rules to check consent.
 *
 */
function checkAccessToPatient(patient, doctor) {
  return patient.allowedDoctor.getIdentifier() === doctor.getIdentifier();
}

/**
 * This function checks whether a patient gave a doctor consent by
 * checking whether there is a patient key between the patient and the doctor.
 * It currently does not work.
 *
 */
function checkAccessToPatientUsingPatientKey(patient, doctor) {
  let assetRegistry = getAssetRegistry(`${namespace}.PatientKey`);

  let patientId = `resource:${namespace}.Patient#${patient.id}`;

  let doctorId = `resource:${namespace}.Doctor#${doctor.id}`;

  // eslint-disable-next-line
  let results = query("selectAllPatientKeys");

  for (let n = 0; n < results.length; n++) {
    if (
      results[n].doctor.getIdentifier() ===
      doctor.getIdentifier()
    ) {
      return true;
    }
  }

  if (results.length > 0) {
    return true;
  }

  return false;
}