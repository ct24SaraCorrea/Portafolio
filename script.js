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

  // Tilt interactivo en project-card y exp-item
  document.querySelectorAll('.project-card, .exp-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * 8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Avatar princesa: parpadeo y brillo extra
  setInterval(() => {
    const avatar = document.getElementById('princess-avatar');
    if (avatar) {
      avatar.style.filter = 'drop-shadow(0 0 32px #ffe082ff) drop-shadow(0 0 16px #f8bbd0ff)';
      setTimeout(() => {
        avatar.style.filter = '';
      }, 900);
    }
  }, 5000);
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
  },
  // NUEVAS PREGUNTAS Y RESPUESTAS
  {
    q: /hobbies|pasatiempos|aficiones|qué te gusta hacer/i,
    a: 'Me encanta diseñar, programar, coleccionar stickers y tomar café con leche ☕✨. ¿Y a ti?'
  },
  {
    q: /color favorito|color preferido|color que te gusta/i,
    a: '¡El rosa pastel y el lavanda son mis favoritos! ¿Cuál es el tuyo? 🎨💗'
  },
  {
    q: /consejo de estudio|cómo estudio|tips de estudio|estudiar mejor/i,
    a: 'Haz resúmenes bonitos, usa colores, toma descansos y ¡no olvides hidratarte! 💧📒✨'
  },
  {
    q: /motivaci[oó]n|ánimo|frase motivadora|ánimate/i,
    a: '¡Tú puedes con todo! Recuerda: cada día es una nueva oportunidad para brillar ✨🌈'
  },
  {
    q: /tecnolog[ií]a|programaci[oó]n|c[óo]digo|computadora/i,
    a: '¡La tecnología es mágica! Si tienes dudas de código o diseño, dime y te ayudo 💻💡'
  },
  {
    q: /kawaii|frase kawaii|cute|adorable/i,
    a: 'Eres tan kawaii como un moñito rosa en primavera 🌸🎀'
  },
  {
    q: /ayuda|cómo uso|cómo navegar|no encuentro|dónde está/i,
    a: 'Puedes usar el menú de arriba para ir a cada sección, o preguntarme por cualquier parte del portafolio. ¡Estoy aquí para guiarte! 🗺️💬'
  },
  {
    q: /chiste|cuéntame algo|dime algo divertido|broma/i,
    a: '¿Por qué el sticker no fue a la fiesta? ¡Porque no quería despegarse de su agenda! 😆'
  },
  {
    q: /animal favorito|mascota|gatito|perrito/i,
    a: '¡Me encantan los gatitos y perritos! Pero también los conejos kawaii 🐱🐶🐰'
  },
  {
    q: /qu[eé] hora es|hora actual|dime la hora/i,
    a: '¡El tiempo es ahora! Pero si quieres saber la hora, mira la esquina de tu pantalla ⏰😉'
  },
  {
    q: /qu[eé] opinas de sara|sara correa/i,
    a: 'Sara es súper creativa, talentosa y le pone mucho amor a todo lo que hace. ¡Es una inspiración! 🌟'
  },
  {
    q: /emoji|pon un emoji|dame un emoji/i,
    a: 'Aquí tienes: 💖✨🌸🎀☁️'
  },
  {
    q: /adiós|bye|me voy|hasta luego/i,
    a: '¡Hasta pronto! Recuerda que siempre puedes volver a preguntarme lo que quieras 💬👑'
  }
];

// Chistes para el chatbot
const CHISTES = [
  '¿Por qué el sticker no fue a la fiesta? ¡Porque no quería despegarse de su agenda! 😆',
  '¿Qué le dice una impresora a otra? ¿Esa hoja es tuya o es una impresión mía? 🖨️',
  '¿Por qué el código estaba triste? Porque tenía demasiados bugs 🐞',
  '¿Por qué el lápiz se deprimió? Porque estaba lleno de problemas... matemáticos ✏️',
  '¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝',
  '¿Por qué el café fue al psicólogo? Porque se sentía muy expreso ☕',
  '¿Cuál es el colmo de un programador? Tener problemas con su RAM... ¡y olvidarlo todo! 💻',
  '¿Por qué la computadora fue al médico? Porque tenía un virus 🤒',
  '¿Por qué la agenda era tan buena amiga? Porque siempre estaba disponible para ti 📒',
  '¿Por qué el arcoíris nunca está triste? Porque siempre sale después de la lluvia 🌈',
];

function getBotReply(msg) {
  // Si el usuario pide otro chiste
  if (/^otro( chiste)?$|uno m[aá]s|dame otro/i.test(msg.trim())) {
    return CHISTES[Math.floor(Math.random() * CHISTES.length)];
  }
  for (const f of FAQ) {
    if (f.q.test(msg)) {
      // Si es chiste, responde aleatorio
      if (/chiste|divertido|broma|cuéntame algo/i.test(msg)) {
        return CHISTES[Math.floor(Math.random() * CHISTES.length)];
      }
      return f.a;
    }
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