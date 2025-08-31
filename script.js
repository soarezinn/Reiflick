// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initUrgencyBanner()
  initCountdown()
  initTestimonialsCarousel()
  initChatWidget()
  initScrollAnimations()
  initSmoothScrolling()
})

// Urgency Banner Functionality
function initUrgencyBanner() {
  const banner = document.getElementById("urgency-banner")
  const closeBtn = document.getElementById("close-banner")
  const header = document.querySelector(".header")
  const hero = document.querySelector(".hero")

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      banner.style.display = "none"
      // Adjust header and hero positioning
      header.style.top = "0"
      hero.style.paddingTop = "80px"
    })
  }
}

// Countdown Timer Functionality
function initCountdown() {
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")

  if (!hoursElement || !minutesElement || !secondsElement) return

  // Set countdown to 24 hours from now
  const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = countdownDate - now

    if (distance < 0) {
      // Reset countdown to 24 hours
      const newCountdownDate = new Date().getTime() + 24 * 60 * 60 * 1000
      updateCountdownDisplay(newCountdownDate - now)
      return
    }

    updateCountdownDisplay(distance)
  }

  function updateCountdownDisplay(distance) {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    hoursElement.textContent = hours.toString().padStart(2, "0")
    minutesElement.textContent = minutes.toString().padStart(2, "0")
    secondsElement.textContent = seconds.toString().padStart(2, "0")
  }

  // Update countdown immediately and then every second
  updateCountdown()
  setInterval(updateCountdown, 1000)
}

// Testimonials Carousel Functionality
function initTestimonialsCarousel() {
  const track = document.getElementById("testimonial-track")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const dots = document.querySelectorAll(".dot")

  if (!track || !prevBtn || !nextBtn) return

  let currentSlide = 0
  const totalSlides = document.querySelectorAll(".testimonial-card").length
  let autoSlideInterval

  function goToSlide(slideIndex) {
    currentSlide = slideIndex
    const translateX = -slideIndex * 100
    track.style.transform = `translateX(${translateX}%)`

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex)
    })
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides
    goToSlide(nextIndex)
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
    goToSlide(prevIndex)
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval)
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide()
    stopAutoSlide()
    startAutoSlide() // Restart auto-slide
  })

  prevBtn.addEventListener("click", () => {
    prevSlide()
    stopAutoSlide()
    startAutoSlide() // Restart auto-slide
  })

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
      stopAutoSlide()
      startAutoSlide() // Restart auto-slide
    })
  })

  // Pause auto-slide on hover
  const carousel = document.querySelector(".testimonials-carousel")
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoSlide)
    carousel.addEventListener("mouseleave", startAutoSlide)
  }

  // Start auto-slide
  startAutoSlide()
}

// Chat Widget Functionality
function initChatWidget() {
  const chatButton = document.getElementById("chat-button")
  const chatWindow = document.getElementById("chat-window")
  const closeChat = document.getElementById("close-chat")
  const sendMessage = document.getElementById("send-message")
  const chatInput = document.getElementById("chat-input")
  const chatMessages = document.querySelector(".chat-messages")

  if (!chatButton || !chatWindow) return

  // Toggle chat window
  chatButton.addEventListener("click", () => {
    chatWindow.classList.toggle("active")
  })

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatWindow.classList.remove("active")
    })
  }

  // Send message functionality
  function sendUserMessage() {
    const message = chatInput.value.trim()
    if (!message) return

    // Add user message
    const userMessage = document.createElement("div")
    userMessage.className = "message user"
    userMessage.innerHTML = `<p>${message}</p>`
    chatMessages.appendChild(userMessage)

    // Clear input
    chatInput.value = ""

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message)
      const botMessage = document.createElement("div")
      botMessage.className = "message bot"
      botMessage.innerHTML = `<p>${botResponse}</p>`
      chatMessages.appendChild(botMessage)

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight
    }, 1000)

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  if (sendMessage) {
    sendMessage.addEventListener("click", sendUserMessage)
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendUserMessage()
      }
    })
  }

  // Simple bot responses
  function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase()

    if (message.includes("preço") || message.includes("precos") || message.includes("plano")) {
      return "Nossos planos começam em $47/mês. O plano Professional por $147/mês é o mais popular e inclui conversas ilimitadas e agendamento automático. Gostaria de saber mais detalhes?"
    }

    if (message.includes("agendar") || message.includes("reunião") || message.includes("reuniao")) {
      return "Posso agendar uma demonstração gratuita para você! Que tal amanhã às 14h? Ou prefere outro horário?"
    }

    if (message.includes("funciona") || message.includes("como")) {
      return "O ChatWing usa IA avançada para responder seus clientes 24/7, qualificar leads automaticamente e agendar reuniões. É como ter um funcionário que nunca dorme!"
    }

    if (message.includes("grátis") || message.includes("gratis") || message.includes("teste")) {
      return "Sim! Oferecemos 30 dias de teste gratuito, sem compromisso. Você pode cancelar a qualquer momento. Quer começar agora?"
    }

    // Default response
    return "Obrigado pela sua mensagem! Um especialista entrará em contato em breve. Enquanto isso, que tal começar seu teste gratuito de 30 dias?"
  }
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".pain-point, .benefit-card, .pricing-card, .testimonial-card")
  animateElements.forEach((el) => {
    observer.observe(el)
  })
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const bannerHeight = document.getElementById("urgency-banner").offsetHeight
        const offsetTop = targetElement.offsetTop - headerHeight - bannerHeight

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Performance optimization: Lazy load images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", initLazyLoading)

// Console log for debugging
console.log("[v0] ChatWing landing page loaded successfully")
