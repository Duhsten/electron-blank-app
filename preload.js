// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const { contextBridge } = require("electron");
const { session } = require('electron')


const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("close-button").addEventListener("click", (event) => {
    ipcRenderer.invoke("quit-app");
  });
  document.getElementById("max-button").addEventListener("click", (event) => {
    ipcRenderer.invoke("max-app");
  });
  document
    .getElementById("restore-button")
    .addEventListener("click", (event) => {
      ipcRenderer.invoke("restore-app");
    });
  document.getElementById("min-button").addEventListener("click", (event) => {
    ipcRenderer.invoke("min-app");
  });
});
