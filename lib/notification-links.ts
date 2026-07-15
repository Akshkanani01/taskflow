/**
 * =====================================================
 * Notification Route Helpers
 * =====================================================
 *
 * Centralized notification links.
 * Never hardcode notification URLs anywhere else.
 *
 * Example:
 * NotificationLinks.task(...)
 * NotificationLinks.notifications()
 *
 * =====================================================
 */

export const NotificationLinks = {
  /**
   * Dashboard
   */
  dashboard() {
    return "/dashboard";
  },

  /**
   * Notification Page
   */
  notifications() {
    return "/dashboard/notifications";
  },

  /**
   * Team Page
   */
  team() {
    return "/dashboard/team";
  },

  /**
   * Settings Page
   */
  settings() {
    return "/dashboard/settings";
  },

  /**
   * Invite Link
   */
  invite(token: string) {
    return `/invite/${token}`;
  },

  /**
   * Workspace
   */
  workspace(workspaceId: string) {
    return `/dashboard/workspaces/${workspaceId}`;
  },

  /**
   * Space
   */
  space(spaceId: string) {
    return `/dashboard/spaces/${spaceId}`;
  },

  /**
   * List
   */
  list(
    spaceId: string,
    listId: string
  ) {
    return `/dashboard/spaces/${spaceId}/lists/${listId}`;
  },

  /**
   * Task Detail
   */
  task(
    spaceId: string,
    listId: string,
    taskId: string
  ) {
    return `/dashboard/spaces/${spaceId}/lists/${listId}/tasks/${taskId}`;
  },
} as const;