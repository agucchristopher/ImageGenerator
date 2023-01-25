async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let bodyContent = `prompt=${prompt}`;

    let response = await fetch(
      "http://openai-nodejs-api.vercel.app/ai/createimage",

      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    alert(JSON.Stringify(data));

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    const imageUrl = data.image;
    console.log("img", imageUrl);

    document.querySelector(".image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    console.log(error);
  }
}

function showSpinner() {
  document.querySelector(".loader").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".loader").classList.add("hide");
}

// document.querySelector("#image-form").addEventListener("submit", onSubmit);
function onSubmit() {
  //   document.querySelector(".prompt").textContent = "";
  //   document.querySelector(".image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size);
}
