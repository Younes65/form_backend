document.getElementById("En-btn").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  return SubmitEnglishForm();
});

document.getElementById("Arab-btn").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  return SubmitArabicForm();
});

async function SubmitEnglishForm() {
  try {
    const formData = new FormData(EnglishForm);
    const result = await fetch("https://form-backend-kohl.vercel.app/submit", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      throw new Error(`Server error: ${result.status}`);
    }

    EnglishForm.style.display = "none";
    document.getElementById("en-message").classList.add("show");
  } catch (error) {
    console.error("Error submitting English form:", error);
    // Optionally display error to the user here
  }
}

async function SubmitArabicForm() {
  try {
    const formData = new FormData(ArabForm);
    const result = await fetch("https://form-backend-kohl.vercel.app/submit", {
      method: "POST",
      body: formData,
    });

    if (!result.ok) {
      throw new Error(`Server error: ${result.status}`);
    }

    ArabForm.style.display = "none";
    document.getElementById("ar-message").classList.add("show");
  } catch (error) {
    console.error("Error submitting Arabic form:", error);
    // Optionally display error to the user here
  }
}
