// Course Data
const coursesData = {
  sixMonth: [
    {
      id: "sm1",
      name: "First Aid",
      description: "Learn essential first aid skills including CPR, wound care, and emergency response procedures.",
      fee: 1500,
      duration: "6 months",
      type: "six-month",
    },
    {
      id: "sm2",
      name: "Sewing",
      description: "Master garment construction, pattern making, and professional sewing techniques.",
      fee: 1500,
      duration: "6 months",
      type: "six-month",
    },
    {
      id: "sm3",
      name: "Landscaping",
      description: "Comprehensive training in garden design, plant care, and landscape maintenance.",
      fee: 1500,
      duration: "6 months",
      type: "six-month",
    },
    {
      id: "sm4",
      name: "Life Skills",
      description: "Develop essential life skills including financial literacy, communication, and time management.",
      fee: 1500,
      duration: "6 months",
      type: "six-month",
    },
  ],
  sixWeek: [
    {
      id: "sw1",
      name: "Child Minding",
      description: "Professional childcare training covering child development, safety, and activities.",
      fee: 750,
      duration: "6 weeks",
      type: "six-week",
    },
    {
      id: "sw2",
      name: "Cooking",
      description: "Culinary skills training including meal preparation, nutrition, and kitchen safety.",
      fee: 750,
      duration: "6 weeks",
      type: "six-week",
    },
    {
      id: "sw3",
      name: "Garden Maintenance",
      description: "Learn practical garden maintenance, pruning, and seasonal plant care.",
      fee: 750,
      duration: "6 weeks",
      type: "six-week",
    },
  ],
}

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  loadCourses()
  loadCalculatorCourses()
  initCalculator()
})

// Navigation
function initNavigation() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Smooth scrolling and active state
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"))
      // Add active class to clicked link
      this.classList.add("active")

      // Scroll to section
      targetSection.scrollIntoView({ behavior: "smooth" })

      // Close mobile menu
      navMenu.classList.remove("active")
    })
  })

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll(".section")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Load courses into the courses section
function loadCourses() {
  const sixMonthContainer = document.getElementById("sixMonthCourses")
  const sixWeekContainer = document.getElementById("sixWeekCourses")

  // Load six-month courses
  coursesData.sixMonth.forEach((course) => {
    const courseCard = createCourseCard(course)
    sixMonthContainer.appendChild(courseCard)
  })

  // Load six-week courses
  coursesData.sixWeek.forEach((course) => {
    const courseCard = createCourseCard(course)
    sixWeekContainer.appendChild(courseCard)
  })
}

// Create course card element
function createCourseCard(course) {
  const card = document.createElement("div")
  card.className = "course-card"
  card.innerHTML = `
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <div class="course-footer">
            <span class="course-info">${course.duration}</span>
            <span class="course-fee">R${course.fee.toFixed(2)}</span>
        </div>
    `
  return card
}

// Load courses into calculator
function loadCalculatorCourses() {
  const courseSelection = document.getElementById("courseSelection")
  const allCourses = [...coursesData.sixMonth, ...coursesData.sixWeek]

  allCourses.forEach((course) => {
    const checkbox = createCourseCheckbox(course)
    courseSelection.appendChild(checkbox)
  })
}

// Create course checkbox element
function createCourseCheckbox(course) {
  const label = document.createElement("label")
  label.className = "course-checkbox"
  label.innerHTML = `
        <input type="checkbox" name="course" value="${course.id}" data-fee="${course.fee}" data-name="${course.name}" data-type="${course.type}">
        <div class="course-checkbox-info">
            <div class="course-checkbox-name">${course.name}</div>
            <div class="course-checkbox-type">${course.duration}</div>
        </div>
        <div class="course-checkbox-fee">R${course.fee.toFixed(2)}</div>
    `

  // Add click handler for visual feedback
  const checkbox = label.querySelector('input[type="checkbox"]')
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      label.classList.add("selected")
    } else {
      label.classList.remove("selected")
    }
    // Hide results when selection changes
    document.getElementById("resultsSection").style.display = "none"
  })

  return label
}

// Calculator functionality
function initCalculator() {
  const form = document.getElementById("calculatorForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      calculateTotal()
    }
  })

  // Clear errors on input
  const inputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]')
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("error")
      const errorId = this.id + "Error"
      document.getElementById(errorId).textContent = ""
    })
  })

  // Clear course error when selecting
  const courseCheckboxes = form.querySelectorAll('input[name="course"]')
  courseCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      document.getElementById("coursesError").textContent = ""
    })
  })
}

// Form validation
function validateForm() {
  let isValid = true
  const errors = {}

  // Validate name
  const name = document.getElementById("name").value.trim()
  if (!name) {
    errors.name = "Name is required"
    isValid = false
  }

  // Validate phone
  const phone = document.getElementById("phone").value.trim()
  if (!phone) {
    errors.phone = "Phone number is required"
    isValid = false
  } else if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
    errors.phone = "Please enter a valid 10-digit phone number"
    isValid = false
  }

  // Validate email
  const email = document.getElementById("email").value.trim()
  if (!email) {
    errors.email = "Email is required"
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address"
    isValid = false
  }

  // Validate courses
  const selectedCourses = document.querySelectorAll('input[name="course"]:checked')
  if (selectedCourses.length === 0) {
    errors.courses = "Please select at least one course"
    isValid = false
  }

  // Display errors
  Object.keys(errors).forEach((field) => {
    const errorElement = document.getElementById(field + "Error")
    errorElement.textContent = errors[field]
    if (field !== "courses") {
      document.getElementById(field).classList.add("error")
    }
  })

  return isValid
}

// Calculate discount based on number of courses
function getDiscount(count) {
  if (count >= 4) return 0.15
  if (count === 3) return 0.1
  if (count === 2) return 0.05
  return 0
}

// Calculate total and display results
function calculateTotal() {
  const selectedCourses = document.querySelectorAll('input[name="course"]:checked')
  const courses = Array.from(selectedCourses).map((checkbox) => ({
    name: checkbox.dataset.name,
    fee: Number.parseFloat(checkbox.dataset.fee),
  }))

  // Calculate totals
  const subtotal = courses.reduce((sum, course) => sum + course.fee, 0)
  const discountRate = getDiscount(courses.length)
  const discountAmount = subtotal * discountRate
  const afterDiscount = subtotal - discountAmount
  const vat = afterDiscount * 0.15
  const total = afterDiscount + vat

  // Display selected courses
  const selectedCoursesList = document.getElementById("selectedCoursesList")
  selectedCoursesList.innerHTML = courses
    .map(
      (course) => `
        <div class="selected-course-item">
            <span class="selected-course-name">${course.name}</span>
            <span class="selected-course-fee">R${course.fee.toFixed(2)}</span>
        </div>
    `,
    )
    .join("")

  // Display breakdown
  document.getElementById("subtotal").textContent = `R${subtotal.toFixed(2)}`
  document.getElementById("afterDiscount").textContent = `R${afterDiscount.toFixed(2)}`
  document.getElementById("vat").textContent = `R${vat.toFixed(2)}`
  document.getElementById("total").textContent = `R${total.toFixed(2)}`

  // Display discount if applicable
  const discountRow = document.getElementById("discountRow")
  if (discountRate > 0) {
    discountRow.style.display = "flex"
    document.getElementById("discountLabel").textContent = `Discount (${(discountRate * 100).toFixed(0)}%):`
    document.getElementById("discountAmount").textContent = `-R${discountAmount.toFixed(2)}`
  } else {
    discountRow.style.display = "none"
  }

  // Show results section
  document.getElementById("resultsSection").style.display = "block"

  // Scroll to results
  document.getElementById("resultsSection").scrollIntoView({ behavior: "smooth", block: "nearest" })
}
