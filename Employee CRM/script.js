/* // Version 1.0

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
    const annualSalary = employee.salary * 12;

    row.innerHTML = `
      
      <td>${employee.name}</td>
      <td>${employee.designation}</td>
      <td>${employee.salary}</td>
      <td>${annualSalary}</td>
      <td></td>
      <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fas fa-trash"></i></a></td>
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
    setTimeout(() => {
  document.querySelectorAll('.alert').forEach(alert => alert.remove());
}, 2000);

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
/*
document.querySelector('#emp-list').addEventListener('click', (e) => {
  // Remove Employee from UI
  UI.deleteEmployee(e.target);

  // Remove Employee from store
  Crm.removeEmployee(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Employee Removed', 'success');
});
*/

/* New code for Remove Employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    // Remove from UI
    UI.deleteEmployee(e.target);

    // Remove from storage
    Crm.removeEmployee(
      e.target.parentElement.previousElementSibling.textContent
    );

    // Show success message
    UI.showAlert('Employee Removed', 'success');
  }
});
*/

/* // Version 2.0

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

        // Calculate annual salary
        const annualSalary = parseFloat(employee.salary) * 12;

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
            <td>${employee.salary}</td>
            <td>${annualSalary}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteEmployee(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#designation').value = '';
        document.querySelector('#salary').value = '';
    }
}

// Store Class
class Crm {
    static getEmployees() {
        let emps;
        if (localStorage.getItem('emps') === null) {
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
            if (employee.salary === salary) {
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
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const designation = document.querySelector('#designation').value;
    const salary = document.querySelector('#salary').value;

    if (name === '' || designation === '' || salary === '') {
        alert('Please fill in all fields');
    } else {
        const employee = new Employee(name, designation, salary);
        UI.addEmployeeToList(employee);
        Crm.addEmployee(employee);
        UI.clearFields();
    }
});

// Event: Remove an Employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
    UI.deleteEmployee(e.target);
    Crm.removeEmployee(
        e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    );
});

*/

/* Code Version 3.0

// Employee Class
class Employee {
    constructor(name, designation, salary, employeeId) {
        this.name = name;
        this.designation = designation;
        this.salary = salary;
        this.annualSalary = salary * 12;
        this.employeeId = employeeId;
    }
}

// UI Class
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
            <td>${employee.annualSalary}</td>
            <td>${employee.employeeId}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteEmployee(el) {
        if (el.classList.contains('delete')) {
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

        // Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#designation').value = '';
        document.querySelector('#salary').value = '';
    }
}

// Store Class
class Crm {
    static getEmployees() {
        let employees;
        if (localStorage.getItem('emps') === null) {
            employees = [];
        } else {
            employees = JSON.parse(localStorage.getItem('emps'));
        }
        return employees;
    }

    static addEmployee(employee) {
        const employees = Crm.getEmployees();
        employees.push(employee);
        localStorage.setItem('emps', JSON.stringify(employees));
    }

    static removeEmployee(employeeId) {
        const employees = Crm.getEmployees();

        const filtered = employees.filter(emp => emp.employeeId !== employeeId);
        localStorage.setItem('emps', JSON.stringify(filtered));
    }

    static getNextId() {
        let lastId = localStorage.getItem('lastEmpId');
        if (!lastId) {
            lastId = 100;
        }
        lastId = parseInt(lastId) + 1;
        localStorage.setItem('lastEmpId', lastId);
        return lastId;
    }
}

// Event: Display Employees
document.addEventListener('DOMContentLoaded', UI.displayEmployees);

// Event: Add an Employee
document.querySelector('#emp-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const designation = document.querySelector('#designation').value.trim();
    const salary = parseFloat(document.querySelector('#salary').value.trim());

    if (name === '' || designation === '' || isNaN(salary)) {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        const nextId = Crm.getNextId();
        const employeeId = `CN/${name}/${nextId}`;
        const employee = new Employee(name, designation, salary, employeeId);

        Crm.addEmployee(employee);
        UI.addEmployeeToList(employee);
        UI.showAlert('Employee Added', 'success');
        UI.clearFields();
    }
});

// Event: Remove an Employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const row = e.target.parentElement.parentElement;
        const employeeId = row.children[4].textContent;

        Crm.removeEmployee(employeeId);
        UI.deleteEmployee(e.target);
        UI.showAlert('Employee Removed', 'success');
    }
});

// localStorage.clear();

*/
/* Version 4.0
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

        // Calculate annual salary
        const annualSalary = parseFloat(employee.salary) * 12;

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
            <td>${employee.salary}</td>
            <td>${annualSalary}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteEmployee(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#designation').value = '';
        document.querySelector('#salary').value = '';
    }
}

// Store Class
class Crm {
    static getEmployees() {
        let emps;
        if (localStorage.getItem('emps') === null) {
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
            if (employee.salary === salary) {
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
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const designation = document.querySelector('#designation').value;
    const salary = document.querySelector('#salary').value;

    if (name === '' || designation === '' || salary === '') {
        alert('Please fill in all fields');
    } else {
        const employee = new Employee(name, designation, salary);
        UI.addEmployeeToList(employee);
        Crm.addEmployee(employee);
        UI.clearFields();
    }
});

// Event: Remove an Employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
    UI.deleteEmployee(e.target);
    Crm.removeEmployee(
        e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    );
});

*/
/* Version 5.0
// Employee Class
class Employee {
    constructor(name, designation, salary, employeeId) {
        this.name = name;
        this.designation = designation;
        this.salary = salary;
        this.annualSalary = salary * 12;
        this.employeeId = employeeId;
    }
}

// UI Class
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
            <td>${employee.annualSalary}</td>
            <td>${employee.employeeId}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteEmployee(el) {
        if (el.classList.contains('delete')) {
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

        // Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#designation').value = '';
        document.querySelector('#salary').value = '';
    }
}

// Store Class
class Crm {
    static getEmployees() {
        let employees;
        if (localStorage.getItem('emps') === null) {
            employees = [];
        } else {
            employees = JSON.parse(localStorage.getItem('emps'));
        }
        return employees;
    }

    static addEmployee(employee) {
        const employees = Crm.getEmployees();
        employees.push(employee);
        localStorage.setItem('emps', JSON.stringify(employees));
    }

    static removeEmployee(employeeId) {
        const employees = Crm.getEmployees();

        const filtered = employees.filter(emp => emp.employeeId !== employeeId);
        localStorage.setItem('emps', JSON.stringify(filtered));
    }

    static getNextId() {
        let lastId = localStorage.getItem('lastEmpId');
        if (!lastId) {
            lastId = 100;
        }
        lastId = parseInt(lastId) + 1;
        localStorage.setItem('lastEmpId', lastId);
        return lastId;
    }
}

// Event: Display Employees
document.addEventListener('DOMContentLoaded', UI.displayEmployees);

// Event: Add an Employee
document.querySelector('#emp-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const designation = document.querySelector('#designation').value.trim();
    const salary = parseFloat(document.querySelector('#salary').value.trim());

    if (name === '' || designation === '' || isNaN(salary)) {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        const nextId = Crm.getNextId();
        const employeeId = `CN/${name}/${nextId}`;
        const employee = new Employee(name, designation, salary, employeeId);

        Crm.addEmployee(employee);
        UI.addEmployeeToList(employee);
        UI.showAlert('Employee Added', 'success');
        UI.clearFields();
    }
});

// Event: Remove an Employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const row = e.target.parentElement.parentElement;
        const employeeId = row.children[4].textContent;

        Crm.removeEmployee(employeeId);
        UI.deleteEmployee(e.target);
        UI.showAlert('Employee Removed', 'success');
    }
});

// localStorage.clear();

*/

/* Version 6.0
// Employee Class
class Employee {
    constructor(name, designation, salary, employeeId) {
        this.name = name;
        this.designation = designation;
        this.salary = salary;
        this.annualSalary = salary * 12;
        this.employeeId = employeeId;
    }
}

// Storage Class
class Crm {
    static getEmployees() {
        let emps;
        if (localStorage.getItem('emps') === null) {
            emps = [];
        } else {
            emps = JSON.parse(localStorage.getItem('emps'));
        }
        return emps;
    }

    static addEmployee(employee) {
        const emps = Crm.getEmployees();

        // Check for duplicate Name (case-insensitive)
        const isDuplicate = emps.some(emp => emp.name.toLowerCase() === employee.name.toLowerCase());
        if (isDuplicate) {
            UI.showAlert(`Employee "${employee.name}" already exists!`, 'danger');
            return false; // stop adding
        }

        emps.push(employee);
        localStorage.setItem('emps', JSON.stringify(emps));
        return true;
    }

    static removeEmployee(employeeId) {
        let emps = Crm.getEmployees();
        emps = emps.filter(emp => emp.employeeId !== employeeId);
        localStorage.setItem('emps', JSON.stringify(emps));
    }

    static getNextEmployeeId() {
        let lastId = localStorage.getItem('lastEmployeeId');
        if (!lastId) {
            lastId = 100;
        }
        lastId = parseInt(lastId) + 1;
        localStorage.setItem('lastEmployeeId', lastId);
        return lastId;
    }
}

// UI Class
class UI {
    static displayEmployees() {
        const employees = Crm.getEmployees();
        employees.forEach((employee) => UI.addEmployeeToList(employee));
    }

    static addEmployeeToList(employee) {
        const list = document.querySelector('#emp-list');
        const row = document.createElement('tr');

        // Add cells dynamically (including Annual Salary & Employee ID)
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.designation}</td>
            <td>${employee.salary}</td>
            <td>${employee.annualSalary}</td>
            <td>CN/${employee.name}/${employee.employeeId}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteEmployee(el) {
        if (el.classList.contains('delete')) {
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
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#designation').value = '';
        document.querySelector('#salary').value = '';
    }
}

// Event: Display Employees
document.addEventListener('DOMContentLoaded', UI.displayEmployees);

// Event: Add an Employee
document.querySelector('#emp-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const designation = document.querySelector('#designation').value.trim();
    const salary = parseFloat(document.querySelector('#salary').value);

    if (name === '' || designation === '' || isNaN(salary)) {
        UI.showAlert('Please fill all fields', 'danger');
        return;
    }

    const employeeId = Crm.getNextEmployeeId();
    const employee = new Employee(name, designation, salary, employeeId);

    // Only add if not duplicate
    const added = Crm.addEmployee(employee);
    if (added) {
        UI.addEmployeeToList(employee);
        UI.showAlert('Employee Added', 'success');
        UI.clearFields();
    }
});

// Event: Remove an Employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const idCell = e.target.parentElement.previousElementSibling.textContent;
        const employeeId = parseInt(idCell.split('/').pop());
        Crm.removeEmployee(employeeId);
        UI.deleteEmployee(e.target);
        UI.showAlert('Employee Removed', 'success');
    }
});
*/
