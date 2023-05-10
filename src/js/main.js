const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('.form');

wrapper.addEventListener('click', () => {
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
