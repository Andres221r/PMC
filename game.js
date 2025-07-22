const ranks=['Soldado','Cabo','Sargento','Teniente','Capitan','Coronel'];
const continents=['América','Europa','África','Asia','Oceanía'];
let day=0;
let game={
  credits:10000,
  reputation:0,
  soldiers:[],
  candidates:[],
  vacancies:[],
  contracts:[],
  active:[],
  history:[]
};
let dailyLog=[];
function log(msg){
  game.history.push('Día '+day+': '+msg);
  dailyLog.push(msg);
}
function randomName(){
  const first=['Juan','Ana','Luis','Maria','Jose','Laura','Pedro'];
  const last=['Gomez','Diaz','Perez','Lopez','Ramos'];
  return first[Math.floor(Math.random()*first.length)]+' '+last[Math.floor(Math.random()*last.length)];
}
function newGame(){
  if(!confirm('¿Comenzar nuevo juego?'))return;
  day=0;
  game={credits:10000,reputation:0,soldiers:[],candidates:[],vacancies:[],contracts:[],active:[],history:[]};
  for(let i=0;i<3;i++)game.candidates.push(genCandidate());
  maybeGenerateContract();
  renderAll();
  log('Inicio de operaciones');
}
function saveGame(){localStorage.setItem('comandoPhantom',JSON.stringify({game,day}));}
function loadGame(){const d=localStorage.getItem('comandoPhantom');if(d){const data=JSON.parse(d);Object.assign(game,data.game);day=data.day;renderAll();}}
function genCandidate(){return{ name:randomName(), rank:ranks[0], skill:40+Math.floor(Math.random()*60), loyalty:50+Math.floor(Math.random()*50), morale:50+Math.floor(Math.random()*50), spec:['Infantería','Piloto','Hacker'][Math.floor(Math.random()*3)] }}
function genContract(){
  const name='Misión '+(game.contracts.length+game.active.length+1);
  const risk=30+Math.floor(Math.random()*70);
  const reward=500+Math.floor(Math.random()*1500);
  const dur=1+Math.floor(Math.random()*3);
  return {name,risk,reward,duration:dur,continent:continents[Math.floor(Math.random()*continents.length)]};
}
function maybeGenerateContract(){
  const num=1+Math.floor(Math.random()*2);
  for(let i=0;i<num;i++){const c=genContract();game.contracts.push(c);log('Nuevo contrato disponible: '+c.name);}
}
function hire(i){const c=game.candidates.splice(i,1)[0];game.soldiers.push(c);log('Contratado '+c.name);renderPersonnel();}
function createVacancy(){const skill=parseInt(prompt('Habilidad mínima (1-100):','50'))||50;game.vacancies.push({skill});log('Vacante creada (habilidad '+skill+')');renderPersonnel();}
function processVacancies(){game.vacancies.forEach((v,idx)=>{const cand=genCandidate();if(cand.skill>=v.skill){game.candidates.push(cand);game.vacancies.splice(idx,1);log('Nuevo candidato disponible: '+cand.name);}});}
function promote(idx){const s=game.soldiers[idx];const r=ranks.indexOf(s.rank);if(r<ranks.length-1){s.rank=ranks[r+1];s.skill+=5;log(s.name+' ascendido a '+s.rank);renderPersonnel();}}
function createContract(){const name=prompt('Nombre del contrato:');if(!name)return;const risk=parseInt(prompt('Riesgo (1-100):','50'))||50;const reward=parseInt(prompt('Recompensa $:','1000'))||1000;const dur=1+Math.floor(Math.random()*3);const cont={name,risk,reward,duration:dur,continent:continents[Math.floor(Math.random()*continents.length)]};game.contracts.push(cont);log('Contrato generado: '+name);renderContracts();}
function acceptContract(i){if(game.soldiers.length===0)return alert('Sin soldados');const sidx=parseInt(prompt('Índice de soldado (0-'+(game.soldiers.length-1)+'):'));if(isNaN(sidx)||sidx<0||sidx>=game.soldiers.length)return;const soldier=game.soldiers[sidx];const cont=game.contracts.splice(i,1)[0];game.active.push({soldier,cont,days:cont.duration});log(soldier.name+' asignado a '+cont.name);renderContracts();}
function advanceDay(){
  day++;
  dailyLog=[];
  maybeGenerateContract();
  processVacancies();
  game.active.forEach((a,idx)=>{
    a.days--;
    if(a.days<=0){
      const chance=Math.max(5,a.soldier.skill-a.cont.risk+50);
      if(Math.random()*100<chance){
        game.credits+=a.cont.reward;
        game.reputation+=5;
        log(a.soldier.name+' completó '+a.cont.name);
      }else{
        game.reputation-=10;
        log(a.soldier.name+' fracasó en '+a.cont.name);
      }
      game.active.splice(idx,1);
    }
  });
  if(Math.random()<0.1){randomEvent();}
  renderAll();
  endDaySummary();
}
function randomEvent(){const events=[{msg:'Ataque rival, pierdes reputación',rep:-5},{msg:'Contrato extra ofrecido',action:()=>game.contracts.push({name:'Operación de oportunidad',risk:30,reward:500,duration:2,continent:continents[Math.floor(Math.random()*continents.length)]})},{msg:'Donación de simpatizantes',cred:500},{msg:'Rumores de traición, moral baja',action:()=>game.soldiers.forEach(s=>s.morale-=5)}];const e=events[Math.floor(Math.random()*events.length)];if(e.rep)game.reputation+=e.rep;if(e.cred)game.credits+=e.cred;if(e.action)e.action();log(e.msg);}
function renderMain(){const el=document.getElementById('main');el.innerHTML=`<h2>Resumen</h2><p>Día ${day}</p><p>Créditos: $${game.credits} | Reputación: ${game.reputation} | Personal: ${game.soldiers.length}</p><button onclick="advanceDay()">Avanzar día</button>`;}
function soldierHTML(s,i){return`<div class="soldier-card"><div class="soldier-info">${i}- ${s.name} (${s.rank} | hab ${s.skill} | lealtad ${s.loyalty} | moral ${s.morale} | ${s.spec})</div><div class="soldier-actions"><button onclick="promote(${i})">Ascender</button></div></div>`;}
function renderPersonnel(){let html='<h2>Personal</h2><button onclick="createVacancy()">Crear Vacante</button><h3>Soldados</h3>';if(game.soldiers.length===0)html+='<p>Sin personal.</p>';else{html+=game.soldiers.map((s,i)=>soldierHTML(s,i)).join('');}html+='<h3>Candidatos</h3>';if(game.candidates.length===0)html+='<p>No hay candidatos.</p>';else{html+='<ul>'+game.candidates.map((c,i)=>`<li>${i}- ${c.name} (hab ${c.skill}) <button onclick="hire(${i})">Contratar</button></li>`).join('')+'</ul>';}if(game.vacancies.length>0)html+='<p>Vacantes pendientes: '+game.vacancies.length+'</p>';document.getElementById('personnel').innerHTML=html;}
function renderContracts(){let html='<h2>Contratos</h2><button onclick="createContract()">Nuevo Contrato</button><h3>Disponibles</h3>';if(game.contracts.length==0)html+='<p>Sin contratos.</p>';else{html+='<ul>'+game.contracts.map((c,i)=>`<li>${i}- ${c.name} (${c.continent} | riesgo ${c.risk} | recompensa $${c.reward}) <button onclick="acceptContract(${i})">Aceptar</button></li>`).join('')+'</ul>'; }html+='<h3>En curso</h3>';if(game.active.length===0)html+='<p>No hay operaciones en curso.</p>';else{html+='<ul>'+game.active.map(a=>`<li>${a.soldier.name} en ${a.cont.name} (${a.days} días restantes)</li>`).join('')+'</ul>'; }document.getElementById('contracts').innerHTML=html;}
function renderEvents(){document.getElementById('events').innerHTML='<h2>Eventos Recientes</h2><pre>'+game.history.slice(-10).join('\n')+'</pre>';}
function renderHistory(){document.getElementById('history').innerHTML='<h2>Historial Completo</h2><pre>'+game.history.join('\n')+'</pre>';}
function renderHelp(){document.getElementById('help').innerHTML='<h2>Ayuda</h2><ul><li>Inicio: resumen y avance de día.</li><li>Personal: contratar candidatos o crear vacantes.</li><li>Contratos: acepta misiones y revisa las activas.</li><li>Eventos: muestra últimos sucesos.</li><li>Historia: registro de todas las acciones.</li></ul>';}
function renderAll(){renderMain();renderPersonnel();renderContracts();renderEvents();renderHistory();renderHelp();}
function show(id){document.querySelectorAll('section').forEach(s=>s.style.display='none');document.getElementById(id).style.display='block';}
function showOverlay(html){const ov=document.getElementById('overlay');document.getElementById('overlayContent').innerHTML=html+'<button onclick="hideOverlay()">Cerrar</button>';ov.style.display='flex';}
function hideOverlay(){document.getElementById('overlay').style.display='none';}
function endDaySummary(){ if(dailyLog.length===0)return; const html='<h3>Novedades del día '+day+'</h3><ul>'+dailyLog.map(m=>`<li>${m}</li>`).join('')+'</ul>'; showOverlay(html); dailyLog=[]; }
document.addEventListener('DOMContentLoaded',()=>{loadGame(); if(game.soldiers.length===0)newGame();});
