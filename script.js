// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initialize_navigation();
    initialize_projects();
    initialize_contact_form();
    initialize_animations();
    initialize_cta_button();
});

// Smooth scrolling for navigation links
function initialize_navigation() {
    const nav_links = document.querySelectorAll('.nav_link');
    
    nav_links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target_id = this.getAttribute('href');
            const target_section = document.querySelector(target_id);
            
            if (target_section) {
                const header_height = document.querySelector('.header').offsetHeight;
                const target_position = target_section.offsetTop - header_height;
                
                window.scrollTo({
                    top: target_position,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Dynamic project loading
function initialize_projects() {
    const projects_data = [
        {
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
        },
        {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates.',
            technologies: ['Vue.js', 'Firebase', 'CSS3', 'JavaScript']
        },
        {
            title: 'Weather Dashboard',
            description: 'A weather application that displays current and forecasted weather data.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Weather API']
        },
        {
            title: 'Portfolio Website',
            description: 'A responsive portfolio website showcasing projects and skills.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']
        }
    ];
    
    const projects_grid = document.getElementById('projects_grid');
    
    projects_data.forEach(project => {
        const project_card = create_project_card(project);
        projects_grid.appendChild(project_card);
    });
}

// Create individual project card
function create_project_card(project) {
    const card = document.createElement('div');
    card.className = 'project_card';
    
    const title = document.createElement('h3');
    title.className = 'project_title';
    title.textContent = project.title;
    
    const description = document.createElement('p');
    description.className = 'project_description';
    description.textContent = project.description;
    
    const tech_container = document.createElement('div');
    tech_container.className = 'project_tech';
    
    project.technologies.forEach(tech => {
        const tech_tag = document.createElement('span');
        tech_tag.className = 'tech_tag';
        tech_tag.textContent = tech;
        tech_container.appendChild(tech_tag);
    });
    
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(tech_container);
    
    return card;
}

// Contact form handling
function initialize_contact_form() {
    const contact_form = document.getElementById('contact_form');
    
    contact_form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form_data = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simulate form submission
        show_submission_message(name, email, message);
        
        // Reset form
        this.reset();
    });
}

// Show submission confirmation
function show_submission_message(name, email, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <h4>Message Sent!</h4>
        <p>Thank you ${name}, your message has been received.</p>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize scroll animations
function initialize_animations() {
    const observer_options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observer_options);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// CTA button functionality
function initialize_cta_button() {
    const cta_button = document.getElementById('cta_button');
    
    cta_button.addEventListener('click', function() {
        // Scroll to projects section
        const projects_section = document.getElementById('projects');
        const header_height = document.querySelector('.header').offsetHeight;
        const target_position = projects_section.offsetTop - header_height;
        
        window.scrollTo({
            top: target_position,
            behavior: 'smooth'
        });
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scroll_position = window.scrollY;
    
    if (scroll_position > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Add typing effect to hero title
function type_writer_effect() {
    const hero_title = document.querySelector('.hero_title');
    const text = hero_title.textContent;
    hero_title.textContent = '';
    
    let i = 0;
    const type_interval = setInterval(() => {
        if (i < text.length) {
            hero_title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(type_interval);
        }
    }, 100);
}

// Initialize typing effect after page load
window.addEventListener('load', function() {
    setTimeout(type_writer_effect, 1000);
});

// Add hover effects to project cards
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('project_card')) {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('project_card')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});

// Form input focus effects
document.addEventListener('focusin', function(e) {
    if (e.target.classList.contains('form_input') || e.target.classList.contains('form_textarea')) {
        e.target.parentElement.style.transform = 'scale(1.02)';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.classList.contains('form_input') || e.target.classList.contains('form_textarea')) {
        e.target.parentElement.style.transform = 'scale(1)';
    }
});
