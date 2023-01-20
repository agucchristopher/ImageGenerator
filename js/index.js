async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    // let headersList = {
    //   Accept: "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Content-Type": "application/x-www-form-urlencoded",
    // };

    // let bodyContent = `prompt=${prompt}`;

    // let response = await fetch(
    //   "http://chatgpt-image-api.vercel.app/ai/generateimage",
    //   {
    //     method: "POST",
    //     body: bodyContent,
    //     mode: "no-cors",
    //     headers: {
    //       Accept: "*/*",
    //       "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };

    let bodyContent = `prompt=${prompt}`;

    let response = await fetch(
      "http://chatgpt-image-api.vercel.app/ai/generateimage",

      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
        mode: "no-cors",
      }
    );

    let data = await response;
    console.log("data", data);

    // if (!response.ok) {
    //   removeSpinner();
    //   throw new Error("That image could not be generated");
    // }

    // const data = await response.json();
    // console.log(data);

    const imageUrl = data.data;

    document.querySelector(".image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    console.log(error);
  }
}

function showSpinner() {
  //   document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  //   document.querySelector(".spinner").classList.remove("show");
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
