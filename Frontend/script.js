// ================= CONFIG =================
const BACKEND_URL = "https://<backend-public-url>"; // Ganti dengan URL backend Clever Cloud

// ================= REGISTER =================
async function register() {
  const nama = document.getElementById("regNama").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, email, password })
    });

    const data = await res.json();
    document.getElementById("regResult").innerText = data.message || JSON.stringify(data);

    if (res.ok) {
      alert("Register berhasil! Silakan login.");
      document.getElementById("regNama").value = "";
      document.getElementById("regEmail").value = "";
      document.getElementById("regPassword").value = "";
    }
  } catch (err) {
    console.error(err);
    alert("Gagal register, cek console.");
  }
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    document.getElementById("loginResult").innerText = data.message || JSON.stringify(data);

    if (res.ok) {
      alert("Login berhasil! Sekarang bisa CRUD pasien.");
      window.location.href = "pasien.html";
    }
  } catch (err) {
    console.error(err);
    alert("Gagal login, cek console.");
  }
}

// ================= CRUD PASIEN =================
async function fetchPatients() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/patients`);
    const patients = await res.json();

    const list = document.getElementById("patientList");
    list.innerHTML = "";

    patients.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `
        <b>${p.nama_pasien}</b> | NIK: ${p.nik} | Lahir: ${p.tanggal_lahir} | JK: ${p.jenis_kelamin} | Alamat: ${p.alamat} | HP: ${p.no_hp}
        <button onclick="deletePatient(${p.id})" style="margin-left:10px;">Hapus</button>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Gagal fetch pasien, cek console.");
  }
}

async function addPatient() {
  const nama_pasien = document.getElementById("nama_pasien").value;
  const nik = document.getElementById("nik").value;
  const tanggal_lahir = document.getElementById("tanggal_lahir").value;
  const jenis_kelamin = document.getElementById("jenis_kelamin").value;
  const alamat = document.getElementById("alamat").value;
  const no_hp = document.getElementById("no_hp").value;

  try {
    await fetch(`${BACKEND_URL}/api/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama_pasien, nik, tanggal_lahir, jenis_kelamin, alamat, no_hp })
    });

    fetchPatients(); // refresh list

    // Clear form
    document.getElementById("nama_pasien").value = "";
    document.getElementById("nik").value = "";
    document.getElementById("tanggal_lahir").value = "";
    document.getElementById("jenis_kelamin").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("no_hp").value = "";

  } catch (err) {
    console.error(err);
    alert("Gagal tambah pasien, cek console.");
  }
}

async function deletePatient(id) {
  try {
    await fetch(`${BACKEND_URL}/api/patients/${id}`, {
      method: "DELETE"
    });

    fetchPatients(); // refresh list
  } catch (err) {
    console.error(err);
    alert("Gagal hapus pasien, cek console.");
  }
}

// ================= AUTO LOAD ==============
