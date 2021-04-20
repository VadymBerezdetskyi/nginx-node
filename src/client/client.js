


const button = document.querySelector('#submit');
const result = document.querySelector('#result');
button.addEventListener('click', () => {
    fetch("http://web-technologies.local/json-rpc", {
    method: "POST",
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        "jsonrpc": "2.0",
        "id": 12314,
        "method": "echo",
        "params": {
            "text": "asdfsdfds"
        }
    }),
}).then((response) => {
    if (response.status === 200) {
        return response
            .json()
            .then((jsonRPCResponse) => result.innerHTML = jsonRPCResponse.result);
    } else if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
    }
});
});