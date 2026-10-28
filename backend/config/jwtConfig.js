const KNOWN_INSECURE_SECRETS = new Set([
  'fallback_development_secret_veslocal_2026',
  'changeme_in_production_veslocal_2026',
  'secret',
  'jwt_secret',
  'your_jwt_secret',
  '123456'
]);

/**
 * Returns a valid JWT secret or throws an error if missing/insecure in production.
 */
export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!secret || secret.trim() === '') {
    if (isProduction) {
      throw new Error('[Security Error] JWT_SECRET environment variable is missing in production.');
    }
    return 'fallback_development_secret_veslocal_2026';
  }

  const trimmed = secret.trim();
  if (isProduction && KNOWN_INSECURE_SECRETS.has(trimmed)) {
    throw new Error('[Security Error] JWT_SECRET must not use a known development placeholder in production.');
  }

  if (isProduction && trimmed.length < 32) {
    throw new Error('[Security Error] JWT_SECRET in production must be at least 32 characters long.');
  }

  return trimmed;
}

export default getJwtSecret;
