function toggleForms() {
  document.getElementById('login-form').style.display = document.getElementById('login-form').style.display === 'none' ? 'block' : 'none';
  document.getElementById('register-form').style.display = document.getElementById('register-form').style.display === 'none' ? 'block' : 'none';
}

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    showApp();
  } else {
    alert("Email ou senha incorretos.");
  }
});

document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (users.some(u => u.email === email)) {
    alert("Usuário já cadastrado com este email.");
  } else {
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registro realizado com sucesso. Faça login para continuar.");
    toggleForms();
  }
});

function showApp() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
}

function logout() {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('messages');
  location.reload();  
}


if (localStorage.getItem('loggedInUser')) {
  showApp();
}
