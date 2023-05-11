const form = document.querySelector('.form');
const header = document.querySelector('.header');

header.addEventListener('click', () => {
  console.log(33);
});

function serializeForm(formNode) {
  return new FormData(formNode);
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const formData = serializeForm(form);
  console.log(Object.fromEntries(formData));
};

form.addEventListener('submit', handleFormSubmit);
