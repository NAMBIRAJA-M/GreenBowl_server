chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "ready") {
      console.log("Content script is ready");
      sendResponse({ status: "listening" });
      return true; // Keep the channel open for async response
    }
    if (message.type === "hello") {
      console.log("Received hello from content script");
    }
    return true;
  });
  