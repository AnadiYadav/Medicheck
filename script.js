document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("select-el");
  const searchButton = document.getElementById("search-button");

  if (selectElement) {
    selectElement.addEventListener("change", handleSelect);
  }

  if (searchButton) {
    searchButton.addEventListener("click", search);
  }
});

function handleSelect(event) {
  const selectedValue = event.target.value;

  if (selectedValue === "1") {
    openCamera();
  } else if (selectedValue === "2") {
    clearImagePreview();
    createImageInput();
  } else {
    clearImagePreview();
  }
}

function clearImagePreview() {
  const capturedImgPreview = document.getElementById("capturedImg-preview");
  if (capturedImgPreview) {
    capturedImgPreview.innerHTML = ""; // Clear the preview area
  }
}

function createImageInput() {
  const existingDiv = document.getElementById("upload-image-div");
  if (!existingDiv) {
    const div = document.createElement("div");
    div.innerHTML = `
      <input type="file" id="file-input" accept="image/*" onchange="previewFile()" style="margin-top: 10px;">
      <label for="file-input" class="file-label">Choose File</label>`;
    div.id = "upload-image-div";
    div.classList.add("input-option");

    const capturedImgPreview = document.getElementById("capturedImg-preview");
    if (capturedImgPreview) {
      capturedImgPreview.appendChild(div);
    }
  }
}

function previewFile() {
  const fileInput = document.getElementById("file-input");
  const capturedImgPreview = document.getElementById("capturedImg-preview");

  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    alert("Please select a valid image file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const base64Image = e.target.result;
    console.log("Base64 Image:", base64Image);

    const existingImagePreview = document.getElementById("image-preview");
    if (!existingImagePreview) {
      const previewContainer = document.createElement("div");
      previewContainer.innerHTML = '<img id="image-preview" src="#" alt="Preview">';
      previewContainer.classList.add("preview-container");
      capturedImgPreview.appendChild(previewContainer);
    }
    const imagePreview = document.getElementById("image-preview");
    imagePreview.src = base64Image;
  };

  reader.readAsDataURL(fileInput.files[0]);
}

async function openCamera() {
  const capturedImgPreview = document.getElementById("capturedImg-preview");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    const captureButton = document.createElement("button");
    const retakeButton = document.createElement("button");

    video.srcObject = stream;
    video.autoplay = true;

    capturedImgPreview.innerHTML = "";
    capturedImgPreview.appendChild(video);
    capturedImgPreview.appendChild(captureButton);

    captureButton.textContent = "Capture Now";
    captureButton.onclick = async () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL("image/jpeg");
      console.log("Captured Base64 Image:", base64Image); // Log the base64 image for debugging

      const capturedImage = document.createElement("img");
      capturedImage.id = "image-preview"; // Ensure the image has the correct ID
      capturedImage.src = base64Image;
      capturedImgPreview.innerHTML = "";
      capturedImgPreview.appendChild(capturedImage);
      capturedImgPreview.appendChild(retakeButton);

      stream.getTracks().forEach((track) => track.stop());
    };

    retakeButton.textContent = "Retake";
    retakeButton.onclick = () => {
      capturedImgPreview.innerHTML = "";
      openCamera();
    };
  } catch (error) {
    console.error("Error accessing the camera:", error);
    alert("Error accessing the camera. Please make sure your camera is connected and accessible.");
  }
}

async function search() {
  const imagePreview = document.getElementById("image-preview");
  const medicineNameInput = document.getElementById("med-name").value.trim();

  if (!imagePreview || imagePreview.src === "#" || !imagePreview.src.startsWith("data:image")) {
    alert("Please select a valid image first.");
    return;
  }

  try {
    const imageData = imagePreview.src;
    console.log("Sending imageData:", imageData);

    const payload = { imageData };

    if (medicineNameInput) {
      payload.medicineName = medicineNameInput;
    }

    // Check if the base64 data URL is too large
    if (imageData.length > 2500000) { // Example threshold, you can adjust this value
      alert("The image is too large to process directly. Please try a different image.");
      return;
    }

    const response = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      displayResult(result);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while processing the image. Please try again later.");
  }
}

function displayResult(result) {
  const resultContainer = document.querySelector(".result");
  resultContainer.innerHTML = "";

  const resultTitle = document.createElement("h2");
  resultTitle.textContent = "Search Result";
  resultContainer.appendChild(resultTitle);

  if (result && result.response) {
    const resultText = document.createElement("p");
    resultText.textContent = result.response;
    resultContainer.appendChild(resultText);
  } else {
    displayNoResultMessage();
  }
}

function displayNoResultMessage() {
  const resultContainer = document.querySelector(".result");
  resultContainer.innerHTML = "";

  const noResultMsg = document.createElement("p");
  noResultMsg.textContent = "No matching result found.";
  resultContainer.appendChild(noResultMsg);
}
//working