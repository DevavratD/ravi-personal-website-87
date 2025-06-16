// Polyfill to prevent getInstalledRelatedApps errors
if (typeof navigator !== 'undefined') {
    // Store the original method if it exists
    const originalGetInstalledRelatedApps = navigator.getInstalledRelatedApps;

    // Override the method with a safe implementation
    Object.defineProperty(navigator, 'getInstalledRelatedApps', {
        value: async function () {
            try {
                // Only call the original method if we're in a top-level context
                if (window.self === window.top && originalGetInstalledRelatedApps) {
                    return await originalGetInstalledRelatedApps.call(navigator);
                }
                return [];
            } catch (error) {
                console.debug('Installed apps check failed:', error);
                return [];
            }
        },
        writable: true,
        configurable: true
    });
}

/**
 * Safely checks for installed related apps
 * @returns Promise<boolean> - Returns true if the check was successful, false if it failed
 */
export const safelyCheckInstalledApps = async (): Promise<boolean> => {
    try {
        // Only run in top-level context
        if (window.self !== window.top) {
            return false;
        }

        // Check if the API is available
        if (!navigator.getInstalledRelatedApps) {
            return false;
        }

        await navigator.getInstalledRelatedApps();
        return true;
    } catch (error) {
        // Silently handle any errors
        console.debug('Installed apps check failed:', error);
        return false;
    }
}; 