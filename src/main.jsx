import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toeyPhoto from '../IMG_9992.JPG';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const stars = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 94}%`,
  delay: `${(i % 8) * -0.43}s`,
  size: `${2 + (i % 3)}px`,
}));

const confettiColors = ['#ffbdce', '#f7dd8a', '#bca7ff', '#9de4d0', '#fff7e7'];

function CakeScene() {
  const sectionRef = useRef(null);
  const cakeRef = useRef(null);
  const flameRef = useRef(null);
  const smokeRef = useRef(null);
  const hintRef = useRef(null);
  const stepRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(flameRef.current, { scale: 0, opacity: 0, transformOrigin: '50% 100%' });
      gsap.set(smokeRef.current.children, { opacity: 0, y: 8, scale: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            stepRef.current.textContent = p < 0.26 ? 'หมุนดูรอบ ๆ ก่อน' : p < 0.5 ? 'มีอะไรบางอย่างกำลังสว่างขึ้น' : p < 0.71 ? 'อธิษฐานได้เลยนะ' : p < 0.87 ? 'ฟู่—' : 'พร้อมไปต่อแล้ว';
          },
        },
      });

      tl.to(hintRef.current, { opacity: 0, y: -18, duration: 0.08 }, 0.02)
        .to(cakeRef.current, { rotateY: 360, rotateZ: 1.5, duration: 0.28, ease: 'none' }, 0.06)
        .to(cakeRef.current, { rotateY: 720, rotateZ: 0, duration: 0.18, ease: 'power1.inOut' }, 0.30)
        .to('.cake-shadow', { scaleX: 0.76, opacity: 0.32, duration: 0.18, yoyo: true, repeat: 1 }, 0.25)
        .to(flameRef.current, { scale: 1, opacity: 1, duration: 0.08, ease: 'back.out(2)' }, 0.48)
        .to('.candle-glow', { opacity: 0.9, scale: 1, duration: 0.08 }, 0.48)
        .to(flameRef.current, { scaleX: 0.72, x: 5, duration: 0.035, yoyo: true, repeat: 3 }, 0.59)
        .to(flameRef.current, { scale: 0, opacity: 0, x: 16, duration: 0.05, ease: 'power2.in' }, 0.71)
        .to('.candle-glow', { opacity: 0, scale: 0.75, duration: 0.05 }, 0.71)
        .to(smokeRef.current.children, { opacity: 0.72, y: -65, x: (i) => (i - 1) * 13, scale: 1.4, stagger: 0.025, duration: 0.12 }, 0.74)
        .to(smokeRef.current.children, { opacity: 0, y: -110, scale: 2, stagger: 0.02, duration: 0.1 }, 0.86)
        .to('.cake-wrap', { y: -24, scale: 0.92, opacity: 0.25, duration: 0.12 }, 0.88);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="cake-story" ref={sectionRef}>
      <div className="cake-sticky">
        <div className="stars" aria-hidden="true">
          {stars.map((s, i) => <i key={i} style={{ left: s.left, top: s.top, animationDelay: s.delay, width: s.size, height: s.size }} />)}
        </div>
        <div className="shooting-stars" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <i
              key={i}
              style={{
                '--shoot-x': `${8 + ((i * 29) % 82)}%`,
                '--shoot-y': `${5 + ((i * 17) % 48)}%`,
                '--shoot-delay': `${i * 2.35 + (i % 2) * 1.1}s`,
                '--shoot-size': `${80 + (i % 3) * 34}px`,
              }}
            />
          ))}
        </div>
        <div className="opening-copy">
          <p>09 · 08 · วันนี้ของมะหมี่</p>
          <h1>มีอะไรจะให้ดู<br /><em>เลื่อนลงช้า ๆ นะ</em></h1>
        </div>

        <div className="cake-wrap">
          <div className="cake" ref={cakeRef}>
            <div className="candle-glow" />
            <div className="smoke" ref={smokeRef} aria-hidden="true"><i /><i /><i /></div>
            <div className="flame" ref={flameRef}><span /></div>
            <div className="candle"><i /><i /><i /></div>
            <div className="cream cream-1" /><div className="cream cream-2" /><div className="cream cream-3" />
            <div className="cake-top"><span className="berry b1" /><span className="berry b2" /><span className="berry b3" /><span className="berry b4" /></div>
            <div className="cake-side"><span /><span /><span /></div>
            <div className="plate" />
          </div>
          <div className="cake-shadow" />
        </div>

        <div className="scroll-hint" ref={hintRef}><span>เลื่อนเพื่อเริ่ม</span><i /></div>
        <div className="scene-step" ref={stepRef}>หมุนดูรอบ ๆ ก่อน</div>
      </div>
    </section>
  );
}

const chapters = [
  { n: '01', small: 'เอ๊ะ เดี๋ยวก่อนนะ', text: <>วันนี้วันเกิดแก<br /><span className="accent-text">ชะม้ายยยย</span></> },
  { n: '02', small: 'งั้นต้องพูดดัง ๆ แล้ว', text: <>แฮปปี้เบิ้ดเดนะคับ<br /><span className="name-correction" aria-label="บะหมี่ เอ้ยย มะหมี่"><span className="wrong-name">บะหมี่</span><span className="oops-name">เอ้ยย!</span><span className="correct-name">มะหมี่</span><i className="typing-cursor" /></span></> },
  { n: '03', small: 'ถึงวันนี้จะเงียบไปนิด', text: <>แกหายไป<br /><span className="accent-text">นานเยยยย</span></> },
  { n: '04', small: 'แต่อยากให้รู้ไว้นะ', text: <>มีความสุขมาก ๆ<br />ยิ้มเยอะ ๆ <span className="accent-text">กว้าง ๆ เลยนะ</span></> },
];

function MessageStory() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 650px)').matches;
      gsap.utils.toArray('.chapter').forEach((el) => {
        gsap.fromTo(el.querySelectorAll('.chapter-no, .eyebrow, h2'),
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: isMobile ? 0.07 : 0.12,
            duration: isMobile ? 0.58 : 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: isMobile ? 'top 94%' : 'top 72%',
              end: isMobile ? undefined : 'top 35%',
              scrub: isMobile ? false : 0.7,
              toggleActions: isMobile ? 'play none none reverse' : undefined,
              fastScrollEnd: true,
            },
          });
      });
      const nameStage = ref.current.querySelector('.name-correction');
      const wrongName = nameStage.querySelector('.wrong-name');
      const oopsName = nameStage.querySelector('.oops-name');
      const correctName = nameStage.querySelector('.correct-name');
      const cursor = nameStage.querySelector('.typing-cursor');
      const nameChapter = nameStage.closest('.chapter');
      const wrongWidth = wrongName.scrollWidth;
      const correctWidth = correctName.scrollWidth;

      gsap.set(wrongName, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
      gsap.set(oopsName, { opacity: 0, scale: 0.55, rotate: -9, y: 18 });
      gsap.set(correctName, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
      gsap.set(cursor, { x: 0, opacity: 0 });
      const nameTimeline = gsap.timeline({ paused: true })
        .set(wrongName, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
        .set(oopsName, { opacity: 0, scale: 0.55, rotate: -9, y: 18 })
        .set(correctName, { clipPath: 'inset(0 100% 0 0)', opacity: 0 })
        .set(cursor, { x: 0, opacity: 0 })
        .set(cursor, { opacity: 1 })
        .to(wrongName, { clipPath: 'inset(0 0% 0 0)', duration: 0.85, ease: 'steps(4)' })
        .to(cursor, { x: wrongWidth, duration: 0.85, ease: 'steps(4)' }, '<')
        .to({}, { duration: 0.7 })
        .to(wrongName, { clipPath: 'inset(0 100% 0 0)', duration: 0.62, ease: 'steps(4)' })
        .to(cursor, { x: 0, duration: 0.62, ease: 'steps(4)' }, '<')
        .set(wrongName, { opacity: 0 })
        .set(cursor, { opacity: 0 })
        .to(oopsName, { opacity: 1, scale: 1, rotate: 3, y: 0, duration: 0.42, ease: 'back.out(2.4)' })
        .to({}, { duration: 0.65 })
        .to(oopsName, { opacity: 0, scale: 0.72, rotate: 8, y: -14, duration: 0.28, ease: 'power2.in' })
        .set(correctName, { opacity: 1 })
        .set(cursor, { opacity: 1 })
        .to(correctName, { clipPath: 'inset(0 0% 0 0)', duration: 1.05, ease: 'steps(6)' })
        .to(cursor, { x: correctWidth, duration: 1.05, ease: 'steps(6)' }, '<')
        .to(cursor, { opacity: 0, duration: 0.25, repeat: 3, yoyo: true })
        .set(cursor, { opacity: 0 });

      ScrollTrigger.create({
        trigger: nameChapter,
        start: isMobile ? 'top 82%' : 'top 58%',
        onEnter: () => nameTimeline.restart(),
        onEnterBack: () => nameTimeline.restart(),
        onLeaveBack: () => nameTimeline.pause(0),
      });
      gsap.utils.toArray('.paper-line').forEach((el, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const wave = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: isMobile ? 'top 96%' : 'top 96%',
            end: isMobile ? undefined : 'top 48%',
            scrub: isMobile ? false : 1.15,
            toggleActions: isMobile ? 'play none none reverse' : undefined,
            fastScrollEnd: true,
          },
        });
        wave
          .fromTo(el,
            {
              opacity: 0.04,
              x: `${direction * 13}vw`,
              y: 105,
              rotate: direction * 4.5,
              scale: 0.93,
              filter: 'blur(10px)',
            },
            {
              opacity: 0.7,
              x: `${direction * -3.5}vw`,
              y: 38,
              rotate: direction * -1.8,
              scale: 0.98,
              filter: 'blur(3px)',
              duration: isMobile ? 0.3 : 0.58,
              ease: 'sine.inOut',
            })
          .to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: isMobile ? 0.26 : 0.42,
            ease: 'sine.out',
          });
      });

      gsap.to('.promise-orbit', {
        rotation: 360,
        duration: 22,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      });

      gsap.timeline({ repeat: -1, repeatDelay: 0.28 })
        .to('.anatomy-heart', { scale: 1.13, rotation: 0, duration: 0.12, ease: 'power2.out' })
        .to('.anatomy-heart', { scale: 1.01, rotation: -2, duration: 0.1, ease: 'power2.in' })
        .to('.anatomy-heart', { scale: 1.08, rotation: 0, duration: 0.1, ease: 'power2.out' })
        .to('.anatomy-heart', { scale: 1, rotation: -2, duration: 0.2, ease: 'power2.inOut' })
        .to({}, { duration: 0.45 });

      gsap.timeline({ repeat: -1, repeatDelay: 0.27 })
        .fromTo('.heart-pulse',
          { opacity: 0, scale: 0.65 },
          { opacity: 0.65, scale: 1.05, duration: 0.18, ease: 'power1.out' })
        .to('.heart-pulse', { opacity: 0, scale: 2.15, duration: 0.55, ease: 'power2.out' })
        .to({}, { duration: 0.34 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <main className="message-story" ref={ref}>
      {chapters.map((c) => (
        <section className="chapter" key={c.n}>
          <div className="chapter-inner">
            <span className="chapter-no">{c.n}</span>
            <p className="eyebrow">{c.small}</p>
            <h2>{c.text}</h2>
          </div>
        </section>
      ))}
      <section className="letter-section">
        <div className="letter-stamp">ถึง<br />มะหมี่</div>
        <p className="letter-date">a little note for your new chapter</p>
        <div className="letter-copy">
          <p className="paper-line">เค้าไม่อวยพร</p>
          <p className="paper-line">เพราะการอวยพร<br />ไม่ช่วยอาราย</p>
          <p className="paper-line accent">เค้าจะให้กำลังใจ</p>
          <p className="paper-line">ที่ผ่านมาแกเก่งมาก</p>
          <p className="paper-line">ไม่ว่าแกจะเคยเจอ<br />เรื่องอะไรมา</p>
          <p className="paper-line accent">เค้าเปนกลจหั้ยนะ</p>
          <p className="paper-line">แล้วก็หลังจากนี้ด้วยยย</p>
        </div>
      </section>
      <section className="promise">
        <div className="promise-orbit"><span>always here · always here · </span></div>
        <p>หลังจากนี้ถ้ามีอาราย</p>
        <h2>ทักมาได้<br /><em>จาเม๋อเลยหนา</em></h2>
        <div className="anatomy-heart" aria-hidden="true">
          <span className="heart-pulse" />
          <svg viewBox="0 0 220 250" role="presentation">
            <defs>
              <linearGradient id="heartBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff9ab1" />
                <stop offset=".48" stopColor="#dc5f7e" />
                <stop offset="1" stopColor="#8e294d" />
              </linearGradient>
              <linearGradient id="heartShade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#7e294c" />
                <stop offset="1" stopColor="#c95071" />
              </linearGradient>
              <filter id="heartGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#030105" floodOpacity=".42" />
              </filter>
            </defs>
            <g filter="url(#heartGlow)">
              <path className="vessel vessel-back" d="M116 76 C115 48 112 31 103 14 L126 9 C134 32 133 53 132 76" />
              <path className="vessel vessel-blue" d="M92 80 C79 53 72 36 75 17 L95 23 C92 44 100 57 106 75" />
              <path className="vessel vessel-red" d="M126 75 C139 50 149 36 169 29 C171 38 173 43 177 49 C157 58 151 68 146 87" />
              <path className="vessel vessel-blue small" d="M78 91 C57 76 43 65 32 48" />
              <path className="vessel vessel-red small" d="M145 91 C166 78 181 68 195 51" />
              <path className="heart-body" d="M110 66 C83 44 48 55 38 89 C25 133 57 179 105 226 C112 233 118 231 124 221 C151 179 190 151 184 105 C180 73 153 55 128 68 C121 72 116 76 110 66 Z" />
              <path className="heart-lobe" d="M110 68 C104 87 105 104 115 121 C125 104 137 91 157 82 C148 61 124 55 110 68 Z" />
              <path className="heart-highlight" d="M66 78 C49 96 54 130 69 150" />
              <path className="heart-line" d="M111 78 C108 110 119 132 124 158 C128 181 119 205 111 222" />
              <path className="heart-line thin" d="M65 117 C84 118 99 130 107 149" />
              <path className="heart-line thin" d="M121 140 C141 126 159 123 176 128" />
            </g>
          </svg>
        </div>
      </section>
    </main>
  );
}

function Finale() {
  const [celebrating, setCelebrating] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const celebrate = () => {
    setCelebrating(false);
    setGiftOpen(false);
    requestAnimationFrame(() => {
      setCelebrating(true);
      setGiftOpen(true);
    });
    window.setTimeout(() => setCelebrating(false), 3600);
  };
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setGiftOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  useEffect(() => {
    if (!giftOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [giftOpen]);
  return (
    <section className={`finale ${celebrating ? 'celebrating' : ''}`}>
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 70 }, (_, i) => <i key={i} style={{ '--x': `${(i * 47) % 100}vw`, '--r': `${(i * 113) % 540}deg`, '--d': `${(i % 9) * 0.08}s`, '--c': confettiColors[i % confettiColors.length] }} />)}
      </div>
      <p>and one more time...</p>
      <h2>แฮป ๆ คับบบ<br /><span className="finale-name">เค้าขอบคุณแกด้วยหนาาา</span></h2>
      <button onClick={celebrate} type="button"><span>กดตรงนี้</span><i>🎁</i></button>
      <small>ขอให้ทุกวันหลังจากนี้เป็นวันที่ดี โลกใจดีกับแก</small>
      <div className={`gift-surprise ${giftOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!giftOpen} aria-label="ของขวัญวันเกิด">
        <button className="gift-backdrop" type="button" onClick={() => setGiftOpen(false)} aria-label="ปิดของขวัญ" />
        <div className="gift-stage">
          <div className="gift-rays" aria-hidden="true" />
          <div className="photo-card">
            <div className="photo-frame"><img src={toeyPhoto} alt="น้องเต้ยตอนสามขวบ" /></div>
            <p>พาน้องเต้ยๆฉามขวบ<br />มาแฮปด้วย</p>
            <span>happy birthday, มะหมี่!</span>
          </div>
          <div className="gift-box" aria-hidden="true">
            <div className="gift-lid"><i /></div>
            <div className="gift-base"><i /></div>
          </div>
          <button className="gift-close" type="button" onClick={() => setGiftOpen(false)} aria-label="ปิด">×</button>
        </div>
      </div>
    </section>
  );
}

function ScrollAtmosphere() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8,
          },
        });

        tl.to('.ambient-orb.one', { x: '72vw', y: '55vh', scale: 1.45, rotation: 160, duration: 1 }, 0)
          .to('.ambient-orb.two', { x: '-65vw', y: '-42vh', scale: 0.72, rotation: -190, duration: 1 }, 0)
          .to('.ambient-orb.three', { x: '38vw', y: '-120vh', scale: 1.6, rotation: 230, duration: 1 }, 0)
          .to('.ambient-ribbon', { rotation: 155, scale: 1.45, x: '14vw', y: '-18vh', duration: 1 }, 0)
          .to('.ambient-dust i', { y: (i) => `${-30 - (i % 6) * 18}vh`, x: (i) => `${(i % 2 ? 1 : -1) * (12 + (i % 5) * 5)}vw`, rotation: (i) => i * 47, stagger: 0.012, duration: 1 }, 0)
          .to(ref.current, { filter: 'hue-rotate(42deg)', duration: 0.42 }, 0.24)
          .to(ref.current, { filter: 'hue-rotate(-24deg)', duration: 0.35 }, 0.62)
          .to(ref.current, { filter: 'hue-rotate(12deg)', duration: 0.23 }, 0.82);
      });
      return () => media.revert();
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-atmosphere" ref={ref} aria-hidden="true">
      <i className="ambient-orb one" />
      <i className="ambient-orb two" />
      <i className="ambient-orb three" />
      <i className="ambient-ribbon" />
      <div className="ambient-dust">
        {Array.from({ length: 22 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 43 + 7) % 100}%`, top: `${(i * 31 + 13) % 100}%`, '--dust-size': `${3 + (i % 4) * 2}px` }} />
        ))}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 650px)').matches;
    const targets = gsap.utils.toArray([
      '.promise > p',
      '.promise h2',
      '.finale > p',
      '.finale h2',
      '.finale small',
    ].join(','));

    const ctx = gsap.context(() => {
      targets.forEach((element, index) => {
        const isFinalNote = element.matches('.finale small');
        const playImmediately = isMobile || isFinalNote;
        gsap.fromTo(element,
          {
            y: isFinalNote ? 24 : 72,
            scale: isFinalNote ? 0.96 : 0.92,
            rotateX: isFinalNote ? 0 : (index % 2 ? 12 : -12),
            opacity: 0,
            filter: 'blur(9px)',
            transformOrigin: '50% 100%',
          },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: isMobile ? 0.58 : (isFinalNote ? 0.85 : 1),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: playImmediately ? 'top 97%' : 'top 88%',
              end: playImmediately ? undefined : 'top 60%',
              scrub: playImmediately ? false : 0.65,
              toggleActions: playImmediately ? 'play none none reverse' : undefined,
              fastScrollEnd: true,
            },
          });
      });
    });

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, []);
  return <><ScrollAtmosphere /><div className="cursor-glow" /><CakeScene /><MessageStory /><Finale /></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
