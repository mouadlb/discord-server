document.addEventListener('DOMContentLoaded', function() {
  // Clips management functionality
  console.log('Clips module loaded');
  
  // Video preview functionality
  const clipCards = document.querySelectorAll('#clips-section .relative > img');
  
  clipCards.forEach(img => {
    img.addEventListener('click', function() {
      const clipTitle = this.closest('.bg-white, .dark .bg-gray-900').querySelector('h3').innerText;
      console.log(`Playing clip: ${clipTitle}`);
      
      // Create overlay for video preview
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50';
      overlay.innerHTML = `
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl w-full mx-4">
          <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 class="font-medium">${clipTitle}</h3>
            <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div class="aspect-video bg-black flex items-center justify-center">
            <div class="text-white">
              <i class="ri-play-circle-line text-6xl"></i>
              <p class="mt-2 text-center">Video preview would play here</p>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(overlay);
      
      // Close button functionality
      overlay.querySelector('button').addEventListener('click', function() {
        overlay.remove();
      });
      
      // Also close when clicking outside
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.remove();
        }
      });
    });
  });
  
  // Clip action buttons
  const clipActionButtons = document.querySelectorAll('#clips-section .absolute.top-2.right-2');
  
  clipActionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const clipCard = this.closest('.bg-white, .dark .bg-gray-900');
      const clipTitle = clipCard.querySelector('h3').innerText;
      
      // Create dropdown menu
      const menu = document.createElement('div');
      menu.className = 'absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700';
      menu.innerHTML = `
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Edit</button>
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Feature</button>
        <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Delete</button>
      `;
      
      this.parentElement.appendChild(menu);
      
      // Handle menu item clicks
      menu.querySelectorAll('button').forEach(item => {
        item.addEventListener('click', function() {
          const action = this.innerText;
          menu.remove();
          
          console.log(`${action} clicked for clip: ${clipTitle}`);
          
          // Handle delete action
          if (action === 'Delete') {
            if (confirm(`Are you sure you want to delete "${clipTitle}"?`)) {
              clipCard.style.transition = 'all 0.3s ease';
              clipCard.style.opacity = '0';
              clipCard.style.transform = 'scale(0.95)';
              setTimeout(() => clipCard.remove(), 300);
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
  
  // Upload clip button
  const uploadButton = document.querySelector('#clips-section button.bg-blue-500');
  
  if (uploadButton) {
    uploadButton.addEventListener('click', function() {
      console.log('Upload clip clicked');
      
      // Create upload modal
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full mx-4">
          <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 class="font-medium">Upload New Clip</h3>
            <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div class="p-4">
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center mb-4">
              <div class="flex flex-col items-center">
                <i class="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                <p class="text-sm font-medium mb-1">Drag and drop your video file</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">or</p>
                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Browse files</button>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="title">Clip Title</label>
                <input class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent" id="title" type="text" placeholder="Enter title">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1" for="description">Description</label>
                <textarea class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent" id="description" rows="3" placeholder="Enter description"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Status</label>
                <div class="flex space-x-4">
                  <label class="flex items-center">
                    <input type="radio" name="status" class="mr-2" checked>
                    <span class="text-sm">Draft</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="status" class="mr-2">
                    <span class="text-sm">Publish immediately</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end p-4 border-t border-gray-200 dark:border-gray-800">
            <button class="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-md text-sm mr-2">Cancel</button>
            <button class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">Upload</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close button functionality
      const closeModal = () => modal.remove();
      modal.querySelector('div > div > button').addEventListener('click', closeModal);
      modal.querySelector('button:nth-last-child(2)').addEventListener('click', closeModal);
      
      // Close when clicking outside
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
      
      // Upload button
      modal.querySelector('button:last-child').addEventListener('click', function() {
        alert('Upload functionality would process the video file here');
        closeModal();
      });
    });
  }
});
