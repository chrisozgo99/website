export const pageview = (url: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
