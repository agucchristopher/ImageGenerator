const generateImageRequest = async (prompt, size) => {
  try {
    showSpinner();
    alert('Function Called') 
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

   let bodyContent = { prompt: `${prompt}`};
    //alert(bodyContent.prompt)
    let response = await fetch(
      "https://super-apron-wasp.cyclic.app/ai/createimage",
      {
        method: "POST",
        body: JSON.stringify(bodyContent),
        headers: headersList,
      }
    );

    let data = await response.json();
    //alert('received');

    if (!response.ok) {
      removeSpinner();
      alert("That image could not be generated");
    }

    const imageUrl = data.image;
    //alert(imageUrl);

    document.querySelector("#image").src = imageUrl;

    removeSpinner();
  } catch (error) {
    alert(error.message);
  }
}

function showSpinner() {
  document.querySelector(".loader").classList.remove("hide");
}

function removeSpinner() {
  document.querySelector(".loader").classList.add("hide");
}

// document.querySelector("#image-form").addEventListener("submit", onSubmit);
function onSubmit() {
   //document.querySelector(".prompt").textContent = "";
  document.querySelector("#image").src = "";
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please add some text");
    return;
  }

  generateImageRequest(prompt, size);
}
