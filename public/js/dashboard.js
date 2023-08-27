// Functionality for creating a new blog post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const contents = document.querySelector('#post-content').value.trim();

  if (title && contents) {
    const response = await fetch(`/api/blogPost`, {
      method: 'POST',
      body: JSON.stringify({ title, contents }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const errorData = await response.json();
      console.log('Error:', errorData);
      alert('Failed to create post');
    }
  }
};

// Functionality for deleting a blog post
const delButtonHandler = async (event) => {
  console.log(`this is outside the if statement`);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(`the id is ${id}`);
    const response = await fetch(`/api/blogPost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Functionality for updating a blog post
const updateButtonHandler = async (event) => {
  event.preventDefault();
  console.log('test');

  const title = document.querySelector('#post-title').value.trim();
  const contents = document.querySelector('#post-content').value.trim();
  const id = document.querySelector('#post-id').value.trim();

  const response = await fetch(`/api/blogPost/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, contents, id }),
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update post');
  }
};

if (document.querySelector('#new-blog')) {
  document
    .querySelector('#new-blog')
    .addEventListener('submit', newFormHandler);
}

if (document.querySelector('.del-btn')) {
  document.querySelectorAll('.del-btn').forEach((btn) => {
    btn.addEventListener('click', delButtonHandler);
  });
}

if (document.querySelector('#update-blog')) {
  document
    .querySelector('#update-blog')
    .addEventListener('submit', updateButtonHandler);
}
