async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const post_content = document.querySelector(
    'textarea[name="post_content"]'
  ).value;

  if (title && post_content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      alert("Post created!");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".post-form").addEventListener("submit", newFormHandler);

// edit post
async function editFormHandler(event) {
  event.preventDefault();
  if (event.target.hasAttribute("edit-post-data-id")) {
    const id = event.target.getAttribute("edit-post-data-id");

    const title = document.querySelector('input[name="edit-title"]').value;
    const post_content = document.querySelector(
      'textarea[name="edit-post-content"]'
    ).value;

    if (title && post_content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          post_content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
        confirm("Update post?");
      } else {
        alert(response.statusText);
      }
    }
  }
}

document
  .querySelector("#editPostID")
  .addEventListener("click", editFormHandler);

// delete post
async function deleteFormHandler(event) {
  event.preventDefault();
  if (event.target.hasAttribute("delete-post-data-id")) {
    const id = event.target.getAttribute("delete-post-data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      confirm("Delete post?");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#postID").addEventListener("click", deleteFormHandler);
