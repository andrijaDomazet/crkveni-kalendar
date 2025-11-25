import { useEffect } from "react";

export default function useScrollToTop(dependency = []) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, dependency);
}
