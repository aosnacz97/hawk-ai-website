'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AppStoreRating,
  fetchAppStoreRating,
  shouldShowRating,
  formatRating,
  formatReviewCount
} from '../lib/appStoreRating';

interface AppStoreContextValue extends AppStoreRating {
  shouldShow: boolean;
  formattedRating: string;
  formattedReviewCount: string;
}

const defaultValue: AppStoreContextValue = {
  rating: null,
  reviewCount: 0,
  isLoading: true,
  error: null,
  shouldShow: false,
  formattedRating: '',
  formattedReviewCount: '0',
};

const AppStoreContext = createContext<AppStoreContextValue>(defaultValue);

export function useAppStoreRating() {
  return useContext(AppStoreContext);
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [ratingData, setRatingData] = useState<AppStoreRating>({
    rating: null,
    reviewCount: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchAppStoreRating().then(setRatingData);
  }, []);

  const value: AppStoreContextValue = {
    ...ratingData,
    shouldShow: shouldShowRating(ratingData.rating, ratingData.reviewCount),
    formattedRating: ratingData.rating !== null ? formatRating(ratingData.rating) : '',
    formattedReviewCount: formatReviewCount(ratingData.reviewCount),
  };

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}
