const button = document.getElementById("Send");
const UserPrompt = document.getElementById("textInput");

function onSend(){
    console.log(UserPrompt.value);
    sendMessage(UserPrompt.value);
}

function resetMemory(){
    sendMessage("/clear");
}

function makeLi(Text){
    let li = document.createElement("li");
    li.innerText = Text;
    document.querySelector("#answer").appendChild(li);
}

async function sendMessage(prompt){
    makeLi(prompt);
    const url = "http://localhost:11434/api/generate";
    const options = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'phi3',
            prompt: prompt,
            raw: true,
            stream: false
        })
    }
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data.response);
    makeLi(data.response);
}