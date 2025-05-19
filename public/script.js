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

 async function editBook(event, bookId) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const body = {
    pagesRead: Number(formData.get("pagesRead")),
    completed: formData.has("completed")
  };

  const res = await fetch(`/update/${bookId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  await res.json();
  window.location.href = "/";
}

