const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
// const authMiddleware = require("../middleware/auth.middleware");

// Jangan pakai JWT middleware supaya bisa langsung akses
// router.use(authMiddleware);

// CRUD pasien
router.post("/", patientController.createPatient);
router.get("/", patientController.getPatients);
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;
