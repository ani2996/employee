// Employee Class

class Employee {
    constructor(name, designation, salary) {
        this.name = name;
        this.designation = designation;
        this.salary = salary;
    }
}

// UI Tasks Class

class UI {
  static displayEmployees() {
    const employees = Crm.getEmployees();

    employees.forEach((employee) => UI.addEmployeeToList(employee));
  }

  static addEmployeeToList(employee) {
    const list = document.querySelector('#emp-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      
      <td>${employee.name}</td>
      <td>${employee.designation}</td>
      <td>${employee.salary}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteEmployee(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#emp-form');
    container.insertBefore(div, form);

    // Removed after 2 Seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

    static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#designation').value = '';
    document.querySelector('#salary').value = '';
  }


}


// Data Storage

class Crm{
    static getEmployees() {
        let emps;
        if(localStorage.getItem('emps') === null) {
            emps = [];
        } else {
            emps = JSON.parse(localStorage.getItem('emps'));
        }

        return emps;

    }
    static addEmployee(employee) {
        const emps = Crm.getEmployees();
        emps.push(employee);
        localStorage.setItem('emps', JSON.stringify(emps));
    }
    static removeEmployee(salary) {
        const emps = Crm.getEmployees();

        emps.forEach((employee, index) => {
            if(employee.salary === salary) {
                emps.splice(index, 1);
            }
        });

        localStorage.setItem('emps', JSON.stringify(emps));
    }
}

// Event: Display Employees

document.addEventListener('DOMContentLoaded', UI.displayEmployees);



// Event: Add an Employee

document.querySelector('#emp-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const designation = document.querySelector('#designation').value;
  const salary = document.querySelector('#salary').value;

  // Validate
  if(name === '' || designation === '' || salary === '') {
    UI.showAlert('Please fill in the Details', 'danger');
  } else {
    // Instatiate Employee
    const employee = new Employee(name, designation, salary);

    // Add Employee to UI
    UI.addEmployeeToList(employee);

    // Add Employee to CRM
    Crm.addEmployee(employee);

    // Show success message
    UI.showAlert('Employee Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});


// Event: Remove an Employee

document.querySelector('#emp-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteEmployee(e.target);

  // Remove book from store
  Crm.removeEmployee(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Employee Removed', 'success');
});