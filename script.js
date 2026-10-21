const data = document.getElementsByTagName('form');

function handleSubmit(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  const ul = document.querySelector('ul');

  const li = document.createElement('li');

  li.textContent = amount + ' - ' + description + ' - ' + category;

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  const expense = {
    id: Date.now(),
    amount: amount,
    description: description,
    category: category,
  };
  expenses.push(expense);

  localStorage.setItem('expenses', JSON.stringify(expenses));

  const delBtn = document.createElement('button');
  delBtn.style.marginLeft = '5px';
  delBtn.textContent = 'Delete Expense';

  delBtn.addEventListener('click', () => {
    li.remove();

    expenses = expenses.filter((item) => item.id !== expense.id);

    localStorage.setItem('expenses', JSON.stringify(expenses));
  });

  const editBtn = document.createElement('button');
  editBtn.style.marginLeft = '5px';
  editBtn.textContent = 'Edit Expense';

  editBtn.addEventListener('click', () => {
    event.target.amount.value = amount;
    event.target.description.value = description;
    event.target.category.value = category;
    li.remove();
  });

  li.appendChild(delBtn);
  li.appendChild(editBtn);
  ul.appendChild(li);

  event.target.reset();
}
