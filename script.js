function getApiUrl(method) {
  const id = document.getElementById('idInstance').value.trim();
  const token = document.getElementById('apiTokenInstance').value.trim();
  return `https://api.green-api.com/waInstance${id}/${method}/${token}`;
}

function output(response) {
  document.getElementById('output').value = JSON.stringify(response, null, 2);
}

async function getSettings() {
  try {
    const res = await fetch(getApiUrl('getSettings'));
    output(await res.json());
  } catch (error) {
    output({ error: error.message });
  }
}

async function getState() {
  try {
    const res = await fetch(getApiUrl('getStateInstance'));
    output(await res.json());
  } catch (error) {
    output({ error: error.message });
  }
}

async function sendMessage() {
  const chatId = document.getElementById('chatIdMessage').value.trim();
  const message = document.getElementById('messageText').value.trim();

  if (!chatId || !message) {
    output({ error: "Укажите chatId и текст сообщения" });
    return;
  }

  const payload = {
    chatId: chatId.includes("@c.us") ? chatId : `${chatId}@c.us`,
    message: message
  };

  try {
    const res = await fetch(getApiUrl('sendMessage'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    output(await res.json());
  } catch (error) {
    output({ error: error.message });
  }
}

async function sendFile() {
  const chatId = document.getElementById('chatIdFile').value.trim();
  const urlFile = document.getElementById('fileUrl').value.trim();

  if (!chatId || !urlFile) {
    output({ error: "Укажите chatId и URL файла" });
    return;
  }

  const payload = {
    chatId: chatId.includes("@c.us") ? chatId : `${chatId}@c.us`,
    urlFile: urlFile,
    fileName: urlFile.split('/').pop(),
    caption: "Файл от Green API"
  };

  try {
    const res = await fetch(getApiUrl('sendFileByUrl'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    output(await res.json());
  } catch (error) {
    output({ error: error.message });
  }
}
