const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('.form');

wrapper.addEventListener('click', () => {
  console.log(33);
});

const serializeForm = (formNode) => {
  const { elements } = formNode;
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;
      return { name, value };
    });
  console.log(data);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  serializeForm(form);
};

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('click', handleFormSubmit);
