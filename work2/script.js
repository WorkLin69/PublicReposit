
  let fontSize = 16;

  function toggleTextSize() {
    fontSize = fontSize === 16 ? 20 : 16;
    document.body.style.fontSize = `${fontSize}px`;
  }

  
  const toggleBtn = document.getElementById('toggleSizeBtn');
  toggleBtn.addEventListener('click', toggleTextSize);

 
  const textBlock = document.getElementById('textBlock');

  textBlock.addEventListener('mouseover', () => {
    textBlock.style.backgroundColor = 'lightgreen';
    textBlock.style.transform = 'scale(1.1)';
    textBlock.style.transition = 'all 0.3s ease';
  });

  textBlock.addEventListener('mouseout', () => {
    textBlock.style.backgroundColor = 'lightblue';
    textBlock.style.transform = 'scale(1)';
  });

  // Валидация формы
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('inputField');
    if (input.value.trim() === '') {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
      alert('Данные отправлены!');
    }
  });
