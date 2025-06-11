import { supabase } from './supabaseClient';
import { log, logError } from './index';

// Cache for storing fetched configurations
const configCache: { [key: string]: string | null } = {};
// Promise to track if configurations are currently being loaded
let configLoadingPromise: Promise<void> | null = null;

/**
 * Loads all common configurations from the Supabase 'common_configs' table into a local cache.
 * This function ensures that the configurations are fetched only once.
 */
const loadCommonConfigs = async () => {
  // If a loading operation is already in progress, return its promise
  if (configLoadingPromise) {
    return configLoadingPromise;
  }

  // Start a new loading operation and store its promise
  configLoadingPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('common_configs')
        .select('key, value');

      if (error) {
        logError('Error fetching common configs from Supabase:', error);
        throw new Error(`Failed to fetch common configurations: ${error.message}`);
      }

      if (data) {
        data.forEach(item => {
          configCache[item.key] = item.value;
        });
        log('Common configurations loaded into cache.');
      }
    } catch (error: any) {
      logError('Error in loadCommonConfigs:', error);
      // Clear cache and re-throw to indicate failure
      Object.keys(configCache).forEach(key => delete configCache[key]);
      throw error;
    } finally {
      // Reset the promise after completion (success or failure)
      configLoadingPromise = null;
    }
  })();
  return configLoadingPromise;
};

/**
 * Retrieves a specific configuration value by its key.
 * It first checks the local cache, and if not found, it attempts to load all configurations
 * from Supabase and then retrieves the value.
 * @param key The key of the configuration to retrieve.
 * @returns The value of the configuration.
 * @throws Error if the configuration key is not found or if fetching fails.
 */
export const getCommonConfig = async (key: string): Promise<string> => {
  // Check if the value is already in the cache
  if (configCache[key] !== undefined) {
    return configCache[key] as string;
  }

  // If not in cache, ensure all common configs are loaded
  await loadCommonConfigs();

  // After loading, check the cache again
  if (configCache[key] !== undefined) {
    return configCache[key] as string;
  } else {
    // If still not found, throw an error
    throw new Error(`Configuration key "${key}" not found in common_configs.`);
  }
};
