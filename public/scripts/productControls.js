function deleteFunction(id) {
  const result = confirm("Are you sure about this?");

  if (result) {
    fetch("/delete-product/" + id, { method: "POST" }).then((res) => {
      if (res.ok) location.reload();
    });
  }
  
}
