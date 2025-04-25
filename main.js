function renderChart() {
  const chart = document.getElementById("chart");
  chart.innerHTML = "";
  const entries = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = Number(localStorage.getItem(key));
    if (!isNaN(value)) {
      entries.push({ key, value });
    }
  }
  if (entries.length === 0) return;
  const max = Math.max(...entries.map((item) => item.value));
  const maxHeight = 300;
  entries.forEach(({ key, value }) => {
    const container = document.createElement("div");
    container.className = "bar-container";
    const bar = document.createElement("div");
    bar.className = "bar";
    const fixedHeight = Math.max(10, (value / max) * maxHeight);
    bar.style.height = `${fixedHeight}px`;
    bar.title = `${key}: ${value}`;
    bar.textContent = value;
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = key;
    container.appendChild(bar);
    container.appendChild(label);
    chart.appendChild(container);
  });
}

function renderTable() {
  const edit = document.getElementById("edit");
  edit.innerHTML = "";
  const table = document.createElement("table");
  table.setAttribute("border", "1");
  table.style.borderCollapse = "collapse";
  const header = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.textContent = "ID";
  const th2 = document.createElement("th");
  th2.textContent = "값";
  const th3 = document.createElement("th");
  th3.textContent = "";
  header.appendChild(th1);
  header.appendChild(th2);
  header.appendChild(th3);
  table.appendChild(header);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const row = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = key;
    const td2 = document.createElement("td");
    td2.textContent = value;
    const td3 = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.onclick = () => {
      if (confirm(`"${key}" 데이터를 삭제할까요?`)) {
        localStorage.removeItem(key);
        row.remove();
        renderAll();
      }
    };
    td3.appendChild(deleteButton);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    table.appendChild(row);
  }
  edit.appendChild(table);
}
function renderAdvance() {
  const advance = document.getElementById("advance");
  advance.innerHTML = "";
  const area = document.createElement("textarea");
  area.className = "area-edit";
  area.rows = 15;
  area.cols = 60;
  area.style.fontFamily = "monospace";
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    data[key] = isNaN(Number(value)) ? value : Number(value);
  }
  area.value = JSON.stringify(data, null, 2);
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "저장";
  saveBtn.style.marginTop = "10px";
  saveBtn.onclick = () => {
    try {
      const parsed = JSON.parse(area.value);
      localStorage.clear();
      for (const key in parsed) {
        localStorage.setItem(key, parsed[key]);
      }
      alert("저장되었습니다!");
      renderAll();
    } catch (err) {
      alert("유효한 JSON 형식이 아닙니다.");
    }
  };
  advance.appendChild(area);
  advance.appendChild(document.createElement("br"));
  advance.appendChild(saveBtn);
}
function basicSet() {
  localStorage.setItem("1", "12");
  localStorage.setItem("2", "16");
  localStorage.setItem("3", "19");
}
function addStorage() {
  const idInput = document.getElementById("input-id");
  const valueInput = document.getElementById("input-value");
  const id = idInput.value.trim();
  const value = valueInput.value.trim();
  if (!id || !value) {
    alert("ID와 Value를 모두 입력하세요.");
    return;
  }
  if (isNaN(Number(value))) {
    alert("Value는 숫자여야 합니다.");
    return;
  }
  if (localStorage.getItem(id)) {
    alert("이미 존재하는 ID입니다");
    return;
  }
  localStorage.setItem(id, value);
  idInput.value = "";
  valueInput.value = "";
  renderAll();
}

function renderAll() {
  renderChart();
  renderTable();
  renderAdvance();
}
basicSet();
renderAll();
