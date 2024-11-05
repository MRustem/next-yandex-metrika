import Script from 'next/script'

function YandexMetrikaTag({
  yid,
  clickmap = true,
  trackLinks = true,
  accurateTrackBounce = true,
  webvisor = false,
  strategy = 'afterInteractive',
}: {
  yid: number,
  clickmap?: boolean,
  trackLinks?: boolean,
  accurateTrackBounce?: boolean,
  webvisor?: boolean,
  strategy?: 'lazyOnload' | 'afterInteractive' | 'beforeInteractive'
}) {
  return (
    <Script id="yandex-metrika-tag" strategy={strategy}>
      {`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym");

        ym(${yid}, "init", {
            clickmap:${clickmap},
            trackLinks:${trackLinks},
            accurateTrackBounce:${accurateTrackBounce},
            webvisor:${webvisor}
        });
      `}
    </Script>
  );
}

function YandexMetrikaPixel({ yid }: { yid: number }) {
  const src = `https://mc.yandex.ru/watch/${yid}`;

  /* eslint-disable @next/next/no-img-element */
  return (
    <noscript id="yandex-metrika-pixel">
      <div>
        <img
          src={src}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}

export function YandexMetrika({
  yid,
  clickmap = true,
  trackLinks = true,
  accurateTrackBounce = true,
  webvisor = false,
}: {
  yid: number,
  clickmap?: boolean,
  trackLinks?: boolean,
  accurateTrackBounce?: boolean,
  webvisor?: boolean,
}) {
  return (
    <>
      <YandexMetrikaTag
        yid={yid}
        clickmap={clickmap}
        trackLinks={trackLinks}
        accurateTrackBounce={accurateTrackBounce}
        webvisor={webvisor}
      />
      <YandexMetrikaPixel yid={yid} />
    </>
  );
}
