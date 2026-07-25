
const members = ["Edan","Éric","Franck","Nelly","Julio","David","Georges","Calvin","Malvina"];
const mode = document.body.dataset.mode;
const key = mode === "demo" ? "ronkala_demo_v3" : "ronkala_real_v3";

const demoData = {
  contributions: [
    {date:"2026-07-05", member:"Edan", mode:"Transfert à la trésorière", proof:"Reçu joint", amount:20000},
    {date:"2026-07-03", member:"Georges", mode:"Comptoir bancaire", proof:"—", amount:10000},
    {date:"2026-06-10", member:"Nelly", mode:"Comptoir bancaire", proof:"—", amount:10000},
    {date:"2026-06-02", member:"Edan", mode:"Transfert à la trésorière", proof:"Reçu joint", amount:20000},
    {date:"2026-05-15", member:"Georges", mode:"Comptoir bancaire", proof:"—", amount:15000},
    {date:"2026-05-08", member:"Julio", mode:"Transfert à la trésorière", proof:"Reçu joint", amount:8000}
  ],
  withdrawals: [
    {date:"2026-06-20", member:"Edan", reason:"Maladie", status:"Validé", amount:5000},
    {date:"2026-07-14", member:"Georges", reason:"Rentrée scolaire", status:"Validé", amount:4000},
    {date:"2026-07-18", member:"Julio", reason:"Maladie", status:"En attente", amount:3000},
    {date:"2026-07-19", member:"Éric", reason:"Autre", status:"En attente", amount:2000}
  ]
};

function emptyData(){ return {contributions:[], withdrawals:[]}; }

function load(){
  const saved = localStorage.getItem(key);
  if(saved) return JSON.parse(saved);
  const initial = mode === "demo" ? demoData : emptyData();
  localStorage.setItem(key, JSON.stringify(initial));
  return JSON.parse(JSON.stringify(initial));
}

let data = load();

function save(){
  localStorage.setItem(key, JSON.stringify(data));
  render();
}

function money(n){
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

function formatDate(iso){
  if(!iso) return "";
  const [y,m,d]=iso.split("-");
  return `${d}/${m}/${y}`;
}

function render(){
  const totalC = data.contributions.reduce((s,x)=>s+Number(x.amount),0);
  const validW = data.withdrawals.filter(x=>x.status==="Validé").reduce((s,x)=>s+Number(x.amount),0);
  const pending = data.withdrawals.filter(x=>x.status==="En attente").length;

  document.getElementById("totalContributions").textContent = money(totalC);
  document.getElementById("totalWithdrawals").textContent = money(validW);
  document.getElementById("balance").textContent = money(totalC-validW);
  document.getElementById("pendingCount").textContent = pending;

  const cBody = document.getElementById("contributionRows");
  cBody.innerHTML = data.contributions.length ? data.contributions.slice().reverse().map(x=>`
    <tr><td>${formatDate(x.date)}</td><td>${x.member}</td><td>${x.mode}</td><td>${x.proof || "—"}</td><td class="amount">${money(x.amount)}</td></tr>
  `).join("") : '<tr><td colspan="5" class="empty">Aucun versement enregistré.</td></tr>';

  const wBody = document.getElementById("withdrawalRows");
  wBody.innerHTML = data.withdrawals.length ? data.withdrawals.slice().reverse().map(x=>`
    <tr><td>${formatDate(x.date)}</td><td>${x.member}</td><td>${x.reason}</td><td><span class="badge ${x.status==="Validé"?"ok":"wait"}">${x.status}</span></td><td class="amount">${money(x.amount)}</td></tr>
  `).join("") : '<tr><td colspan="5" class="empty">Aucune demande enregistrée.</td></tr>';

  const memberRows = document.getElementById("memberRows");
  memberRows.innerHTML = members.map(m=>{
    const paid = data.contributions.filter(x=>x.member===m).reduce((s,x)=>s+Number(x.amount),0);
    const taken = data.withdrawals.filter(x=>x.member===m && x.status==="Validé").reduce((s,x)=>s+Number(x.amount),0);
    const role = m==="Nelly" ? "Trésorière" : "Membre";
    return `<tr><td>${m}</td><td><span class="role">${role}</span></td><td class="amount">${money(paid)}</td><td class="amount">${money(taken)}</td><td class="amount">${money(paid-taken)}</td></tr>`;
  }).join("");

  document.getElementById("alertText").textContent = pending ? `${pending} demande(s) de retrait en attente.` : "Aucune alerte.";
}

document.getElementById("contributionForm").addEventListener("submit", e=>{
  e.preventDefault();
  const amount = Number(document.getElementById("cAmount").value);
  if(!amount || amount <= 0) return alert("Veuillez saisir un montant valide.");
  data.contributions.push({
    member: document.getElementById("cMember").value,
    amount,
    date: document.getElementById("cDate").value,
    reason: document.getElementById("cReason").value,
    mode: document.getElementById("cMode").value,
    proof: document.getElementById("cProof").value.trim() || "—"
  });
  e.target.reset();
  setToday();
  save();
  alert("Versement enregistré.");
});

document.getElementById("withdrawalForm").addEventListener("submit", e=>{
  e.preventDefault();
  const amount = Number(document.getElementById("wAmount").value);
  if(!amount || amount <= 0) return alert("Veuillez saisir un montant valide.");
  data.withdrawals.push({
    member: document.getElementById("wMember").value,
    amount,
    date: document.getElementById("wDate").value,
    reason: document.getElementById("wReason").value,
    status: document.getElementById("wStatus").value
  });
  e.target.reset();
  setToday();
  save();
  alert("Demande enregistrée.");
});

document.getElementById("resetBtn").addEventListener("click", ()=>{
  if(document.getElementById("confirmReset").value.trim() !== "CONFIRMER"){
    return alert("Tapez CONFIRMER pour autoriser la remise à zéro.");
  }
  data = emptyData();
  save();
  document.getElementById("confirmReset").value = "";
  alert("Les données ont été remises à zéro.");
});

document.getElementById("exportBtn").addEventListener("click", ()=>{
  const blob = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `caisse-ronkala-${mode}-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

function setToday(){
  const today = new Date().toISOString().slice(0,10);
  document.getElementById("cDate").value = today;
  document.getElementById("wDate").value = today;
}

setToday();
render();
