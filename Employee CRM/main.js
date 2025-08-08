/* Version 7.0 */
// Employee Class
class Employee {
  constructor(name, designation, salary, id) {
    this.name = name;
    this.designation = designation;
    this.salary = salary;
    this.annualSalary = salary * 12;
    this.id = id; // just number, format applied on display
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
      <td>CN/${employee.name}/${employee.id}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete"><i class="fas fa-trash"></i></a></td>
    `;
    list.appendChild(row);
  }

  static deleteEmployee(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    // Remove any existing alert first to prevent stacking
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#emp-form');
    container.insertBefore(div, form);

    setTimeout(() => {
      const alert = document.querySelector('.alert');
      if (alert) alert.remove();
    }, 2000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#designation').value = '';
    document.querySelector('#salary').value = '';
  }
}

// Data Storage Class
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

    // Prevent duplicate by name (case-insensitive)
    const duplicate = emps.some(
      (emp) => emp.name.toLowerCase() === employee.name.toLowerCase()
    );
    if (duplicate) {
      UI.showAlert(`Employee "${employee.name}" already exists!`, 'danger');
      return false;
    }

    emps.push(employee);
    localStorage.setItem('emps', JSON.stringify(emps));
    return true;
  }

  static removeEmployee(id) {
    let emps = Crm.getEmployees();
    emps = emps.filter((emp) => emp.id !== id);
    localStorage.setItem('emps', JSON.stringify(emps));
  }

  static getNextId() {
    const emps = Crm.getEmployees();
    if (emps.length === 0) {
      return 101; // starting ID
    }
    const maxId = Math.max(...emps.map((emp) => emp.id));
    return maxId + 1;
  }
}

// Event: Display employees on DOM load
document.addEventListener('DOMContentLoaded', UI.displayEmployees);

// Event: Add new employee
document.querySelector('#emp-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const designation = document.querySelector('#designation').value.trim();
  const salaryInput = document.querySelector('#salary').value.trim();
  const salary = parseFloat(salaryInput);

  if (name === '' || designation === '' || salaryInput === '' || isNaN(salary)) {
    UI.showAlert('Please fill in all fields with valid data', 'danger');
    return;
  }

  const id = Crm.getNextId();
  const employee = new Employee(name, designation, salary, id);

  const added = Crm.addEmployee(employee);
  if (added) {
    UI.addEmployeeToList(employee);
    UI.showAlert('Employee Added', 'success');
    UI.clearFields();
  }
});

// Event: Remove employee
document.querySelector('#emp-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    // Employee ID is last part of CN/Name/ID string in 5th td
    const idText = e.target.parentElement.previousElementSibling.textContent;
    const idStr = idText.split('/').pop();
    const id = parseInt(idStr);

    Crm.removeEmployee(id);
    UI.deleteEmployee(e.target);
    UI.showAlert('Employee Removed', 'success');
  }
});

// localStorage.clear();