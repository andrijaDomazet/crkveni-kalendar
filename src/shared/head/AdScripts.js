export function AdSenseScript() {
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3520542236575841"
      crossOrigin="anonymous"
    />
  );
}

export const GPT_INIT = `var googletag = googletag || {};googletag.cmd = googletag.cmd || [];var interstitialSlot;`;

const SLOT_MAPPINGS_AND_DEFINITIONS = `
              var mappingBillboard = googletag.sizeMapping().addSize([21,21],[[1,1],[320,100]]).addSize([768,21],[[1,1],[728,90]]).addSize([1023,21],[[1,1],[970,250],[728,90]]).build();
              var mappingAfterText = googletag.sizeMapping().addSize([21,21],[[1,1],[320,100],[300,250]]).addSize([860,21],[[1,1],[728,90]]).build();
              var mappingSideBar = googletag.sizeMapping().addSize([21,21],[[300,250]]).addSize([860,21],[[300,250],[300,600]]).addSize([1030,21],[[300,600]]).build();
              var mappingSideBar2 = googletag.sizeMapping().addSize([21,21],[[300,250]]).addSize([860,21],[[300,250]]).addSize([1030,21],[[300,250]]).build();
              var mappingInText = googletag.sizeMapping().addSize([21,21],[[300,250]]).addSize([860,21],[[300,250]]).addSize([1030,21],[[300,250]]).build();
              var mappingCalendar = googletag.sizeMapping().addSize([21,21],[320,100]).addSize([1030,21],[]).build();
              var mappingSticky = googletag.sizeMapping().addSize([21,21],[[1,1],[320,100]]).addSize([320,21],[[1,1],[320,100]]).addSize([768,21],[[1,1],[728,90]]).addSize([1023,21],[[1,1],[728,90]]).build();

              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-afterText-1',[[320,100],[300,250],[728,90]],'div-gpt-ad-1750409157804-0').addService(googletag.pubads()).defineSizeMapping(mappingAfterText);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-afterText-2',[[320,100],[300,250],[728,90]],'div-gpt-ad-1750409277034-0').addService(googletag.pubads()).defineSizeMapping(mappingAfterText);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-sb-sticky',[[300,250],[300,600]],'div-gpt-ad-1750411708088-0').addService(googletag.pubads()).defineSizeMapping(mappingSideBar);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-inText-1',[[300,250],[300,600]],'div-gpt-ad-1750930023966-0').addService(googletag.pubads()).defineSizeMapping(mappingInText);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-bilbord',[[728,90],[320,100],[970,250]],'div-gpt-ad-1761641124263-0').addService(googletag.pubads()).defineSizeMapping(mappingBillboard);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-sb-2',[[728,90],[320,100],[970,250]],'div-gpt-ad-1763130338013-0').addService(googletag.pubads()).defineSizeMapping(mappingSideBar2);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-infeed',[[728,90],[320,100],[970,250]],'div-gpt-ad-1764593675864-0').addService(googletag.pubads()).defineSizeMapping(mappingBillboard);
              googletag.defineSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-sticky',[[1,1],[320,100],[728,90]],'div-gpt-ad-1768472077826-0').addService(googletag.pubads()).defineSizeMapping(mappingSticky);

              googletag.defineSlot('/23098387262/crkveni-kalendar/InCalendar-1',[320,100],'div-gpt-ad-1769765602091-0').addService(googletag.pubads()).defineSizeMapping(mappingCalendar);
              googletag.defineSlot('/23098387262/crkveni-kalendar/InCalendar-2',[320,100],'div-gpt-ad-1769765622164-0').addService(googletag.pubads()).defineSizeMapping(mappingCalendar);
              googletag.defineSlot('/23098387262/crkveni-kalendar/InCalendar-3',[320,100],'div-gpt-ad-1769765646981-0').addService(googletag.pubads()).defineSizeMapping(mappingCalendar);
              googletag.defineSlot('/23098387262/crkveni-kalendar/InCalendar-4',[320,100],'div-gpt-ad-1769765669736-0').addService(googletag.pubads()).defineSizeMapping(mappingCalendar);
              googletag.defineSlot('/23098387262/crkveni-kalendar/InCalendar-5',[320,100],'div-gpt-ad-1769765520606-0').addService(googletag.pubads()).defineSizeMapping(mappingCalendar);
`;

const INTERSTITIAL_DEFINITION = `
              var mappingInterstitial = googletag.sizeMapping().addSize([0,0],[[300,250],[320,480]]).build();
              interstitialSlot = googletag.defineOutOfPageSlot('/23098387262/crkveni-kalendar/crkveni-kalendar-interstitial', googletag.enums.OutOfPageFormat.INTERSTITIAL).defineSizeMapping(mappingInterstitial);
              if (interstitialSlot) {
                interstitialSlot.addService(googletag.pubads());
                interstitialSlot.setConfig({ interstitial: { triggers: { navBar: true, unhideWindow: true } } });
              }
`;

export const SERVICES_CONFIG = `
              googletag.setConfig({centering: true});
              googletag.setConfig({ collapseDiv: { collapseBeforeAdFetch: true } });
              googletag.pubads().enableAsyncRendering();
              googletag.pubads().setSafeFrameConfig({
              allowOverlayExpansion: true,
              allowPushExpansion: true,
              sandbox: false
              });
              googletag.pubads().enableLazyLoad({fetchMarginPercent:200,renderMarginPercent:100,mobileScaling:0.5});

              googletag.enableServices();
`;

const INTERSTITIAL_DISPLAY = `
              window.addEventListener('load', function() {
              if (interstitialSlot) googletag.display(interstitialSlot);
              });`;

function buildSlotsScript(interstitial) {
  return `googletag.cmd.push(function() {${SLOT_MAPPINGS_AND_DEFINITIONS}${
    interstitial ? INTERSTITIAL_DEFINITION : ""
  }${SERVICES_CONFIG}${interstitial ? INTERSTITIAL_DISPLAY : ""}
            });`;
}

export function GptScripts({ interstitial = true }) {
  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      />
      <script dangerouslySetInnerHTML={{ __html: GPT_INIT }} />
      <script
        dangerouslySetInnerHTML={{ __html: buildSlotsScript(interstitial) }}
      />
    </>
  );
}
