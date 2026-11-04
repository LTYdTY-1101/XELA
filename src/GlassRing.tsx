import {useId} from 'react';
import {Img,staticFile,useVideoConfig} from 'remotion';
import {motion} from './shared';

// Cleaned supplied materials; a smooth silhouette prevents stray alpha pixels
// from being magnified by the perspective transform. Shadow stays on the floor.
export const GlassRing=({frame:f}:{frame:number})=>{
 const {fps}=useVideoConfig();const id=useId().replace(/:/g,'');
 const reveal=motion(f,8,14,0,1);const t=Math.max(0,f-8);
 const loop=f>=45;const phase=(f-45)/(2*fps)*Math.PI*2;
 const bob=loop?Math.sin(36/19)*9+Math.sin(phase)*10:Math.sin(t/19)*9;
 const ry=loop?7.2+Math.sin(phase)*2:t*.2;
 const rx=loop?Math.sin(36/25)*1.8+(Math.cos(phase)-1)*.7:Math.sin(t/25)*1.8;
 const rz=loop?1.62+Math.sin(phase)*.55:t*.045;
 const shadowScale=loop?1+Math.sin(36/30)*.007+Math.sin(phase)*.004:1+Math.sin(t/30)*.007;
 return <>
  <Img src={staticFile('ending-assets/ring-clean-v2.png')} style={{position:'absolute',width:1,height:1,opacity:0}}/>
  <Img src={staticFile('ending-assets/shadow-clean-v2.png')} style={{position:'absolute',width:1,height:1,opacity:0}}/>
  <div style={{position:'absolute',inset:0,opacity:reveal*.83,scale:shadowScale,transformOrigin:'50% 86%'}}>
   <svg width="1920" height="1080" viewBox="0 0 1672 941" style={{overflow:'visible'}}>
    <defs>
     <radialGradient id={`${id}-shadow-fade`}><stop offset="0" stopColor="white"/><stop offset=".65" stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient>
     <mask id={`${id}-shadow-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1672" height="941"><ellipse cx="774" cy="823" rx="704" ry="152" fill={`url(#${id}-shadow-fade)`}/></mask>
     <filter id={`${id}-shadow-smooth`} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <image href={staticFile('ending-assets/shadow-clean-v2.png')} width="1672" height="941" filter={`url(#${id}-shadow-smooth)`} mask={`url(#${id}-shadow-mask)`}/>
   </svg>
  </div>
  <div style={{position:'absolute',inset:0,opacity:reveal,translate:`0 ${motion(f,8,14,18,0)+bob}px`,transformOrigin:'50% 67%',transform:`perspective(2200px) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg)`}}>
   <svg width="1920" height="1080" viewBox="0 0 1672 941" style={{overflow:'visible'}}>
    <defs>
     <clipPath id={`${id}-ring-edge`}><path clipRule="evenodd" d="M225 699 C221 671 242 644 280 627 C388 564 571 526 700 505 C863 480 1010 470 1200 467 C1372 457 1454 480 1470 531 C1482 548 1485 581 1458 603 C1391 664 1208 718 1000 748 C744 807 418 822 280 761 C244 745 223 724 225 699 Z M274 694 C296 681 323 666 350 653 C459 610 579 573 700 546 C864 517 1021 505 1200 517 C1305 519 1380 528 1404 551 C1369 574 1294 602 1200 627 C1020 668 868 695 700 706 C516 729 357 730 274 694 Z"/></clipPath>
     <filter id={`${id}-ring-smooth`} x="-1%" y="-1%" width="102%" height="102%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation=".48"/></filter>
    </defs>
    <g clipPath={`url(#${id}-ring-edge)`}><image href={staticFile('ending-assets/ring-clean-v2.png')} width="1672" height="941" filter={`url(#${id}-ring-smooth)`}/></g>
   </svg>
  </div>
 </>;
};
