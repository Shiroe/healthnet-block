const testData: any = {
    allergies: [
        {
            "$class": "mc.thesis.demo.Allergy",
            "allergy_start": "12-08-2019",
            "allergy_code": "Aute id eiusmod.",
            "id": "2039",
            "record_date": "10-08-2019",
            "record_code": "Fugiat fugiat laboris.",
            "doctor": "resource:mc.thesis.demo.Doctor#1",
            "patient": "resource:mc.thesis.demo.Patient#1"
        },
    ],
    conditions: [
        {
            "$class": "mc.thesis.demo.Condition",
            "cond_start": "08-07-2019",
            "cond_code": "Incididunt",
            "id": "2976",
            "record_date": "20-07-2019",
            "record_code": "Lorem mollit est laborum.",
            "doctor": "resource:mc.thesis.demo.Doctor#1",
            "patient": "resource:mc.thesis.demo.Patient#1"
        },
    ],
    immunizations: [
        {
            "$class": "mc.thesis.demo.Immunization",
            "imm_date": "16-08-2019",
            "imm_code": "Ipsum commodo quis sunt.",
            "id": "4937",
            "record_date": "15-08-2019",
            "record_code": "Nostrud Lorem laboris.",
            "doctor": "resource:mc.thesis.demo.Doctor#1",
            "patient": "resource:mc.thesis.demo.Patient#1"
        },
    ],
    medications: [
        {
            "$class": "mc.thesis.demo.Medication",
            "medication_start": "25-07-2019",
            "medication_code": "Ipsum non magna.",
            "medication_desc": "Esse ad minim ipsum ad.",
            "id": "6893",
            "record_date": "20-07-2019",
            "record_code": "Pariatur ipsum.",
            "doctor": "resource:mc.thesis.demo.Doctor#1",
            "patient": "resource:mc.thesis.demo.Patient#1"
        },
    ],
    observations: [
        {
            "$class": "mc.thesis.demo.Observation",
            "obs_date": "20-08-2019",
            "obs_code": "Ad minim anim tempor.",
            "obs_value": "Enim sit.",
            "obs_units": "Ad.",
            "id": "9246",
            "record_date": "20-08-2019",
            "record_code": "Magna sit cupidatat labore non.",
            "doctor": "resource:mc.thesis.demo.Doctor#1",
            "patient": "resource:mc.thesis.demo.Patient#1"
        },
    ],
    procedures: [
        {
            "$class": "mc.thesis.demo.Procedure",
            "procedure_date": "29-08-2019",
            "procedure_code": "Enim consectetur magna excepteur sunt.",
            "procedure_desc": "Qui labore commodo et.",
            "id": "1529",
            "record_date": "22-08-2019",
            "record_code": "Anim irure exercitation ipsum.",
            "doctor": "resource:mc.thesis.demo.Doctor#1",
            "patient": "resource:mc.thesis.demo.Patient#1"
        },
    ],
    patients: [
        {
            "$class": "mc.thesis.demo.Patient",
            "id": "1",
            "birthDate": "02-04-1979",
            "first": "Jon",
            "last": "Doe",
            "address": "Officia sint.",
            "publicKey": "pat1",
            "allowedDoctor": {
                "$class": "mc.thesis.demo.Doctor",
                "id": "1",
                "name": "Dr Phil Bowel",
                "phone": "1234567890",
                "address": "Laboris et magna incididunt officia.",
                "publicKey": "test1"
            }
        },
        {
            "$class": "mc.thesis.demo.Patient",
            "id": "2",
            "birthDate": "15-09-1988",
            "first": "Smith",
            "last": "Smithesson",
            "address": "Pariatur ipsum",
            "publicKey": "pat2",
            "allowedDoctor": {
                "$class": "mc.thesis.demo.Doctor",
                "id": "2",
                "name": "Dr Katherine Johnsons",
                "phone": "0987654321",
                "address": "Laboris et magna incididunt officia.",
                "publicKey": "test2"
            }
        }
    ],
    doctors: [
        {
            "$class": "mc.thesis.demo.Doctor",
            "id": "1",
            "name": "Dr Phil Bowel",
            "phone": "1234567890",
            "address": "Laboris et magna incididunt officia.",
            "publicKey": "test1"
        },
        {
            "$class": "mc.thesis.demo.Doctor",
            "id": "2",
            "name": "Dr Katherine Johnsons",
            "phone": "0987654321",
            "address": "Laboris et magna incididunt officia.",
            "publicKey": "test2"
        }
    ]
};

export { testData };