document.addEventListener('DOMContentLoaded', function() {
  // Events management functionality
  console.log('Events module loaded');
  
  // Status tag colors
  const statusColors = {
    'Published': 'green',
    'Draft': 'yellow',
    'Scheduled': 'blue',
    'Archived': 'gray'
  };
  
  // Event action buttons
  const actionButtons = document.querySelectorAll('#events-section button.p-1');
  
  actionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const action = this.querySelector('i').className;
      const eventCard = this.closest('.bg-white, .dark .bg-gray-900');
      const eventName = eventCard ? eventCard.querySelector('h3').innerText : 'Unknown event';
      
      if (action.includes('edit')) {
        console.log(`Editing event: ${eventName}`);
        // Show edit modal (placeholder)
        alert(`Editing: ${eventName}`);
      } else if (action.includes('delete')) {
        console.log(`Deleting event: ${eventName}`);
        
        // Confirm deletion
        if (confirm(`Are you sure you want to delete "${eventName}"?`)) {
          // Add animation for removal
          eventCard.style.transition = 'all 0.3s ease';
          eventCard.style.opacity = '0';
          eventCard.style.transform = 'scale(0.95)';
          
          // Remove after animation
          setTimeout(() => {
            eventCard.remove();
          }, 300);
        }
      }
    });
  });
  
  // Create event button
  const createEventBtn = document.querySelector('#events-section button.bg-blue-500');
  if (createEventBtn) {
    createEventBtn.addEventListener('click', function() {
      console.log('Create new event clicked');
      // Show event creation modal (placeholder)
      alert('Create new event functionality would open a form modal');
    });
  }
  
  // Table row actions
  const tableActionButtons = document.querySelectorAll('#events-section table button');
  tableActionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const eventName = row.querySelector('.font-medium').innerText;
      
      // Create dropdown menu
      const menu = document.createElement('div');
      menu.className = 'absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700';
      menu.innerHTML = `
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Duplicate</button>
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button>
      `;
      
      // Position and show the menu
      this.parentElement.style.position = 'relative';
      this.parentElement.appendChild(menu);
      
      // Handle menu item clicks
      menu.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', function() {
          const action = this.innerText;
          console.log(`${action} clicked for event: ${eventName}`);
          menu.remove();
          
          // Handle delete action
          if (action === 'Delete') {
            if (confirm(`Are you sure you want to delete "${eventName}"?`)) {
              row.style.transition = 'all 0.3s ease';
              row.style.opacity = '0';
              row.style.height = '0';
              setTimeout(() => row.remove(), 300);
            }
          }
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
