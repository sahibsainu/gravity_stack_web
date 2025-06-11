import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase URL or Anon Key not found in .env.');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define configurations for the 'common_configs' table
const commonConfigsToMigrate = [
  { key: 'LOGIN_URL', value: process.env.LOGIN_URL },
  { key: 'COMPUTE_URL', value: process.env.COMPUTE_URL },
  { key: 'NETWORK_URL', value: process.env.NETWORK_URL },
  { key: 'VOLUME_URL', value: process.env.VOLUME_URL },
];

// Define configurations for the 'admin_credentials' table
const adminConfigsToMigrate = [
  { key: 'username', value: process.env.GRAVITY_USERNAME },
  { key: 'password', value: process.env.GRAVITY_PASSWORD },
  { key: 'gravity_project_id', value: process.env.GRAVITY_PROJECT_ID },
];

async function upsertConfig(tableName, config) {
  if (!config.value) {
    console.warn(`Warning: Skipping key "${config.key}" for table "${tableName}" because its value is undefined in .env.`);
    return;
  }
  try {
    // For admin_credentials, we need to handle username, password, and gravity_project_id
    // as separate columns, not as generic key-value pairs.
    // This script will upsert them as individual rows for now,
    // but the application logic will fetch them as a single record.
    // The 'key' here refers to the column name in admin_credentials.
    const { data, error } = await supabase
      .from(tableName)
      .upsert({ [config.key]: config.value }, { onConflict: 'id' }); // Assuming a single row with a fixed ID or upserting by key if it's a unique column

    if (error) {
      console.error(`Error upserting config for key "${config.key}" in table "${tableName}":`, error.message);
    } else {
      console.log(`Successfully upserted config for key "${config.key}" in table "${tableName}".`);
    }
  } catch (e) {
    console.error(`An unexpected error occurred for key "${config.key}" in table "${tableName}":`, e);
  }
}

async function populateConfigs() {
  console.log('Starting migration of configurations...');

  // Migrate common_configs
  console.log('Migrating configurations to common_configs table...');
  for (const config of commonConfigsToMigrate) {
    await upsertConfig('common_configs', config);
  }

  // Migrate admin_credentials
  console.log('Migrating configurations to admin_credentials table...');
  // For admin_credentials, we need to upsert a single record with all fields.
  // Assuming there's only one admin record, we can try to update it or insert if not exists.
  // This requires a slightly different upsert logic than the generic key-value.
  // For simplicity and to match the table schema, we'll attempt to upsert a single record.
  const adminUsername = process.env.GRAVITY_USERNAME;
  const adminPassword = process.env.GRAVITY_PASSWORD;
  const adminProjectId = process.env.GRAVITY_PROJECT_ID;

  if (adminUsername && adminPassword && adminProjectId) {
    try {
      // Attempt to update the first record, or insert if no records exist.
      // This assumes you want to manage a single admin credential set.
      // If you have multiple, you'd need a more complex strategy (e.g., specific ID).
      const { data: existingData, error: fetchError } = await supabase
        .from('admin_credentials')
        .select('id')
        .limit(1);

      if (fetchError) {
        console.error('Error fetching existing admin_credentials:', fetchError.message);
        return;
      }

      let upsertPayload = { // Removed TypeScript type annotation
        username: adminUsername,
        password: adminPassword,
        gravity_project_id: adminProjectId,
      };

      if (existingData && existingData.length > 0) {
        // If a record exists, use its ID for upsert
        upsertPayload.id = existingData[0].id;
      }

      const { data, error } = await supabase
        .from('admin_credentials')
        .upsert(upsertPayload, { onConflict: 'id' }); // Use 'id' as conflict target if updating existing

      if (error) {
        console.error('Error upserting admin_credentials record:', error.message);
      } else {
        console.log('Successfully upserted admin_credentials record.');
      }
    } catch (e) {
      console.error('An unexpected error occurred during admin_credentials upsert:', e);
    }
  } else {
    console.warn('Warning: Skipping admin_credentials migration because GRAVITY_USERNAME, GRAVITY_PASSWORD, or GRAVITY_PROJECT_ID are undefined in .env.');
  }

  console.log('Configuration migration process complete.');
}

// Execute the population function
populateConfigs()
  .then(() => {
    console.log('Script finished successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Script failed with an error:', err);
    process.exit(1);
  });
