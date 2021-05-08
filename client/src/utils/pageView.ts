export const pageview = (url: string) => {
  if ((window as any).grag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};
