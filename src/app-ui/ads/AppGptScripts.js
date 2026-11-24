import { GPT_INIT, SERVICES_CONFIG } from "../../shared/head/AdScripts";
import { APP_SLOTS } from "./slots";

// GPT samo sa app slotovima: nema web slotova, 1x1 formata ni interstitiala.
const defineSlots = APP_SLOTS.map(
  ({ id, path, sizes }) =>
    `googletag.defineSlot(${JSON.stringify(path)},${JSON.stringify(sizes)},${JSON.stringify(id)}).addService(googletag.pubads());`,
).join("\n");

const SLOTS_SCRIPT = `googletag.cmd.push(function() {
${defineSlots}
${SERVICES_CONFIG}
});`;

export default function AppGptScripts() {
  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      />
      <script dangerouslySetInnerHTML={{ __html: GPT_INIT }} />
      <script dangerouslySetInnerHTML={{ __html: SLOTS_SCRIPT }} />
    </>
  );
}
