document.addEventListener('DOMContentLoaded', function() {
  // Sponsors management functionality
  console.log('Sponsors module loaded');
  
  // Toggle switches for featured sponsors
  const toggleSwitches = document.querySelectorAll('#sponsors-section .relative.inline-block.w-8.h-4');
  
  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const dot = this.querySelector('div');
      const isFeatured = dot.classList.contains('right-0.5');
      
      if (isFeatured) {
        // Turn off
        dot.classList.remove('right-0.5');
        dot.classList.add('left-0.5');
        this.classList.remove('bg-green-500');
        this.classList.add('bg-gray-300', 'dark:bg-gray-700');
      } else {
        // Turn on
        dot.classList.remove('left-0.5');
        dot.classList.add('right-0.5');
        this.classList.remove('bg-gray-300', 'dark:bg-gray-700');
        this.classList.add('bg-green-500');
      }
      
      // Get sponsor name
      const sponsorCard = this.closest('.bg-white, .dark .bg-gray-900');
      const sponsorName = sponsorCard.querySelector('h3').innerText;
      
      console.log(`${sponsorName} featured status: ${!isFeatured}`);
    });
  });
  
  // Edit sponsor
  const editButtons = document.querySelectorAll('#sponsors-section button .ri-edit-line');
  editButtons.forEach(button => {
    button.parentElement.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const sponsorCard = this.closest('.bg-white, .dark .bg-gray-900');
      const sponsorName = sponsorCard ? sponsorCard.querySelector('h3').innerText : 'Unknown sponsor';
      
      console.log(`Editing sponsor: ${sponsorName}`);
      alert(`Editing: ${sponsorName}`);
    });
  });
  
  // Delete sponsor
  const deleteButtons = document.querySelectorAll('#sponsors-section button .ri-delete-bin-line');
  deleteButtons.forEach(button => {
    button.parentElement.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const sponsorCard = this.closest('.bg-white, .dark .bg-gray-900');
      const sponsorName = sponsorCard ? sponsorCard.querySelector('h3').innerText : 'Unknown sponsor';
      
      if (confirm(`Are you sure you want to delete "${sponsorName}"?`)) {
        console.log(`Deleting sponsor: ${sponsorName}`);
        
        // Animate removal
        sponsorCard.style.transition = 'all 0.3s ease';
        sponsorCard.style.opacity = '0';
        sponsorCard.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          sponsorCard.remove();
        }, 300);
      }
    });
  });
  
  // Add sponsor button
  const addSponsorBtn = document.querySelector('#sponsors-section button.bg-blue-500');
  if (addSponsorBtn) {
    addSponsorBtn.addEventListener('click', function() {
      console.log('Add new sponsor clicked');
      alert('Add sponsor functionality would open a form modal');
    });
  }
  
  // Table action buttons
  const tableActionButtons = document.querySelectorAll('#sponsors-section table button');
  tableActionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const sponsorName = row.querySelector('.font-medium').innerText;
      
      // Create dropdown menu
      const menu = document.createElement('div');
      menu.className = 'absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700';
      menu.innerHTML = `
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Toggle Featured</button>
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Remove</button>
      `;
      
      // Position and show menu
      this.parentElement.style.position = 'relative';
      this.parentElement.appendChild(menu);
      
      // Handle menu item clicks
      menu.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', function() {
          const action = this.innerText;
          console.log(`${action} clicked for sponsor: ${sponsorName}`);
          menu.remove();
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target) && e.target !== button) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    });
  });
});
