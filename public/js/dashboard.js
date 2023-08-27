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
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

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

// // Functionality for updating a blog post
// const updateButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/blogPost/${id}`, {
//       method: 'PUT',
//     });

//     if (response.ok) {
//       document.location.replace(`/blogPost/update/${id}`);
//     } else {
//       alert('Failed to update post');
//     }
//   }
// };

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document.querySelector('#del-btn').addEventListener('click', delButtonHandler);

// document
//   .querySelector('#update-btn')
//   .addEventListener('click', updateButtonHandler);
