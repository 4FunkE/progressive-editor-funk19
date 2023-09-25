const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered event in the global variable `window.deferredPrompt`
    window.deferredPrompt = event;

    // // Remove the 'hidden' class from the button to make it visible
    butInstall.classList.toggle('hidden', false);
  });

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
     return;
    }
  
    // Show the installation prompt
    promptEvent.prompt();
    
    // Reset the deferredPrompt variable as it can only be used once
    window.deferredPrompt = null;
    
    // Hide the install button by adding the 'hidden' class
    butInstall.classList.toggle('hidden', true);
  });

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear the `window.deferredPrompt` variable
    window.deferredPrompt = null;
    // The PWA has been successfully installed
    console.log('PWA installed successfully');
  }); 