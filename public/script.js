const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries());

  // handle checkbox manually
  body.completed = formData.has("completed");

  const res = await fetch("/books/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const result = await res.json();
  console.log(result);
  window.location.href = "/";
});

async function deleteBook(bookId) {
  const res = await fetch(`/delete/${bookId}`, {
    method: "DELETE"
  });

  await res.json();
  window.location.href = "/";
}
