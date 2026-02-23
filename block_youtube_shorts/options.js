function refreshList() {
  chrome.storage.sync.get({ blockList: [] }, (data) => {
    const list = document.getElementById("list");
    list.innerHTML = "";
    data.blockList.forEach((pattern, index) => {
      const li = document.createElement("li");
      li.textContent = pattern;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.onclick = () => {
        data.blockList.splice(index, 1);
        chrome.storage.sync.set({ blockList: data.blockList });
        refreshList();
      };
      li.appendChild(removeBtn);
      list.appendChild(li);
    });
  });
}

document.getElementById("addBtn").onclick = () => {
  const input = document.getElementById("urlPattern");
  const pattern = input.value.trim();
  if (pattern) {
    chrome.storage.sync.get({ blockList: [] }, (data) => {
      data.blockList.push(pattern);
      chrome.storage.sync.set({ blockList: data.blockList });
      input.value = "";
      refreshList();
    });
  }
};

refreshList();
