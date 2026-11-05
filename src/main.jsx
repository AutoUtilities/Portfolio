import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import {
  ArrowUpRight,
  Code2,
  Mail,
  Download,
  Workflow,
  Cpu,
  Check,
  Play,
  Terminal,
  Menu,
  X,
  ChevronDown,
  Braces,
  Bot,
  GitBranch,
  FileCheck2,
  Activity
} from 'lucide-react';
import './style.css';

const skills = [
  { title: 'UI Automation', icon: <Code2 size={19}/>, list: ['Python', 'Playwright', 'Pytest', 'Selenium', 'TestNG', 'BDD / Cucumber'] },
  { title: 'API & Engineering', icon: <Workflow size={19}/>, list: ['Java', 'TypeScript', 'REST Assured', 'Postman', 'SQL', 'Maven'] },
  { title: 'AI & Delivery', icon: <Cpu size={19}/>, list: ['AI Agents', 'LLM Integration', 'MCP', 'Docker', 'GitHub Actions', 'Azure'] },
];
const projects = [
  { num:'01', title:'QA-Agent', category:'AI · QA Developer Tooling', description:'An AI-powered QA assistant that analyzes repositories, understands framework architecture, builds a project knowledge base, and helps generate test scenarios and automation code.', tags:['Python','LLM','Agent Architecture','Code Analysis'] },
  { num:'02', title:'ResulPy Automation', category:'Enterprise · UI Automation', description:'Modernized a large automation ecosystem from Java to Python using Playwright, Pytest, and BDD—built for maintainability, parallel execution, and actionable reporting.', tags:['Playwright','Pytest','Cucumber','Azure'] },
  { num:'03', title:'Campaign Analytics Validator', category:'API + UI Â· End-to-End QA', description:'Generates mock delivery and read-receipt events, transfers XML over SFTP, and validates campaign analytics across the application.', tags:['Python','API Testing','XML','SFTP'] },
  { num:'04', title:'CareerPilot AI', category:'AI · Productivity', description:'An AI career assistant concept designed to simplify job-search workflows through intelligent guidance and task automation.', tags:['AI Agents','FastAPI','Automation'] },
];
const journey = [
  { label:'Plan', sub:'Test scenarios', icon:<FileCheck2/> },
  { label:'Author', sub:'Automation code', icon:<Braces/> },
  { label:'Execute', sub:'Browser + API', icon:<Play/> },
  { label:'Validate', sub:'Assertions', icon:<Check/> },
  { label:'Report', sub:'Insights', icon:<Activity/> },
];

function AutomationScene(){
  const host=useRef(null);
  useEffect(()=>{
    const el=host.current; if(!el) return;
    let renderer;
    try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));
    renderer.setSize(el.clientWidth,el.clientHeight); renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.15;
    el.appendChild(renderer.domElement);
    const scene=new THREE.Scene(); scene.fog=new THREE.Fog(0xffffff,12,28);
    const camera=new THREE.PerspectiveCamera(34,el.clientWidth/el.clientHeight,.1,100); camera.position.set(0,0,12.4);
    const root=new THREE.Group(); scene.add(root);
    const mat=(color,roughness=.48,metalness=.12)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
    const white=mat(0xfafafa,.34,.12), silver=mat(0xbfc1c3,.28,.42), dark=mat(0x17191b,.32,.16), screen=mat(0x242629,.22,.12), glass=mat(0xdfe1e2,.25,.15), accentBlue=mat(0x5e7891,.38,.18), accentGreen=mat(0x6f8777,.4,.12);
    const box=(w,h,d,m,x,y,z,group=root)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
    // Floating laptop / code editor
    const laptop=new THREE.Group(); laptop.position.set(.15,-.1,.1); laptop.rotation.y=-.12; laptop.rotation.x=.06; root.add(laptop);
    box(3.75,2.35,.12,dark,0,0,0,laptop); box(3.52,2.12,.025,screen,0,.02,.071,laptop);
    box(3.92,.12,.62,silver,0,-1.26,.16,laptop); box(1.15,.025,.3,glass,0,-1.205,.13,laptop);
    // code lines represented as neutral editor strokes
    const lineMat=mat(0x9b9d9f,.5,0); const bright=mat(0xe9e9e9,.35,0); const dim=mat(0x66696b,.6,0);
    for(let i=0;i<8;i++){const y=.72-i*.22; box(1.55+(i%3)*.27,.035,.012,i%3===0?bright:lineMat,-.45,y,.09,laptop);box(.35,.025,.012,dim,-1.38,y,.09,laptop);}
    // Floating browser panel with checkbox rows
    const browser=new THREE.Group(); browser.position.set(-3.05,.78,.4); browser.rotation.y=.22; browser.rotation.z=.035; root.add(browser);
    box(1.72,1.62,.09,white,0,0,0,browser); box(1.58,1.46,.025,glass,0,-.015,.055,browser); box(1.58,.19,.035,silver,0,.62,.075,browser);
    const browserChecks=[];
    for(let i=0;i<4;i++){const y=.32-i*.23;box(.95,.06,.015,white,-.12,y,.08,browser);box(.09,.09,.016,i<3?dark:silver,-.58,y,.09,browser);if(i<3){const mark=new THREE.Shape();mark.moveTo(-.025,0);mark.lineTo(-.008,-.02);mark.lineTo(.032,.025);mark.lineTo(.018,.04);mark.lineTo(-.008,.01);mark.lineTo(-.014,.016);mark.closePath();const check=new THREE.Mesh(new THREE.ShapeGeometry(mark),new THREE.MeshBasicMaterial({color:0x6f8777,side:THREE.DoubleSide}));check.position.set(-.58,y,.102);check.scale.setScalar(.001);browser.add(check);browserChecks.push(check);}}
    const pointerShape=new THREE.Shape();pointerShape.moveTo(0,0);pointerShape.lineTo(0,.3);pointerShape.lineTo(.075,.22);pointerShape.lineTo(.12,.32);pointerShape.lineTo(.16,.30);pointerShape.lineTo(.115,.205);pointerShape.lineTo(.23,.19);pointerShape.closePath();
    const testCursor=new THREE.Mesh(new THREE.ShapeGeometry(pointerShape),new THREE.MeshBasicMaterial({color:0x17191b,side:THREE.DoubleSide}));testCursor.position.set(.48,-.45,.12);browser.add(testCursor);
    const clickRipple=new THREE.Mesh(new THREE.TorusGeometry(.055,.009,6,24),dark);clickRipple.position.set(.58,-.5,.115);clickRipple.scale.setScalar(.01);browser.add(clickRipple);
    const agentRoutes=[
      [[-3.65,.72,.85],[-3.1,.28,.85],[-1.5,.38,.85],[.05,.15,.85],[1.7,.45,.85],[2.95,.7,.85],[3.5,-.72,.85]],
      [[-.75,.75,1],[.1,.32,1],[.95,-.52,1],[2.8,.45,1],[3.45,-.9,1],[-2.75,-.2,1]],
      [[3.05,1.25,1.1],[2.55,.3,1.1],[.75,-.7,1.1],[-2.8,.55,1.1],[-3.4,-.28,1.1],[.3,-.25,1.1]],
    ].map(route=>route.map(([x,y,z])=>new THREE.Vector3(x,y,z)));
    const automationAgents=agentRoutes.map((route,i)=>{const pointer=new THREE.Mesh(new THREE.ShapeGeometry(pointerShape),new THREE.MeshBasicMaterial({color:[0x17191b,0x66696b,0x9b9d9f][i],side:THREE.DoubleSide}));pointer.scale.setScalar(i===0?1:.78);root.add(pointer);const ripple=new THREE.Mesh(new THREE.TorusGeometry(.065,.009,6,24),new THREE.MeshBasicMaterial({color:[0x17191b,0x66696b,0x9b9d9f][i],transparent:true,opacity:.65}));root.add(ripple);return{pointer,ripple,route};});
    // execution status card
    const status=new THREE.Group(); status.position.set(2.95,.95,.45); status.rotation.y=-.24; root.add(status);
    box(1.8,1.58,.1,white,0,0,0,status); box(1.64,1.42,.025,glass,0,0,.06,status); box(1.64,.22,.035,silver,0,.58,.08,status);
    for(let i=0;i<4;i++){box(.9,.055,.015,white,-.05,.28-i*.22,.08,status);box(.09,.09,.016,dark,-.58,.28-i*.22,.09,status);}
    // report card with donut-like progress ring
    const report=new THREE.Group(); report.position.set(3.75,-.85,.55); report.rotation.y=-.25; report.rotation.z=-.035; root.add(report);
    box(1.65,1.18,.1,white,0,0,0,report); box(1.48,1.02,.025,glass,0,0,.06,report);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.29,.055,10,64),dark); ring.position.set(-.32,.08,.11); report.add(ring);
    const arc=new THREE.Mesh(new THREE.TorusGeometry(.29,.055,10,48,Math.PI*1.85),silver); arc.position.set(-.32,.08,.13); arc.rotation.z=-Math.PI/2; report.add(arc);
    for(let i=0;i<3;i++)box(.36,.07,.012,dim,.42,.22-i*.18,.08,report);
    // pipeline connector / floating nodes
    const points=[new THREE.Vector3(-3.6,-1.38,.2),new THREE.Vector3(-2.05,-1.38,.2),new THREE.Vector3(-.45,-1.38,.2),new THREE.Vector3(1.15,-1.38,.2),new THREE.Vector3(2.6,-1.38,.2)];
    const flowCurve=new THREE.CatmullRomCurve3(points);const tube=new THREE.Mesh(new THREE.TubeGeometry(flowCurve,80,.018,6,false),silver); root.add(tube);
    const flowPackets=[];for(let i=0;i<3;i++){const packet=new THREE.Mesh(new THREE.SphereGeometry(.065,16,16),[accentBlue,accentGreen,dark][i]);root.add(packet);flowPackets.push(packet);}
    const nodes=[]; points.forEach((p,i)=>{const n=new THREE.Mesh(new THREE.SphereGeometry(.095,16,16),i===4?dark:white);n.position.copy(p);root.add(n);nodes.push(n);});
    // Slow orbit gives the workflow a clear 3D focal point without adding color or clutter.
    const orbit=new THREE.Group();orbit.position.set(.1,.05,-.45);root.add(orbit);
    const orbitRing=new THREE.Mesh(new THREE.TorusGeometry(2.55,.012,8,120),accentBlue);orbitRing.rotation.set(1.02,.12,.15);orbit.add(orbitRing);
    const orbiters=[];
    for(let i=0;i<3;i++){const orbiter=new THREE.Mesh(new THREE.SphereGeometry(i===0?.105:.075,20,20),[dark,accentBlue,accentGreen][i]);orbit.add(orbiter);orbiters.push(orbiter);}
    const wireCube=new THREE.Mesh(new THREE.BoxGeometry(.48,.48,.48),new THREE.MeshBasicMaterial({color:0x747678,wireframe:true}));wireCube.position.set(2.15,1.95,.15);root.add(wireCube);
    // subtle orbiting test event particles
    const particleGeo=new THREE.BufferGeometry(); const count=85; const positions=new Float32Array(count*3);
    for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*10;positions[i*3+1]=(Math.random()-.5)*5;positions[i*3+2]=(Math.random()-.5)*2.5;}
    particleGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const dust=new THREE.Points(particleGeo,new THREE.PointsMaterial({color:0x9b9d9f,size:.025,transparent:true,opacity:.45}));scene.add(dust);
    scene.add(new THREE.HemisphereLight(0xffffff,0x9b9b9b,2.0));const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-4,6,8);scene.add(key);const fill=new THREE.PointLight(0xffffff,18);fill.position.set(4,-2,5);scene.add(fill);
    let frame;const clock=new THREE.Clock();
    const animate=()=>{frame=requestAnimationFrame(animate);const t=clock.getElapsedTime();laptop.position.y=-.1+Math.sin(t*.6)*.085;laptop.rotation.y=-.12+Math.sin(t*.25)*.06;browser.position.y=.78+Math.sin(t*.75+1)*.12;browser.rotation.z=.035+Math.sin(t*.45)*.018;status.position.y=.95+Math.sin(t*.65+2)*.11;status.rotation.z=Math.sin(t*.38+1)*.018;report.position.y=-.85+Math.sin(t*.8+3)*.1;report.rotation.y=-.25+Math.sin(t*.35)*.055;nodes.forEach((n,i)=>{n.scale.setScalar(1+(.18*Math.sin(t*2.2-i*.7)));});orbiters.forEach((orbiter,i)=>{const a=t*(.45+i*.1)+i*Math.PI*2/3;orbiter.position.set(Math.cos(a)*2.55,Math.sin(a)*1.42,Math.sin(a*1.4)*.42);});const run=t%6;browserChecks.forEach((check,i)=>{const reveal=Math.max(0,Math.min(1,(run-.9-i*.85)/.28));check.scale.setScalar(reveal);});const cursorPhase=run/6;const cursorPoints=[[-.48,.34],[-.35,.11],[-.56,-.12],[-.12,-.35],[.5,-.48]];const cursorStep=cursorPhase*(cursorPoints.length-1);const cursorIndex=Math.floor(cursorStep);const cursorMix=cursorStep-cursorIndex;const cursorFrom=cursorPoints[cursorIndex];const cursorTo=cursorPoints[Math.min(cursorIndex+1,cursorPoints.length-1)];testCursor.position.x=cursorFrom[0]+(cursorTo[0]-cursorFrom[0])*cursorMix;testCursor.position.y=cursorFrom[1]+(cursorTo[1]-cursorFrom[1])*cursorMix;const clickPulse=Math.max(0,1-Math.abs((run%1)-.72)*3.2);clickRipple.position.set(testCursor.position.x+.08,testCursor.position.y-.07,.115);clickRipple.scale.setScalar(.15+clickPulse*2.1);clickRipple.material.opacity=.75-clickPulse*.35;automationAgents.forEach((agent,i)=>{const progress=(t*.12+i*.21)%1;const segment=progress*(agent.route.length-1);const from=agent.route[Math.floor(segment)];const to=agent.route[Math.min(Math.floor(segment)+1,agent.route.length-1)];const mix=segment-Math.floor(segment);agent.pointer.position.lerpVectors(from,to,mix);agent.pointer.rotation.z=Math.sin(t*2+i)*.045;const click=Math.max(0,1-Math.abs(segment-Math.round(segment))*5);agent.ripple.position.copy(agent.pointer.position);agent.ripple.scale.setScalar(.25+click*1.8);agent.ripple.material.opacity=.3+click*.55;});flowPackets.forEach((packet,i)=>{const progress=(t*.16+i/flowPackets.length)%1;packet.position.copy(flowCurve.getPointAt(progress));packet.scale.setScalar(.8+.3*Math.sin(t*5-i));});orbit.rotation.y=t*.12;wireCube.rotation.set(t*.35,t*.55,t*.22);wireCube.position.y=1.95+Math.sin(t*.8)*.16;dust.rotation.y=t*.028;renderer.render(scene,camera);};animate();
    const resize=()=>{if(!el.clientWidth||!el.clientHeight)return;camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight);};window.addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose();});renderer.dispose();if(renderer.domElement.parentNode===el)el.removeChild(renderer.domElement);};
  },[]);
  return <div className="three-stage" ref={host} aria-label="Animated 3D software testing workflow: browser automation, code editor, test execution, and report"/>;
}
function QAOverlay(){return <div className="qa-hud" aria-label="Animated Playwright test run showing browser checks and results"><div className="hud-top"><span><i className="hud-pulse"/> PLAYWRIGHT RUN</span><span className="hud-live">LIVE</span></div><div className="hud-parallel"><span>3 PARALLEL AGENTS</span><i>● ● ●</i></div><div className="hud-command"><Terminal size={13}/><span>npx playwright test</span><b className="hud-caret">_</b></div><div className="hud-progress"><span/></div><div className="hud-checks"><div><span className="hud-check"><Check size={11}/></span><span>Login flow</span><small>PASS</small></div><div><span className="hud-check"><Check size={11}/></span><span>API response</span><small>PASS</small></div><div><span className="hud-check"><Check size={11}/></span><span>Checkout</span><small>PASS</small></div></div><div className="hud-summary"><strong>12 / 12</strong><span>ASSERTIONS PASSED</span></div></div>}
function AutomationTour(){
  const [runId,setRunId]=useState(0);const [paused,setPaused]=useState(false);const [step,setStep]=useState(-1);const [state,setState]=useState('Starting browser');const [finished,setFinished]=useState(false);const [pointers,setPointers]=useState([{x:-80,y:-80},{x:-80,y:-80},{x:-80,y:-80}]);const [clicking,setClicking]=useState(false);const pausedRef=useRef(false);const manualRunRef=useRef(false);
  const tourSteps=[
    {label:'About',link:'header a[href="#about"]',probe:'#about h2'},
    {label:'Skills',link:'header a[href="#skills"]',probe:'.skills-grid article:nth-child(2)'},
    {label:'Coverage',link:'header a[href="#coverage"]',probe:'.coverage-card:nth-child(2)'},
    {label:'Projects',link:'header a[href="#projects"]',probe:'.project-card:nth-child(1)'},
    {label:'Experience',link:'header a[href="#experience"]',probe:'.experience-list article:nth-child(1)'},
    {label:'Contact',link:'header a[href="#contact"]',probe:'.contact-button'},
    {label:'Home',link:'header .brand',probe:'.hero-buttons a'},
  ];
  useEffect(()=>{
    let cancelled=false;pausedRef.current=false;setPaused(false);setFinished(false);setStep(-1);setState('Starting browser');
    const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
    const manualPause=()=>{pausedRef.current=true;setPaused(true);setState('Paused for visitor');};
    window.addEventListener('wheel',manualPause,{passive:true});window.addEventListener('touchstart',manualPause,{passive:true});window.addEventListener('keydown',manualPause);
    const play=async()=>{
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced&&!manualRunRef.current){setState('Reduced motion · press to run');setFinished(true);return;}manualRunRef.current=false;
      await wait(reduced?0:1100);
      for(let i=0;i<tourSteps.length&&!cancelled;i++){
        while(pausedRef.current&&!cancelled)await wait(160);if(cancelled)return;
        const item=tourSteps[i],link=document.querySelector(item.link),probe=document.querySelector(item.probe);if(!link)continue;
        const rect=link.getBoundingClientRect(),main={x:rect.left+rect.width*.52,y:rect.top+rect.height*.55};
        const probeRect=(probe||link).getBoundingClientRect();const secondary={x:probeRect.left+probeRect.width*.5,y:probeRect.top+probeRect.height*.5};
        setPointers([{x:main.x,y:main.y},{x:secondary.x-18,y:secondary.y},{x:secondary.x+20,y:secondary.y+12}]);setStep(i);setState(`Checking ${item.label.toLowerCase()}`);
        await wait(reduced?500:850);while(pausedRef.current&&!cancelled)await wait(160);if(cancelled)return;
        setClicking(true);link.click();await wait(320);setClicking(false);setState(`${item.label} checks passed`);await wait(reduced?900:1150);
      }
      if(!cancelled){setState('Run complete · 6 sections checked');setFinished(true);}
    };
    play();
    return()=>{cancelled=true;window.removeEventListener('wheel',manualPause);window.removeEventListener('touchstart',manualPause);window.removeEventListener('keydown',manualPause);};
  },[runId]);
  const togglePause=()=>{const next=!paused;pausedRef.current=next;setPaused(next);setState(next?'Run paused':'Resuming browser run');};
  const replay=()=>{manualRunRef.current=true;pausedRef.current=false;setPaused(false);setRunId(id=>id+1);};
  return <><aside className="tour-browser" aria-label="Automated browser tour"><div className="tour-browser-bar"><span className="tour-lights"><i/><i/><i/></span><span className="tour-address">vijay-portfolio.local</span><span className="tour-live"><i/>LIVE</span></div><div className="tour-browser-body"><div className="tour-title"><span>QA BROWSER</span><span>3 AGENTS</span></div><div className="tour-current"><span className="tour-current-label">AUTOMATED JOURNEY</span><strong>{step<0?'Opening portfolio':tourSteps[step]?.label||'Portfolio'}</strong><span className="tour-state"><i className={finished?'done':''}/>{state}</span></div><div className="tour-route">{tourSteps.slice(0,6).map((item,i)=><span key={item.label} className={i<=step?'visited':''}>{item.label}</span>)}</div><div className="tour-progress"><span style={{width:`${finished?100:Math.max(5,((step+1)/tourSteps.length)*100)}%`}}/></div><div className="tour-controls"><span><i className="tour-check-icon">✓</i> UI · API · ASSERTIONS</span><button onClick={finished?replay:togglePause}>{finished?'Replay run':paused?'Resume':'Pause run'}</button></div></div></aside>{pointers.map((point,i)=><div key={i} aria-hidden="true" className={`tour-cursor agent-${i+1}${clicking?' is-clicking':''}`} style={{left:point.x,top:point.y}}><span/></div>)}</>;
}
function Header(){const[open,setOpen]=useState(false);const links=[['About','#about'],['Skills','#skills'],['Coverage','#coverage'],['Projects','#projects'],['Experience','#experience']];return <header className="header"><a className="brand" href="#home" aria-label="Vijay Manoharan home"><span className="brand-symbol">VM</span><span>Vijay Manoharan<span className="brand-role">QA AUTOMATION ENGINEER</span></span></a><nav className={open?'nav-links open':'nav-links'}>{links.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<a href="#contact" className="nav-cta" onClick={()=>setOpen(false)}>Let's talk <ArrowUpRight size={15}/></a></nav><button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button></header>}
function App(){const year=new Date().getFullYear();useEffect(()=>{const sections=[...document.querySelectorAll('main > section:not(.hero)')];sections.forEach(section=>section.classList.add('scroll-reveal'));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -36px 0px'});sections.forEach(section=>observer.observe(section));return()=>observer.disconnect();},[]);return <><Header/><AutomationTour/><main id="home">
  <section className="hero shell"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-icon"><Terminal size={14}/></span> SOFTWARE QUALITY Â· AUTOMATION Â· AI</div><h1>Hi, I'm Vijay.<br/><span className="headline-muted">I automate the<br className="desktop-break"/> way forward.</span></h1><p className="hero-description">QA Automation Engineer building reliable test frameworks, intelligent QA tools, and scalable automation for complex SaaS applications.</p><div className="hero-buttons"><a className="button button-dark" href="#projects">Explore my work <ArrowUpRight size={16}/></a><a className="button button-light" href="#contact"><Mail size={16}/> Get in touch</a></div><div className="hero-footnote"><span>CHENNAI, INDIA</span><span className="foot-line"/><span>QUALITY × CODE × CONTINUOUS DELIVERY</span></div></div><div className="hero-visual"><div className="visual-grid"/><AutomationScene/><QAOverlay/><div className="scene-caption"><span className="caption-dot"/> AUTOMATION IN MOTION <span className="caption-index">FIG. 01</span></div></div><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown size={15}/></a></section>
  <section className="metrics shell" aria-label="Highlights"><div><strong>4<span>+</span></strong><small>Years in QA & Automation</small></div><div><strong>1,000<span>+</span></strong><small>Test scripts at scale</small></div><div><strong>UI <span>Â·</span> API</strong><small>End-to-end quality</small></div><div><strong>AI <span>â†—</span></strong><small>Next-gen QA workflows</small></div></section>
  <section id="about" className="section shell"><div className="section-label"><span>01 / ABOUT</span><span>What I care about</span></div><div className="about-layout"><h2>Beyond test cases.<br/><span className="muted">Engineering confidence.</span></h2><div className="about-text"><p>I'm an Automation Engineer focused on building maintainable frameworks, reliable test coverage, and faster feedback loops. I work across UI, API, data, and CI/CD layers to help teams ship with confidence.</p><p>Recently, Iâ€™ve been exploring AI agents and LLM-powered QA—bringing intelligence to project analysis, test design, and repetitive engineering workflows.</p><div className="about-tags"><span>Framework architecture</span><span>Quality engineering</span><span>AI in QA</span><span>Performance testing</span></div></div></div></section>
  <section id="skills" className="section skills-section"><div className="shell"><div className="section-label"><span>02 / SKILLS</span><span>Tools I work with</span></div><h2 className="section-heading">Strong foundations.<br/><span className="muted">Curious by default.</span></h2><div className="skills-grid">{skills.map((s,i)=><article className="skill-card" key={s.title}><div className="skill-card-top"><span className="skill-icon">{s.icon}</span><span className="skill-count">0{i+1}</span></div><h3>{s.title}</h3><div className="skill-pills">{s.list.map(item=><span key={item}>{item}</span>)}</div></article>)}</div></div></section>
  <section id="workflow" className="section shell"><div className="section-label"><span>03 / MY APPROACH</span><span>From idea to insight</span></div><h2 className="section-heading">A workflow built<br/><span className="muted">for confidence.</span></h2><div className="workflow">{journey.map((step,i)=><React.Fragment key={step.label}><div className="workflow-step"><div className="workflow-icon">{step.icon}</div><span className="workflow-title">{step.label}</span><span className="workflow-sub">{step.sub}</span></div>{i<journey.length-1&&<div className="workflow-arrow"><ArrowUpRight size={16}/></div>}</React.Fragment>)}</div></section>
  <section id="coverage" className="section coverage-section"><div className="shell"><div className="section-label"><span>04 / TEST COVERAGE</span><span>Quality across the release path</span></div><div className="coverage-heading"><h2 className="section-heading">Confidence at<br/><span className="muted">every layer.</span></h2><p>Automation that checks user journeys, service behavior, and release readiness as one connected system.</p></div><div className="coverage-grid"><article className="coverage-card coverage-ui"><div className="coverage-card-top"><span className="coverage-icon"><Code2 size={20}/></span><span className="coverage-index">01 / UI</span></div><h3>Browser journeys</h3><p>Exercise the paths people rely on, across forms, navigation, and key application states.</p><div className="coverage-flow"><span>USER FLOW</span><ArrowUpRight size={13}/><span>ASSERTIONS</span><ArrowUpRight size={13}/><span>RESULT</span></div></article><article className="coverage-card coverage-api"><div className="coverage-card-top"><span className="coverage-icon"><Workflow size={20}/></span><span className="coverage-index">02 / API</span></div><h3>Services & data</h3><p>Validate responses, integrations, and the data that moves between connected systems.</p><div className="coverage-flow"><span>REQUEST</span><ArrowUpRight size={13}/><span>CONTRACT</span><ArrowUpRight size={13}/><span>DATA</span></div></article><article className="coverage-card coverage-release"><div className="coverage-card-top"><span className="coverage-icon"><GitBranch size={20}/></span><span className="coverage-index">03 / RELEASE</span></div><h3>Continuous confidence</h3><p>Run suites in delivery pipelines and turn failures into clear, actionable feedback.</p><div className="coverage-flow"><span>CI RUN</span><ArrowUpRight size={13}/><span>REPORT</span><ArrowUpRight size={13}/><span>SHIP</span></div></article></div></div></section>  <section id="projects" className="section shell"><div className="section-label"><span>05 / SELECTED WORK</span><span>Built, tested, iterated</span></div><div className="projects-heading"><h2>Ideas into<br/><span className="muted">working systems.</span></h2><p>Projects that reflect how I approach engineering challenges: with curiosity, structure, and a focus on impact.</p></div><div className="projects-list">{projects.map(p=><article className="project-card" key={p.num}><div className="project-number">{p.num}</div><div className="project-main"><span className="project-category">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><div className="project-tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><a className="project-link" href="#contact" aria-label={`Ask about ${p.title}`}><ArrowUpRight size={19}/></a></article>)}</div></section>
  <section id="experience" className="section experience-section"><div className="shell"><div className="section-label"><span>06 / EXPERIENCE</span><span>Always evolving</span></div><h2 className="section-heading">Learning through building.<br/><span className="muted">Growing through sharing.</span></h2><div className="experience-list"><article><span className="exp-period">CURRENT</span><div><h3>QA Automation Engineer</h3><p>Building scalable automation systems, modernizing test frameworks, and exploring AI-driven quality engineering for SaaS products.</p></div><span className="exp-dot"/></article><article><span className="exp-period">FOUNDATION</span><div><h3>Automation Engineer</h3><p>Developed and maintained UI and API automation, reusable framework components, test data utilities, and reporting workflows.</p></div><span className="exp-dot"/></article></div></div></section>
  <section id="contact" className="contact-section shell"><div className="contact-overline">07 / CONTACT <span className="contact-line"/> OPEN TO MEANINGFUL CHALLENGES</div><h2>Let's make quality<br/><span className="muted">a superpower.</span></h2><p>Have a project, a QA challenge, or an idea around automation and AI? Let's connect.</p><a className="button button-dark contact-button" href="mailto:YOUR_EMAIL@example.com">Start a conversation <ArrowUpRight size={16}/></a><div className="social-links"><a href="https://www.linkedin.com/in/YOUR-LINKEDIN/" target="_blank" rel="noreferrer"><Code2 size={15}/> LinkedIn</a><a href="https://github.com/YOUR-GITHUB" target="_blank" rel="noreferrer"><Code2 size={15}/> GitHub</a><a href="/vijay-3d-portfolio/Vijay_Manoharan_Resume.pdf"><Download size={15}/> Resume</a></div></section>
  </main><footer className="footer shell"><a className="brand footer-brand" href="#home"><span className="brand-symbol">VM</span><span>Vijay Manoharan<span className="brand-role">QA AUTOMATION ENGINEER</span></span></a><span>DESIGNED WITH PURPOSE Â· © {year}</span><a href="#home">BACK TO TOP ↑</a></footer></>}

createRoot(document.getElementById('root')).render(<App/>);

