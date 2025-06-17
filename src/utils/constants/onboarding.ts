
export const ONBOARDING_CONSTANTS = {
  CACHE_TTL: {
    CLIENTS_LIST: 2 * 60 * 1000, // 2 minutes
    CLIENTS_SEARCH: 1 * 60 * 1000, // 1 minute
    CLIENT_METRICS: 5 * 60 * 1000, // 5 minutes
  },
  
  TIMEOUTS: {
    AUTO_OPEN_MODAL: 2000, // 2 seconds
    REDIRECT_DELAY: 1500, // 1.5 seconds
  },
  
  STORAGE_KEYS: {
    ONBOARDING_DISMISSED: 'cs360-onboarding-dismissed',
    PROGRESS_PREFIX: 'cs360-onboarding-progress-',
  },
  
  EXPECTED_STEPS: {
    super_admin: 5,
    account_admin: 4,
    enterprise: 3,
    professional: 2,
    starter: 1,
    partner: 2,
  }
} as const;
