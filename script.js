// ============================================
// COURSE DATA
// ============================================

const coursesData = [
    {
        id: 1,
        name: 'HTML',
        description: 'Learn the basics of HTML and create web pages',
        level: 'Beginner',
        category: 'Frontend',
        duration: '2-4 weeks',
        progress: 0
    },
    {
        id: 2,
        name: 'CSS',
        description: 'Master styling and layouts with CSS',
        level: 'Beginner',
        category: 'Frontend',
        duration: '4-8 weeks',
        progress: 0
    },
    {
        id: 3,
        name: 'JavaScript',
        description: 'Learn JavaScript programming for interactive web pages',
        level: 'Intermediate',
        category: 'Frontend',
        duration: '8+ weeks',
        progress: 0
    },
    {
        id: 4,
        name: 'Python',
        description: 'Introduction to Python programming language',
        level: 'Beginner',
        category: 'Programming',
        duration: '4-8 weeks',
        progress: 0
    },
    {
        id: 5,
        name: 'Flask',
        description: 'Build web applications with Python Flask framework',
        level: 'Intermediate',
        category: 'Backend',
        duration: '4-8 weeks',
        progress: 0
    },
    {
        id: 6,
        name: 'Git and GitHub',
        description: 'Version control and collaboration with Git',
        level: 'Beginner',
        category: 'Programming',
        duration: '2-4 weeks',
        progress: 0
    },
    {
        id: 7,
        name: 'React Basics',
        description: 'Build interactive UIs with React library',
        level: 'Advanced',
        category: 'Frontend',
        duration: '8+ weeks',
        progress: 0
    }
];

// Roadmap data
const roadmapData = {
    frontend: [
        { id: 1, name: 'HTML', description: 'Foundation of web development', status: 'incomplete' },
        { id: 2, name: 'CSS', description: 'Style and layout websites', status: 'incomplete' },
        { id: 3, name: 'JavaScript', description: 'Add interactivity to web pages', status: 'incomplete' },
        { id: 6, name: 'Git & GitHub', description: 'Version control and collaboration', status: 'incomplete' },
        { id: 8, name: 'Responsive Design', description: 'Mobile-friendly websites', status: 'incomplete' },
        { id: 7, name: 'React', description: 'Build component-based UIs', status: 'incomplete' }
    ],
    backend: [
        { id: 4, name: 'Python', description: 'Learn backend programming', status: 'incomplete' },
        { id: 5, name: 'Flask', description: 'Web framework for Python', status: 'incomplete' },
        { id: 9, name: 'Databases', description: 'SQL and data management', status: 'incomplete' },
        { id: 10, name: 'APIs', description: 'RESTful API development', status: 'incomplete' }
    ]
};

// ============================================
// PAGE NAVIGATION
// ============================================

/**
 * Show a specific page and hide others
 * @param {string} pageId - ID of the page to show
 */
function showPage(pageId) {
    // Get all pages
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        
        // Initialize page content based on which page is shown
        if (pageId === 'homePage') {
            initializeHomePage();
        } else if (pageId === 'myCoursesPage') {
            initializeCoursesPage();
        } else if (pageId === 'roadmapPage') {
            initializeRoadmapPage();
        }
    }
    
    // Close mobile menu if open
    closeAllMobileMenus();
}

// ============================================
// LOGIN PAGE FUNCTIONALITY
// ============================================

/**
 * Initialize login form validation
 */
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Real-time validation
    document.getElementById('studentName')?.addEventListener('blur', validateName);
    document.getElementById('year')?.addEventListener('change', validateYear);
    document.getElementById('department')?.addEventListener('change', validateDepartment);
}

/**
 * Handle login form submission
 */
function handleLogin() {
    const studentName = document.getElementById('studentName').value.trim();
    const year = document.getElementById('year').value.trim();
    const department = document.getElementById('department').value.trim();
    
    // Clear previous error messages
    clearAllErrors();
    
    let isValid = true;
    
    // Validate all fields
    if (studentName === '') {
        showError('nameError', 'Please enter your name');
        isValid = false;
    } else if (studentName.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        isValid = false;
    }
    
    if (year === '') {
        showError('yearError', 'Please select your year');
        isValid = false;
    }
    
    if (department === '') {
        showError('departmentError', 'Please select your department');
        isValid = false;
    }
    
    // If validation passes
    if (isValid) {
        // Save student data to localStorage
        const studentData = {
            name: studentName,
            year: year,
            department: department,
            loginTime: new Date().toLocaleString()
        };
        
        localStorage.setItem('studentData', JSON.stringify(studentData));
        
        // Initialize course progress in localStorage
        if (!localStorage.getItem('courseProgress')) {
            const progressData = {};
            coursesData.forEach(course => {
                progressData[course.id] = 0;
            });
            localStorage.setItem('courseProgress', JSON.stringify(progressData));
        }
        
        // Show success message and redirect
        alert(`Welcome ${studentName}! Redirecting to home page...`);
        showPage('homePage');
    }
}

/**
 * Validate student name
 */
function validateName() {
    const name = document.getElementById('studentName').value.trim();
    if (name === '') {
        showError('nameError', 'Name is required');
    } else if (name.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
    } else {
        document.getElementById('nameError').style.display = 'none';
    }
}

/**
 * Validate year selection
 */
function validateYear() {
    if (this.value === '') {
        showError('yearError', 'Please select your year');
    } else {
        document.getElementById('yearError').style.display = 'none';
    }
}

/**
 * Validate department selection
 */
function validateDepartment() {
    if (this.value === '') {
        showError('departmentError', 'Please select your department');
    } else {
        document.getElementById('departmentError').style.display = 'none';
    }
}

/**
 * Show error message for a field
 * @param {string} elementId - ID of the error element
 * @param {string} message - Error message to display
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Clear all error messages
 */
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// ============================================
// HOME PAGE FUNCTIONALITY
// ============================================

/**
 * Initialize home page content
 */
function initializeHomePage() {
    // Get student data from localStorage
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    
    if (studentData) {
        // Update welcome message with student name
        document.getElementById('welcomeName').textContent = studentData.name;
    }
    
    // Display popular courses
    displayPopularCourses();
}

/**
 * Display popular courses on home page
 */
function displayPopularCourses() {
    const grid = document.getElementById('popularCoursesGrid');
    
    if (!grid) return;
    
    // Get first 6 courses as popular
    const popularCourses = coursesData.slice(0, 6);
    
    grid.innerHTML = '';
    
    popularCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        grid.appendChild(courseCard);
    });
}

/**
 * Create a course card element
 * @param {object} course - Course data object
 * @returns {HTML Element} Course card element
 */
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    // Get progress from localStorage
    const progressData = JSON.parse(localStorage.getItem('courseProgress')) || {};
    const progress = progressData[course.id] || 0;
    
    card.innerHTML = `
        <div class="course-header">${course.name}</div>
        <div class="course-body">
            <p class="course-description">${course.description}</p>
            <div class="course-info">
                <div class="info-item">
                    <strong>Level</strong>
                    ${course.level}
                </div>
                <div class="info-item">
                    <strong>Duration</strong>
                    ${course.duration}
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <p class="progress-text">Progress: ${progress}%</p>
            <button class="btn-secondary" onclick="startCourse(${course.id})">
                ${progress > 0 ? 'Continue Course' : 'Start Course'}
            </button>
        </div>
    `;
    
    return card;
}

// ============================================
// MY COURSES PAGE FUNCTIONALITY
// ============================================

/**
 * Initialize courses page
 */
function initializeCoursesPage() {
    displayAllCourses();
    attachFilterEventListeners();
}

/**
 * Display all courses
 */
function displayAllCourses() {
    const grid = document.getElementById('coursesGrid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = createCourseCard(course);
        grid.appendChild(courseCard);
    });
}

/**
 * Attach event listeners to filter controls
 */
function attachFilterEventListeners() {
    const levelFilter = document.getElementById('levelFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const durationFilter = document.getElementById('durationFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (levelFilter) levelFilter.addEventListener('change', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (durationFilter) durationFilter.addEventListener('change', applyFilters);
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

/**
 * Apply filters to courses
 */
function applyFilters() {
    const levelFilter = document.getElementById('levelFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const durationFilter = document.getElementById('durationFilter')?.value || '';
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    // Filter courses based on all criteria
    const filteredCourses = coursesData.filter(course => {
        const matchLevel = levelFilter === '' || course.level === levelFilter;
        const matchCategory = categoryFilter === '' || course.category === categoryFilter;
        const matchDuration = durationFilter === '' || course.duration === durationFilter;
        const matchSearch = searchInput === '' || course.name.toLowerCase().includes(searchInput);
        
        return matchLevel && matchCategory && matchDuration && matchSearch;
    });
    
    // Display filtered courses
    displayFilteredCourses(filteredCourses);
}

/**
 * Display filtered courses
 * @param {array} courses - Array of filtered courses
 */
function displayFilteredCourses(courses) {
    const grid = document.getElementById('coursesGrid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (courses.length === 0) {
        grid.innerHTML = `
            <div class="no-courses-message" style="grid-column: 1 / -1;">
                <h2>No courses found</h2>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        grid.appendChild(courseCard);
    });
}

/**
 * Clear all filters
 */
function clearFilters() {
    document.getElementById('levelFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('durationFilter').value = '';
    document.getElementById('searchInput').value = '';
    
    displayAllCourses();
}

/**
 * Start or continue a course
 * @param {number} courseId - ID of the course
 */
function startCourse(courseId) {
    // Get current progress
    const progressData = JSON.parse(localStorage.getItem('courseProgress')) || {};
    
    // Increase progress by 25%
    progressData[courseId] = Math.min((progressData[courseId] || 0) + 25, 100);
    
    // Save updated progress
    localStorage.setItem('courseProgress', JSON.stringify(progressData));
    
    // Show confirmation
    const course = coursesData.find(c => c.id === courseId);
    alert(`You've made progress in ${course.name}! Current progress: ${progressData[courseId]}%`);
    
    // Refresh the courses display
    applyFilters();
}

// ============================================
// ROADMAP PAGE FUNCTIONALITY
// ============================================

/**
 * Initialize roadmap page
 */
function initializeRoadmapPage() {
    displayRoadmap();
}

/**
 * Display roadmap steps
 */
function displayRoadmap() {
    // Display frontend roadmap
    const frontendContainer = document.getElementById('frontendRoadmap');
    if (frontendContainer) {
        frontendContainer.innerHTML = '';
        roadmapData.frontend.forEach((step, index) => {
            const stepElement = createRoadmapStep(step, index, 'frontend');
            frontendContainer.appendChild(stepElement);
            
            // Add connector between steps
            if (index < roadmapData.frontend.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'step-connector';
                frontendContainer.appendChild(connector);
            }
        });
    }
    
    // Display backend roadmap
    const backendContainer = document.getElementById('backendRoadmap');
    if (backendContainer) {
        backendContainer.innerHTML = '';
        roadmapData.backend.forEach((step, index) => {
            const stepElement = createRoadmapStep(step, index, 'backend');
            backendContainer.appendChild(stepElement);
            
            // Add connector between steps
            if (index < roadmapData.backend.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'step-connector';
                backendContainer.appendChild(connector);
            }
        });
    }
}

/**
 * Create a roadmap step element
 * @param {object} step - Step data object
 * @param {number} index - Index of the step
 * @param {string} type - Type of roadmap (frontend/backend)
 * @returns {HTML Element} Roadmap step element
 */
function createRoadmapStep(step, index, type) {
    const container = document.createElement('div');
    container.className = 'roadmap-step';
    
    const stepNumber = document.createElement('div');
    stepNumber.className = 'step-number';
    stepNumber.textContent = index + 1;
    
    const content = document.createElement('div');
    content.className = 'step-content';
    content.style.cursor = 'pointer';
    
    // Determine status based on progress
    const progressData = JSON.parse(localStorage.getItem('courseProgress')) || {};
    const courseProgress = progressData[step.id] || 0;
    let status = 'incomplete';
    
    if (courseProgress === 100) {
        status = 'completed';
    } else if (courseProgress > 0) {
        status = 'in-progress';
    }
    
    content.innerHTML = `
        <h3>${step.name}</h3>
        <p>${step.description}</p>
        <span class="step-status ${status}">
            ${status === 'completed' ? '✓ Completed' : status === 'in-progress' ? '⟳ In Progress' : '○ Not Started'}
        </span>
    `;
    
    // Add click event to show course details
    content.addEventListener('click', () => {
        const course = coursesData.find(c => c.id === step.id);
        if (course) {
            showRoadmapModal(course);
        }
    });
    
    container.appendChild(stepNumber);
    container.appendChild(content);
    
    return container;
}

/**
 * Show roadmap modal with course details
 * @param {object} course - Course object
 */
function showRoadmapModal(course) {
    const modal = document.getElementById('roadmapModal');
    const modalBody = document.getElementById('modalBody');
    
    const progressData = JSON.parse(localStorage.getItem('courseProgress')) || {};
    const progress = progressData[course.id] || 0;
    
    modalBody.innerHTML = `
        <h2>${course.name}</h2>
        <p><strong>Description:</strong> ${course.description}</p>
        <p><strong>Level:</strong> ${course.level}</p>
        <p><strong>Category:</strong> ${course.category}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p><strong>Progress:</strong> ${progress}%</p>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <button class="btn-secondary" style="margin-top: 20px;" onclick="startCourse(${course.id}); closeRoadmapModal();">
            ${progress > 0 ? 'Continue Course' : 'Start Course'}
        </button>
    `;
    
    modal.style.display = 'block';
}

/**
 * Close roadmap modal
 */
function closeRoadmapModal() {
    const modal = document.getElementById('roadmapModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(e) {
    const modal = document.getElementById('roadmapModal');
    if (modal && e.target === modal) {
        modal.style.display = 'none';
    }
});

// ============================================
// LOGOUT FUNCTIONALITY
// ============================================

/**
 * Handle logout
 */
function logout() {
    // Ask for confirmation
    if (confirm('Are you sure you want to logout?')) {
        // Clear localStorage
        localStorage.removeItem('studentData');
        
        // Clear all form fields
        clearLoginForm();
        
        // Show login page
        showPage('loginPage');
        
        // Show logout message
        alert('You have been logged out successfully!');
    }
}

/**
 * Clear login form fields
 */
function clearLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.reset();
    }
    clearAllErrors();
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const hamburgers = document.querySelectorAll('.hamburger');
    
    hamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', function() {
            // Find the nearest navbar and toggle the menu
            const navbar = this.closest('.navbar');
            const menu = navbar?.querySelector('.nav-menu');
            
            if (menu) {
                menu.classList.toggle('active');
                // Animate hamburger
                this.style.opacity = menu.classList.contains('active') ? '0.6' : '1';
            }
        });
    });
}

/**
 * Close all mobile menus
 */
function closeAllMobileMenus() {
    const menus = document.querySelectorAll('.nav-menu');
    menus.forEach(menu => {
        menu.classList.remove('active');
    });
    
    const hamburgers = document.querySelectorAll('.hamburger');
    hamburgers.forEach(hamburger => {
        hamburger.style.opacity = '1';
    });
}

// ============================================
// CHECK LOGIN STATUS
// ============================================

/**
 * Check if user is logged in on page load
 */
function checkLoginStatus() {
    const studentData = localStorage.getItem('studentData');
    
    if (studentData) {
        // User is logged in, show home page
        showPage('homePage');
    } else {
        // User is not logged in, show login page
        showPage('loginPage');
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function initializeApp() {
    // Check login status
    checkLoginStatus();
    
    // Initialize login form
    initializeLogin();
    
    // Initialize mobile menu
    initializeMobileMenu();
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get progress percentage color
 * @param {number} progress - Progress percentage
 * @returns {string} Color code
 */
function getProgressColor(progress) {
    if (progress === 100) return '#2ecc71'; // Green
    if (progress >= 50) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
function smoothScrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
