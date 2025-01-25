
chrome.runtime.sendMessage({ type: "ready" }, (response) => {
    console.log("Response from background:", response.status);
  });
  
  // If you want to send a "hello" message later
  chrome.runtime.sendMessage({ type: "hello" }, (response) => {
    console.log("Response from background:", response);
  });
  