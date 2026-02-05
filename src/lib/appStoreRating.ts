// App Store Rating Utility
// Fetches real rating data from Apple's iTunes Lookup API

export interface AppStoreRating {
  rating: number | null;
  reviewCount: number;
  isLoading: boolean;
  error: string | null;
}

// Replace this with your actual App Store ID when the app is published
// You can find it in App Store Connect or in the app's URL: apps.apple.com/app/id{APP_ID}
export const APP_STORE_ID = process.env.NEXT_PUBLIC_APP_STORE_ID || '';

export interface iTunesLookupResponse {
  resultCount: number;
  results: Array<{
    averageUserRating?: number;
    userRatingCount?: number;
    trackName?: string;
  }>;
}

export async function fetchAppStoreRating(): Promise<AppStoreRating> {
  // If no App Store ID is configured, return null rating (will hide the display)
  if (!APP_STORE_ID) {
    return {
      rating: null,
      reviewCount: 0,
      isLoading: false,
      error: null,
    };
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch App Store data');
    }

    const data: iTunesLookupResponse = await response.json();

    if (data.resultCount === 0 || !data.results[0]) {
      return {
        rating: null,
        reviewCount: 0,
        isLoading: false,
        error: 'App not found',
      };
    }

    const appData = data.results[0];

    return {
      rating: appData.averageUserRating ?? null,
      reviewCount: appData.userRatingCount ?? 0,
      isLoading: false,
      error: null,
    };
  } catch (error) {
    return {
      rating: null,
      reviewCount: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Helper function to check if rating should be displayed
// Only show if rating >= 4.0 AND reviewCount > 0
export function shouldShowRating(rating: number | null, reviewCount: number): boolean {
  if (rating === null) return false;
  if (reviewCount === 0) return false;
  if (rating < 4.0) return false;
  return true;
}

// Format review count for display (e.g., 2847 -> "2,847")
export function formatReviewCount(count: number): string {
  return count.toLocaleString();
}

// Format rating for display (e.g., 4.8234 -> "4.8")
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
