  const form = document.querySelector('form');
  const nome = document.querySelector('#nome');
  const email = document.querySelector('#email');
  const assunto = document.querySelector('#assunto');
  const mensagem = document.querySelector('#mensagem');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
      nome: nome.value,
      email: email.value,
      assunto: assunto.value,
      mensagem: mensagem.value
    };

    fetch('/enviar-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
      } else {
        alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
      }
    })
    .catch(error => {
      alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
    });
  });