// Inicializar AOS para animaciones al hacer scroll
AOS.init({
  duration: 1200,
  once: true,
  easing: 'ease-in-out',
});

// Animación de barras de habilidades al hacer scroll
function animateSkillBars() {
  document.querySelectorAll('.skill-level').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1.2s cubic-bezier(.77,0,.18,1)';
      bar.style.width = width;
    }, 300);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  // Re-animar barras cuando se vuelve a la sección
  document.addEventListener('aos:in:skills-section', animateSkillBars);

  // Animación de entrada para la frase impactante
  const impactPhrase = document.querySelector('.impact-phrase');
  if (impactPhrase) {
    impactPhrase.style.opacity = 0;
    impactPhrase.style.transform = 'translateY(40px)';
    setTimeout(() => {
      impactPhrase.style.transition = 'all 1.2s cubic-bezier(.77,0,.18,1)';
      impactPhrase.style.opacity = 1;
      impactPhrase.style.transform = 'translateY(0)';
    }, 600);
  }

  // Efecto hover en project-card (opcional extra con JS)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
    });
  });
});

// --- AVATAR ASISTENTE VIRTUAL ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotBubble = document.getElementById('chatbot-bubble');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const avatarAssistant = document.getElementById('avatar-assistant');
const princessAvatar = document.getElementById('princess-avatar');

// Mostrar/ocultar chat
chatbotToggle.addEventListener('click', () => {
  chatbotBubble.classList.toggle('active');
  if (chatbotBubble.classList.contains('active')) {
    chatbotInput.focus();
  }
});

// Cerrar chat al hacer click fuera
window.addEventListener('click', (e) => {
  if (!avatarAssistant.contains(e.target) && chatbotBubble.classList.contains('active')) {
    chatbotBubble.classList.remove('active');
  }
});

// Respuestas frecuentes
const FAQ = [
  {
    q: /qu[ií]en eres|eres\?|asistente|princesa|qu[ií]en sos/i,
    a: 'Soy tu asistente princesa virtual 👑✨, lista para ayudarte en tu portafolio.'
  },
  {
    q: /proyectos|ver tus proyectos|d[oó]nde est[aá]n tus proyectos/i,
    a: 'Puedes ver mis proyectos en la sección "Proyectos" de esta web. ¡Haz scroll o usa el menú!'
  },
  {
    q: /contacto|contactar|hablar|escribirte|enviarte/i,
    a: 'Puedes contactarme desde la sección "Contacto" o por mis redes sociales al final de la página 💌.'
  },
  {
    q: /hola|buenas|hi|hello/i,
    a: '¡Hola! ¿En qué puedo ayudarte hoy? 💖'
  },
  {
    q: /experiencia|trabajo|curr[ií]culum|cv/i,
    a: 'Mi experiencia está en la sección "Experiencia". ¡Descúbrela justo debajo de Sobre mí!'
  },
  {
    q: /gracias|thank/i,
    a: '¡De nada! Si tienes más preguntas, aquí estaré ✨'
  }
];

function getBotReply(msg) {
  for (const f of FAQ) {
    if (f.q.test(msg)) return f.a;
  }
  return '¡Qué pregunta tan interesante! Si quieres saber más, revisa las secciones del portafolio o pregúntame otra cosa 💬';
}

chatbotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userMsg = chatbotInput.value.trim();
  if (!userMsg) return;
  // Mostrar mensaje usuario
  const userDiv = document.createElement('div');
  userDiv.className = 'chatbot-msg user';
  userDiv.textContent = userMsg;
  chatbotMessages.appendChild(userDiv);
  chatbotInput.value = '';
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  // Respuesta bot
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chatbot-msg';
    botDiv.textContent = getBotReply(userMsg);
    chatbotMessages.appendChild(botDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 600);
});

// Animación de saludo al abrir chat
chatbotToggle.addEventListener('click', () => {
  const hand = princessAvatar.querySelector('.hand');
  if (hand) {
    hand.style.animation = 'hand-wave 0.8s 2';
    setTimeout(() => { hand.style.animation = ''; }, 1800);
  }
}); 