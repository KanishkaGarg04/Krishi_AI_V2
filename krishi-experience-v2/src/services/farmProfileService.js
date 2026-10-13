import apiClient from "./api";

/**
 * Farm Profile Service for Krishi AI V2
 * 
 * IMPORTANT ARCHITECTURE NOTE:
 * The existing Flask backend currently stores only basic columns in the User model:
 * (username, email, password_hash, phone, farm_size, location).
 * 
 * Dedicated REST endpoints for comprehensive farm profiles (soil analysis, irrigation sources,
 * crop stage tracking, and planned schedules) are targeted for Phase 2 when the ML recommendation
 * pipelines are wired up.
 * 
 * In this Phase 1 implementation, completed farm profiles are persisted cleanly to local
 * client storage under 'krishi_farm_profile' as a verified development fixture, and formatted
 * ready to send to the future POST /api/farm-profile endpoint.
 */

const STORAGE_KEY = "krishi_farm_profile_v2";

export const farmProfileService = {
  /**
   * Save the completed farm profile
   */
  async saveProfile(profileData) {
    // 1. Sanitize payload: strip any plain password before persisting
    const sanitized = JSON.parse(JSON.stringify(profileData));
    if (sanitized.account) {
      delete sanitized.account.password;
      delete sanitized.account.confirmPassword;
    }

    sanitized.meta = {
      ...sanitized.meta,
      completedAt: new Date().toISOString(),
      isDraft: false
    };

    // 2. Persist locally as active farm profile
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

    // 3. Attempt forward-compatible backend endpoint if it ever becomes available
    try {
      const response = await apiClient.post("/api/farm-profile", sanitized);
      return {
        success: true,
        source: "backend",
        data: response.data
      };
    } catch (err) {
      // Expected in Phase 1 since endpoint does not exist yet on Flask backend
      return {
        success: true,
        source: "local_storage_fixture",
        data: sanitized,
        note: "Profile saved locally. Phase 2 backend endpoint /api/farm-profile is pending implementation."
      };
    }
  },

  /**
   * Retrieve active farm profile
   */
  getProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  /**
   * Clear active farm profile
   */
  clearProfile() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
