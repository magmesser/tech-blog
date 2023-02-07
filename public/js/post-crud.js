async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title"]').value;
    const post_content = document.querySelector('textarea[name="post_content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.post-form').addEventListener('submit', newFormHandler);

  // edit post
async function editFormHandler(event) {
  event.preventDefault();
  
  const title = document.querySelector('input[name="title"]').value;
  const post_content = document.querySelector('input[name="post_content"]').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#edit-btn").addEventListener("submit", editFormHandler);

// delete post
async function deleteFormHandler(event) {
    event.preventDefault();
    if (event.target.hasAttribute("delete-post-data-id")) {
    const id = event.target.getAttribute("delete-post-data-id");

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
        confirm("Delete post?");
      } else {
        alert(response.statusText);
      }
    }
    };
  
  document.querySelector('#postID').addEventListener('click', deleteFormHandler);