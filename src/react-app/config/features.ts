/**
 * Feature flags for the Naval Knots application
 * These flags can be used to enable or disable features throughout the app
 */

export const FEATURE_FLAGS = {
  /**
   * Controls whether the "Try Scenarios" button is shown on the home page
   * Set to false to hide the scenarios feature entirely
   */
  ENABLE_SCENARIOS: true,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
