/**
 * Loads a script after the page has loaded to avoid blocking rendering
 * 
 * @param url URL of the script to load
 * @param attributes Optional attributes for the script tag
 * @returns Promise that resolves when the script is loaded
 */
export const loadDeferredScript = (
  url: string, 
  attributes: Record<string, string> = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    
    // Add custom attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);

    document.body.appendChild(script);
  });
};

/**
 * Loads multiple scripts after page content has loaded
 * 
 * @param scripts Array of script URLs or objects with URL and attributes
 */
export const loadDeferredScripts = (
  scripts: Array<string | { url: string; attributes?: Record<string, string> }>
): void => {
  // Wait for page idle or timeout after 2 seconds
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      scripts.forEach(script => {
        if (typeof script === 'string') {
          loadDeferredScript(script);
        } else {
          loadDeferredScript(script.url, script.attributes || {});
        }
      });
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      scripts.forEach(script => {
        if (typeof script === 'string') {
          loadDeferredScript(script);
        } else {
          loadDeferredScript(script.url, script.attributes || {});
        }
      });
    }, 1000);
  }
}; 