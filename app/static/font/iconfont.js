(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-arrow-up" viewBox="0 0 1024 1024">'+""+'<path d="M511.999488 255.994372 59.557838 708.502419 120.392814 768.004605 511.999488 376.330064 903.606163 768.004605 964.442162 708.502419Z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-arrow-left" viewBox="0 0 1024 1024">'+""+'<path d="M255.985417 512 708.512006 964.423113 768.016629 903.59063 376.32604 512 768.016629 120.40937 708.512006 59.575864Z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-right" viewBox="0 0 1024 1024">'+""+'<path d="M1024 162.4 376.064 883.008l-30.624-30.464 0 0L0 515.68l32.32-31.712L375.68 818.752l616-688.032L1024 162.4z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-add" viewBox="0 0 1024 1024">'+""+'<path d="M512 1008C238.064 1008 16 785.936 16 512S238.064 16 512 16s496 222.064 496 496S785.936 1008 512 1008zM512 78C272.304 78 78 272.304 78 512S272.304 946 512 946 946 751.696 946 512 751.696 78 512 78zM714.096 542.272 542.272 542.272l0 171.824c0 16.72-13.552 30.272-30.272 30.272s-30.272-13.552-30.272-30.272L481.728 542.272 309.904 542.272c-16.72 0-30.272-13.552-30.272-30.272 0-16.72 13.552-30.272 30.272-30.272l171.824 0L481.728 309.904c0-16.72 13.552-30.272 30.272-30.272s30.272 13.552 30.272 30.272l0 171.824 171.824 0c16.72 0 30.272 13.552 30.272 30.272C744.368 528.72 730.816 542.272 714.096 542.272z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-arrow-down" viewBox="0 0 1024 1024">'+""+'<path d="M512.000512 765.451456l447.925682-447.994244-60.22771-58.907645L512.000512 646.315078l-387.700019-387.766534L64.072783 317.457212 512.000512 765.451456zM512.000512 765.451456"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-drop-up" viewBox="0 0 1024 1024">'+""+'<path d="M991.9488 752.0256 512 271.9744 32.0512 752.0256Z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-drop-down" viewBox="0 0 1024 1024">'+""+'<path d="M966.432 285.488l-454.896 453.968-453.968-454.896z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-arrow-right" viewBox="0 0 1024 1024">'+""+'<path d="M333.577866 894.325615l407.806963-382.345058-402.692478-382.307196-56.07718 52.567239 351.730807 329.739956-351.730807 334.556659L333.577866 894.325615 333.577866 894.325615zM333.577866 894.325615"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-edit" viewBox="0 0 1051 1024">'+""+'<path d="M984.373 909.506c0 14.777-12.082 26.766-26.766 26.766h-857.268c-14.777 0-26.766-12.082-26.766-26.766 0-14.777 12.082-26.766 26.766-26.766h857.268c14.684 0 26.766 11.989 26.766 26.766zM171.994 799.932l57.808-208.741 494.992-494.899c22.956-22.956 52.696-22.77 75.466 0l113.199 113.199c22.77 22.77 22.956 52.417 0 75.466l-494.713 495.085-208.926 57.808c-28.811 6.041-43.774-8.922-37.826-37.919zM668.288 228.451l113.199 113.107 75.466-75.466c19.61-19.424 18.309-19.238 0-37.733l-75.466-75.373c-17.844-19.238-19.61-19.238-37.733 0l-75.466 75.466zM309.544 587.195c10.967 10.967 74.537 74.537 113.199 113.199l321.011-321.011-113.199-113.199-321.011 321.011zM229.152 780.693l155.858-42.659-113.199-113.199-42.659 155.858z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)