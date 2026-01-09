let token = "";

// ================= REGISTER =================
async function register() {
  const nama = document.getElementById("regNama").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nama, email, password })
  });

  const data = await res.json();
  document.getElementById("regResult").innerText = JSON.stringify(data);

  if (data.token) token = data.token; // ambil token jika register langsung kasih token
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("loginResult").innerText = JSON.stringify(data);

  if (data.token) {
    token = data.token;
    alert("Login berhasil! Token tersimpan, sekarang bisa CRUD pasien.");
    window.location.href = "pasien.html";
  }
}

// ================= CRUD PASIEN =================
async function fetchPatients() {
  const res = await fetch("http://localhost:5000/api/patients", {
    headers: { Authorization: "Bearer " + token }
  });
  const patients = await res.json();
  const list = document.getElementById("patientList");
  list.innerHTML = "";
  patients.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nama_pasien} - ${p.nik} - ${p.tanggal_lahir} - ${p.jenis_kelamin} - ${p.alamat} - ${p.no_hp}
      <button onclick="deletePatient(${p.id})">Hapus</button>
    `;
    list.appendChild(li);
  });
}

async function addPatient() {
  const nama_pasien = document.getElementById("nama_pasien").value;
  const nik = document.getElementById("nik").value;
  const tanggal_lahir = document.getElementById("tanggal_lahir").value;
  const jenis_kelamin = document.getElementById("jenis_kelamin").value;
  const alamat = document.getElementById("alamat").value;
  const no_hp = document.getElementById("no_hp").value;

  await fetch("http://localhost:5000/api/patients", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp })
  });

  fetchPatients(); // refresh list
}

async function deletePatient(id) {
  await fetch(`http://localhost:5000/api/patients/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });
  fetchPatients();
}

// Load pasien saat halaman pasien.html dibuka
if (window.location.pathname.endsWith("pasien.html")) {
  fetchPatients();
}
