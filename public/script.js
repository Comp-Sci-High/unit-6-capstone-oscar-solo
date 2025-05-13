console.log("Client-side Javascript");
// Task 3: Write the delete books function using ID
async function deleteBook(id) {
  await fetch('/delete/' + id, { method: 'DELETE' });
  window.location.href = "/";
}


// Task 6: Write the update student function using ID
async function editBook(e, id) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());

  await fetch('/update/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formObject)
  });

  window.location.href = "/";
}
