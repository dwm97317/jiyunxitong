/**
 * Secure Vault Service for Zalo Credentials
 * 
 * This module provides a secure way to store and retrieve credentials.
 * In development, it uses environment variables.
 * In production, this can be easily swapped with HashiCorp Vault, AWS Secrets Manager, etc.
 */

const VAULT_PROVIDER = process.env.VAULT_PROVIDER || 'env';

/**
 * Zalo credentials interface
 * @typedef {Object} ZaloCredentials
 * @property {string} oa_id - Zalo Official Account ID
 * @property {string} access_token - Zalo API access token
 * @property {string} secret_key - Zalo API secret key
 * @property {string} webhook_verify_token - Token for webhook verification
 */

/**
 * Get Zalo credentials from vault
 * @returns {Promise<ZaloCredentials>}
 */
async function getZaloCredentials() {
  switch (VAULT_PROVIDER) {
    case 'hashicorp':
      return getFromHashiCorpVault();
    case 'aws':
      return getFromAWSSecretsManager();
    case 'env':
    default:
      return getFromEnvironment();
  }
}

/**
 * Get credentials from environment variables (development)
 * @returns {ZaloCredentials}
 */
function getFromEnvironment() {
  const required = ['ZALO_OA_ID', 'ZALO_ACCESS_TOKEN', 'ZALO_SECRET_KEY', 'ZALO_WEBHOOK_VERIFY_TOKEN'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return {
    oa_id: process.env.ZALO_OA_ID,
    access_token: process.env.ZALO_ACCESS_TOKEN,
    secret_key: process.env.ZALO_SECRET_KEY,
    webhook_verify_token: process.env.ZALO_WEBHOOK_VERIFY_TOKEN
  };
}

/**
 * Get credentials from HashiCorp Vault (production)
 * @returns {Promise<ZaloCredentials>}
 */
async function getFromHashiCorpVault() {
  // Placeholder for HashiCorp Vault integration
  // In production, implement using @hashicorp/vault or node-vault
  const VAULT_ADDR = process.env.VAULT_ADDR;
  const VAULT_TOKEN = process.env.VAULT_TOKEN;
  const VAULT_SECRET_PATH = process.env.VAULT_SECRET_PATH || 'secret/zalo';
  
  if (!VAULT_ADDR || !VAULT_TOKEN) {
    throw new Error('HashiCorp Vault configuration missing. Set VAULT_ADDR and VAULT_TOKEN');
  }
  
  // TODO: Implement actual Vault client call
  // const vault = require('node-vault')({ endpoint: VAULT_ADDR, token: VAULT_TOKEN });
  // const result = await vault.read(VAULT_SECRET_PATH);
  // return result.data.data;
  
  console.warn('HashiCorp Vault integration not implemented. Falling back to environment variables.');
  return getFromEnvironment();
}

/**
 * Get credentials from AWS Secrets Manager (production)
 * @returns {Promise<ZaloCredentials>}
 */
async function getFromAWSSecretsManager() {
  // Placeholder for AWS Secrets Manager integration
  const AWS_REGION = process.env.AWS_REGION;
  const SECRET_NAME = process.env.AWS_SECRET_NAME || 'zalo/credentials';
  
  if (!AWS_REGION) {
    throw new Error('AWS region not configured. Set AWS_REGION');
  }
  
  // TODO: Implement actual AWS Secrets Manager call
  // const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
  // const client = new SecretsManagerClient({ region: AWS_REGION });
  // const command = new GetSecretValueCommand({ SecretId: SECRET_NAME });
  // const result = await client.send(command);
  // return JSON.parse(result.SecretString);
  
  console.warn('AWS Secrets Manager integration not implemented. Falling back to environment variables.');
  return getFromEnvironment();
}

/**
 * Get a specific credential by key
 * @param {string} key - Credential key (oa_id, access_token, secret_key, webhook_verify_token)
 * @returns {Promise<string>}
 */
async function getCredential(key) {
  const credentials = await getZaloCredentials();
  
  if (!(key in credentials)) {
    throw new Error(`Unknown credential key: ${key}`);
  }
  
  return credentials[key];
}

/**
 * Validate that all required credentials are present
 * @returns {Promise<boolean>}
 */
async function validateCredentials() {
  try {
    const creds = await getZaloCredentials();
    return !!(creds.oa_id && creds.access_token && creds.secret_key && creds.webhook_verify_token);
  } catch (error) {
    return false;
  }
}

module.exports = {
  getZaloCredentials,
  getCredential,
  validateCredentials,
  VAULT_PROVIDER
};