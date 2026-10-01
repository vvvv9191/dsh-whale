// Hand-traced vector artwork based on the user's supplied cartoon reference.
// Artwork source: 小红书号95645761894，画画的阿慢
// Transparent canvas: no paper backdrop, watermark, text, stars, hearts or water
// are baked into the resting whale. Effect layers are exported separately.
export const VIEW_BOX = '180 465 960 960';
const bodyPath = `M270 984
  C266 868 342 751 471 713
  C590 675 694 700 783 751
  C848 790 900 795 903 713
  C905 684 894 661 890 648
  C885 632 899 619 915 620
  C961 611 993 651 997 702
  C1037 693 1078 716 1091 744
  C1105 774 1076 774 1056 777
  C1009 782 983 801 983 847
  C984 1011 916 1121 796 1179
  C685 1233 514 1220 379 1179
  C301 1154 253 1128 250 1073
  C246 1032 255 1008 270 984 Z`;

export function whaleArtwork(prefix = 'little-whale') {
  return `<svg class="whale" xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX}" aria-hidden="true" data-artwork="reference-cartoon">
    <defs>
      <clipPath id="${prefix}-body"><path d="${bodyPath}"/></clipPath>
      <filter id="${prefix}-pencil" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="2" seed="8" result="grain"/>
        <feDisplacementMap in="SourceGraphic" in2="grain" scale="2.8" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <g filter="url(#${prefix}-pencil)">
      <path class="body-fill" d="${bodyPath}" fill="#a4d4de"/>
      <path class="belly" d="M246 1080 C362 1165 567 1174 715 1136 C853 1115 946 1037 989 938 L1041 1300 H230 Z" fill="#fffaf0" clip-path="url(#${prefix}-body)"/>
      <path class="body-outline" d="${bodyPath}" fill="none" stroke="#111315" stroke-width="29" stroke-linejoin="round" stroke-linecap="round"/>
      <ellipse class="cheek" cx="522" cy="1056" rx="43" ry="45" fill="#f8d2df" transform="rotate(-12 522 1056)"/>
      <path class="eye" d="M439 1025 C440 1008 454 998 471 998 C491 998 501 1011 502 1028 C503 1047 489 1058 472 1059 C452 1059 438 1046 439 1025 Z" fill="#111315"/>
      <path class="flipper" d="M603 1150 C615 1200 655 1253 711 1243 C760 1239 803 1211 786 1160 L766 1124" fill="#a4d4de" stroke="#64bed1" stroke-width="23" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

// The reference's three black-outlined, pale-blue drops: left fan, tall centre,
// small right drop. No fountain stream or realistic droplets are added.
export function sprayArtwork() {
  return `<svg class="jet" hidden viewBox="${VIEW_BOX}" aria-hidden="true">
    <g fill="#a4d4de" stroke="#111315" stroke-width="29" stroke-linecap="round" stroke-linejoin="round">
      <path class="water-drop drop-left" d="M320 701 C298 680 314 645 344 622 C380 595 434 602 465 631 C478 643 471 657 455 659 C416 664 381 687 349 711 C337 720 326 713 320 701 Z"/>
      <path class="water-drop drop-centre" d="M519 620 C500 600 498 570 505 540 C512 511 532 486 555 482 C575 479 587 492 586 515 C584 549 559 576 536 598 C528 606 523 614 519 620 Z"/>
      <path class="water-drop drop-right" d="M560 652 C566 631 589 619 612 620 C634 621 650 633 650 647 C650 659 638 666 623 665 C601 662 580 655 560 652 Z"/>
    </g>
  </svg>`;
}

const heart = 'M0 22 C-13 12 -40 -7 -37 -25 C-34 -43 -13 -43 0 -26 C13 -43 34 -43 37 -25 C40 -7 13 12 0 22 Z';
const star = 'M0 -34 Q5 -36 11 -16 L29 -17 Q36 -15 23 0 L29 18 Q29 24 9 18 L-2 34 Q-8 38 -13 16 L-32 11 Q-39 6 -20 -5 L-20 -25 Q-17 -33 -1 -19 Z';

export function charmArtwork() {
  return `<svg class="charms" hidden viewBox="${VIEW_BOX}" aria-hidden="true">
    <g class="charm heart" style="--turn:-12deg" transform="translate(204 906) rotate(-12)"><path d="${heart}" fill="#f49cc8"/></g>
    <g class="charm heart" style="--turn:14deg" transform="translate(1038 1070) rotate(14)"><path d="${heart}" fill="#f49cc8"/></g>
    <g class="charm star" style="--turn:12deg" transform="translate(821 590) rotate(12)"><path d="${star}" fill="#65bed2"/></g>
    <g class="charm star" style="--turn:-10deg" transform="translate(416 1292) rotate(-10) scale(.86)"><path d="${star}" fill="#65bed2"/></g>
  </svg>`;
}
