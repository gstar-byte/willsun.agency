// Cloudflare Pages Function: GA4 Anti-Bot Edge Guard
// Blocks headless bots & datacenter scrapers from polluting GA4 statistics

// Known cloud datacenter ASNs that generate headless bot traffic
// (Alibaba Cloud, Tencent Cloud, DigitalOcean, Vultr, OVH, Hetzner, M247)
const DATACENTER_BOT_ASNS = new Set([
  45102,  // Alibaba Cloud (Singapore / US)
  37963,  // Alibaba Cloud
  132203, // Tencent Cloud (Singapore)
  45090,  // Tencent Cloud
  14061,  // DigitalOcean
  20473,  // Vultr / Choopa
  16276,  // OVH
  24940,  // Hetzner
  9009,   // M247
]);

export async function onRequest(context) {
  const cfAsn = Number(context.request.cf && context.request.cf.asn ? context.request.cf.asn : 0);
  const referer = context.request.headers.get("referer") || "";
  const isSuspiciousDatacenterDirect = DATACENTER_BOT_ASNS.has(cfAsn) && !referer;

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html") && typeof HTMLRewriter !== "undefined") {
    return new HTMLRewriter()
      .on("head", {
        element(el) {
          el.prepend(
            `<script data-cfasync="false">(function(){try{var ua=navigator.userAgent||'';var sw=window.screen?window.screen.width:0;var sh=window.screen?window.screen.height:0;var res=sw+'x'+sh;var bs={'1280x1200':1,'1366x1366':1,'1280x1280':1,'1600x1600':1,'1280x1600':1,'1600x1200':1,'800x600':1};var dc=${isSuspiciousDatacenterDirect ? 'true' : 'false'};var bot=dc||navigator.webdriver===true||/HeadlessChrome|PhantomJS|Playwright|Puppeteer|SlimerJS|CasperJS/i.test(ua)||bs[res]===1||(sw>0&&sw===sh);if(!bot){var c=document.createElement('canvas');var gl=c.getContext('webgl')||c.getContext('experimental-webgl');if(gl){var d=gl.getExtension('WEBGL_debug_renderer_info');if(d&&/SwiftShader|llvmpipe|Software Rasterizer/i.test(gl.getParameter(d.UNMASKED_RENDERER_WEBGL)||''))bot=true;}}if(bot){window['ga-disable-G-1B29WEPTV9']=true;}}catch(_){}})();</script>`,
            { html: true }
          );
        },
      })
      .on("script", {
        element(el) {
          if (!el.hasAttribute("data-cfasync")) {
            el.setAttribute("data-cfasync", "false");
          }
        },
      })
      .transform(response);
  }

  return response;
}
