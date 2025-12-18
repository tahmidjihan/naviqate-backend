import type { AnalyticsData } from './getAnalytics.js';

export function mergeAnalytics(
  oldData: AnalyticsData | null,
  newData: AnalyticsData
): AnalyticsData {
  // If no old data exists, return new data
  if (!oldData) {
    return newData;
  }

  const merged: AnalyticsData = {};

  // Merge form data - keep entries with higher percentage
  if (newData.form || oldData.form) {
    const formMap = new Map<string, { form: string; percentage: number }>();

    // Add old forms to map
    if (oldData.form) {
      oldData.form.forEach((item) => {
        formMap.set(item.form, item);
      });
    }

    // Update map with new forms if they have higher percentage
    if (newData.form) {
      newData.form.forEach((item) => {
        const existing = formMap.get(item.form);
        if (!existing || item.percentage > existing.percentage) {
          formMap.set(item.form, item);
        }
      });
    }

    merged.form = Array.from(formMap.values());
  }

  // Merge page data - keep entries with higher percentage
  if (newData.page || oldData.page) {
    const pageMap = new Map<string, { page: string; percentage: number }>();

    // Add old pages to map
    if (oldData.page) {
      oldData.page.forEach((item) => {
        pageMap.set(item.page, item);
      });
    }

    // Update map with new pages if they have higher percentage
    if (newData.page) {
      newData.page.forEach((item) => {
        const existing = pageMap.get(item.page);
        if (!existing || item.percentage > existing.percentage) {
          pageMap.set(item.page, item);
        }
      });
    }

    merged.page = Array.from(pageMap.values());
  }

  // Merge button data - keep unique entries
  if (newData.button || oldData.button) {
    const buttonSet = new Set<string>();
    const buttonList: Array<{ page: string; button: string }> = [];

    // Add old buttons
    if (oldData.button) {
      oldData.button.forEach((item) => {
        const key = `${item.page}::${item.button}`;
        if (!buttonSet.has(key)) {
          buttonSet.add(key);
          buttonList.push(item);
        }
      });
    }

    // Add new buttons (unique only)
    if (newData.button) {
      newData.button.forEach((item) => {
        const key = `${item.page}::${item.button}`;
        if (!buttonSet.has(key)) {
          buttonSet.add(key);
          buttonList.push(item);
        }
      });
    }

    merged.button = buttonList;
  }

  return merged;
}
