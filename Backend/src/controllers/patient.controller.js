const db = require("../config/database");

// Create
exports.createPatient = (req, res) => {
  const { nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp } = req.body;
  const user_id = req.user.id;

  if (!nama_pasien) return res.status(400).json({ message: "Nama pasien wajib diisi" });

  const sql = `INSERT INTO patients 
    (user_id, nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [user_id, nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp], (err) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    res.json({ message: "Pasien berhasil ditambahkan" });
  });
};

// Read semua
exports.getPatients = (req, res) => {
  const sql = "SELECT * FROM patients";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    res.json(results);
  });
};

// Read by ID
exports.getPatientById = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM patients WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    if (results.length === 0) return res.status(404).json({ message: "Pasien tidak ditemukan" });
    res.json(results[0]);
  });
};

// Update
exports.updatePatient = (req, res) => {
  const id = req.params.id;
  const { nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp } = req.body;

  const sql = `UPDATE patients SET 
    nama_pasien=?, nik=?, tanggal_lahir=?, jenis_kelamin=?, alamat=?, no_hp=? 
    WHERE id=?`;

  db.query(sql, [nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp, id], (err) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    res.json({ message: "Pasien berhasil diupdate" });
  });
};

// Delete
exports.deletePatient = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM patients WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    res.json({ message: "Pasien berhasil dihapus" });
  });
};
