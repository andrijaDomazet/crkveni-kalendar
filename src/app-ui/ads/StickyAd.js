"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useScriptContext } from "../../shared/ScriptProvider";
import { CloseIcon } from "../icons/AppIcons";
import { AD_STICKY } from "./slots";
import { refreshSlot, showSlot } from "./AppAd";
import useSlotStatus from "./useSlotStatus";

// Ekrani na kojima nema sticky reklame (meni, podesavanja, pravne stranice).
const NO_STICKY = ["/app/vise/", "/app/podesavanja/", "/app/info/"];
const STICKY_HEIGHT = "145px"; // 100 reklama + 2x8 razmak + 1 linija + 28 jezicak sa X
const MIN_REFRESH_MS = 30000;
const DISMISS_KEY = "ck-sticky-dismissed";

// Fiksna reklama 320x100 iznad donje navigacije. Ostaje u shell-u pa se ne gubi pri
// promeni ekrana; osvezava se pri promeni ekrana, ali najcesce na 30 s.
// X (samo kad je reklama stigla) je jezicak koji viri iznad gornjeg desnog ugla, van reklamnog
// diva, i sakriva reklamu do sledeceg otvaranja app-a.
export default function StickyAd() {
  const pathname = usePathname();
  const { cyr } = useScriptContext();
  const [dismissed, setDismissed] = useState(false);
  const lastRequest = useRef(0);
  const firstPath = useRef(pathname);
  const status = useSlotStatus(AD_STICKY, () => {
    lastRequest.current = Date.now();
  });

  const allowed = !NO_STICKY.some((prefix) => pathname.startsWith(prefix));
  const visible = allowed && status !== "empty" && !dismissed;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {}
  }, []);

  useEffect(() => {
    showSlot(AD_STICKY);
  }, []);

  // Nova reklama pri promeni ekrana, ne cesce od jednom u 30 s (ne trazi se kad je zatvorena).
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;
    if (!allowed || dismissed) return;
    if (Date.now() - lastRequest.current >= MIN_REFRESH_MS) {
      lastRequest.current = Date.now();
      refreshSlot(AD_STICKY);
    }
  }, [pathname, allowed, dismissed]);

  // Sadrzaj ne sme da ostane ispod reklame.
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-sticky-h",
      visible ? STICKY_HEIGHT : "0px",
    );
  }, [visible]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return (
    <div className="app-sticky" hidden={!visible}>
      {status === "filled" && (
        <button
          type="button"
          className="app-sticky__close"
          aria-label={cyr("Zatvori reklamu")}
          onClick={dismiss}
        >
          <CloseIcon className="app-icon app-icon--sm" />
        </button>
      )}
      <div className="app-sticky__inner">
        <div className="app-sticky__box">
          <span className="app-sticky__label">{cyr("OGLAS")}</span>
          <div id={AD_STICKY} className="app-sticky__slot" />
        </div>
      </div>
    </div>
  );
}
