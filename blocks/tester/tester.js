const loadScript = (url, callback, type) => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = url;
    if (type) {
      script.setAttribute('type', type);
    }
    script.onload = callback;
    head.append(script);
    return script;
  };
  
const getDefaulttester = (url) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
      scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
  </div>`;
  
const testerYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const tester = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  const testerHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://www.youtube.com${vid ? `/tester/${vid}?rel=0&v=${vid}${suffix}` : tester}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
    </div>`;
  return testerHTML;
};
  
const testerVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/');
  const suffix = autoplay ? '?muted=1&autoplay=1' : '';
  const testerHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
      <iframe src="https://player.vimeo.com/video/${video}${suffix}" 
      style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" 
      frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen  
      title="Content from Vimeo" loading="lazy"></iframe>
    </div>`;
  return testerHTML;
};
  
const testerTwitter = (url) => {
  const testerHTML = `<blockquote class="twitter-tweet"><a href="${url.href}"></a></blockquote>`;
  loadScript('https://platform.twitter.com/widgets.js');
  return testerHTML;
};

/* Link is a string of the url the tester is associated with. */
const loadtester = (block, link, autoplay) => {
  console.log("Loading tester");
  if (block.classList.contains('tester-is-loaded')) {
    console.log("is loaded");
    return;
  }

  console.log("successful loading");
  const testerS_CONFIG = [
    {
      match: ['youtube', 'youtu.be'],
      tester: testerYoutube,
    },
    {
      match: ['vimeo'],
      tester: testerVimeo,
    },
    {
      match: ['twitter'],
      tester: testerTwitter,
    },
  ];

  const config = testerS_CONFIG.find((e) => e.match.some((match) => link.includes(match)));
  const url = new URL(link);
  console.log("looking for config");
  if (config) {
    block.innerHTML = config.tester(url, autoplay);
    block.classList = `block tester tester-${config.match[0]}`;
  } else {
    block.innerHTML = getDefaulttester(url);
    block.classList = 'block tester';
  }
  block.classList.add('tester-is-loaded');
};
  
export default function decorate(block) {
  console.log("decorating tester");
  console.log(block);
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a').href; // How do I get the link to have an anchor element?
  block.textContent = '';

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'tester-placeholder';
    wrapper.innerHTML = '<div class="tester-placeholder-play"><button type="button" title="Play"></button></div>';
    wrapper.prepend(placeholder);
    wrapper.addEventListener('click', () => {
      loadtester(block, link, true);

    });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadtester(block, link);
      }
    });
    observer.observe(block);
  }
}