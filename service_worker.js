const port = chrome.runtime.connectNative("com.my_company.my_application")
port.postMessage({command: "start_capture"})
port.onMessage.addListener((message) => {
    console.log("Received message from native host:", message);
    if (1) {
        chrome.runtime.sendMessage({type: "packets", prediction:message.prediction});
    } else if (message.command == "capture_error") {
        console.error("Error during packet capture:",message.error);
    }
});

port.onDisconnect.addListener(() => {
    console.log("Disconnected from native host"+ chrome.runtime.lastError.message);
})