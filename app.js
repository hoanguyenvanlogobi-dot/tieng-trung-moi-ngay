const app = document.querySelector('#app');
const key = 'tieng-trung-moi-ngay-v1';
const names = {1:'HSK 1',2:'HSK 2',3:'HSK 3',4:'Giao tiếp',5:'Từ của tôi',6:'HSK 4',7:'HSK 5'};
const descriptions = {1:'Chào hỏi và sinh hoạt',2:'Thói quen và hội thoại',3:'Mở rộng cách diễn đạt',4:'Cụm từ dùng hằng ngày',5:'Từ vựng bạn tự thêm',6:'Diễn đạt trung cấp',7:'Chủ đề và lập luận nâng cao'};
const routes = ['home','words','grammar','cards','quiz','sentences','progress','add'];
const modeNames = {grammar:'Ngữ pháp',cards:'Flashcard',quiz:'Kiểm tra 20 từ',sentences:'Ghép câu'};
let state = {custom:[], marked:{}, seen:{}, daily:{}, level:1, cardsLevel:1, direction:'zh', drillLevel:1, quizLevel:0, quizDir:'mix', review:false, resume:'', sessions:{}, grammar:{level:1,current:'',last:'',lessons:{}}};
try { Object.assign(state, JSON.parse(localStorage.getItem(key)) || {}); } catch {}
let query = '';
let showMarked = false;
let addMessage = '';
let storageFailed = false;
let page;
const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const all = () => words.concat(advancedWords[6],advancedWords[7],state.custom);
const byId = id => all().find(w => w.id === id);
const set = level => all().filter(w => !level || +level === w.level);
const label = (title, desc) => `<div class="section-head"><h1>${title}</h1><p class="muted">${desc}</p></div>`;
const btn = (name, action, variant='', disabled=false) => `<button class="btn ${variant}" data-act="${action}" ${disabled?'disabled':''}>${name}</button>`;
const empty = message => `<div class="empty">${message}</div>`;
const selected = (a,b) => a == b ? 'selected' : '';
const levels = (current, blank=false, limit=7) => (blank ? `<option value="0" ${selected(current,0)}>Tất cả bộ từ</option>` : '') + [1,2,3,6,7,4,5].filter(n=>n<=limit).map(n=>`<option value="${n}" ${selected(current,n)}>${names[n]}</option>`).join('');
const lessonLevels = current => [1,2,3,4,5].map(level=>`<option value="${level}" ${selected(current,level)}>HSK ${level}</option>`).join('');
const dirOptions = (d, mix=false) => (mix?`<option value="mix" ${selected(d,'mix')}>Hai chiều xen kẽ</option>`:'')+`<option value="zh" ${selected(d,'zh')}>Trung – Việt</option><option value="vi" ${selected(d,'vi')}>Việt – Trung</option>`;
const select = (id,title,options) => `<label>${title}<select id="${id}">${options}</select></label>`;
const shuffle = source => {
  const values = [...source];
  for (let i=values.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    [values[i],values[j]]=[values[j],values[i]];
  }
  return values;
};
const dateKey = (date=new Date()) => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
const today = () => state.daily[dateKey()] || {words:{},quizzes:0,sentences:0};
const day = () => state.daily[dateKey()] ||= {words:{},quizzes:0,sentences:0};
function save() {
  try { localStorage.setItem(key, JSON.stringify(state)); storageFailed=false; }
  catch { storageFailed=true; }
}
function record(id) { state.seen[id]=true; day().words[id]=true; }
function markedCount() { return all().filter(w=>state.marked[w.id]).length; }
function metric(level) {
  const pool = set(level);
  const seen = pool.filter(w=>state.seen[w.id]).length;
  return {seen,total:pool.length,pct:pool.length?Math.round(100*seen/pool.length):0};
}
const bar = n => `<div class="bar" role="progressbar" aria-label="Tỷ lệ hoàn thành" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="100"><span style="width:${n}%"></span></div>`;
function go(next) {
  if (location.hash === '#'+next) route();
  else location.hash = next;
}
function route() {
  const dest = location.hash.slice(1);
  page = routes.includes(dest)?dest:'home';
  if (modeNames[page]) { state.resume=page; save(); }
  render();
  window.scrollTo(0,0);
  app.focus({preventScroll:true});
}
function render() {
  document.querySelectorAll('nav [data-go]').forEach(node=>{
    if(node.dataset.go===page) node.setAttribute('aria-current','page');
    else node.removeAttribute('aria-current');
  });
  app.innerHTML = (storageFailed?empty('Trình duyệt đang chặn lưu dữ liệu. Thay đổi có thể mất khi đóng trang.'):'') + views[page]();
}
function home() {
  const daily = today();
  const inProgress = resume => resume === 'grammar' ? !!state.grammar.last && !state.grammar.lessons[state.grammar.last]?.completed
    : resume === 'cards' ? state.sessions.cards && state.sessions.cards.index < state.sessions.cards.ids.length
    : resume === 'quiz' ? state.sessions.quiz && !state.sessions.quiz.finished
    : resume === 'sentences' && state.sessions.sentences && state.sessions.sentences.index < state.sessions.sentences.order.length;
  const resume = [state.resume,...Object.keys(modeNames)].find(inProgress);
  const ongoing = !!resume;
  return `<section class="hero"><div class="hero-copy"><h1>Tiếng Trung<br>Mỗi Ngày</h1><p>Học từ vựng HSK 1–5 và tập dùng tiếng Trung trong những tình huống quen thuộc.</p><div class="row">${btn(ongoing?'Tiếp tục học':'Bắt đầu học',ongoing?(resume==='grammar'?'resume-grammar':'go-'+resume):'set-1','accent')} ${ongoing?`<small style="color:#d4e6db">${modeNames[resume]}</small>`:''}</div></div><div class="seal" aria-hidden="true"><span lang="zh-Hans">你好</span><small>NǏ HǍO · XIN CHÀO</small></div></section>
  <section class="grid stats" aria-label="Hoạt động hôm nay"><div class="panel"><strong>${Object.keys(daily.words).length}</strong><small>Từ đã luyện hôm nay</small></div><div class="panel"><strong>${daily.sentences}</strong><small>Câu đúng hôm nay</small></div><div class="panel"><strong>${markedCount()}</strong><small>Từ cần ôn lại</small></div></section>
  <div class="heading"><h2>Ngữ pháp</h2>${btn('Mở bài ngữ pháp','go-grammar')}</div>
  <div class="panel"><strong>${grammarCompleted()}/${grammarLessons.length} bài đã hoàn thành</strong>${bar(grammarCompleted()/grammarLessons.length*100)}${state.grammar.last&&!state.grammar.lessons[state.grammar.last]?.completed?`<p class="muted">Đang học · ${grammarLessons.find(row=>row[1]===state.grammar.last)?.[2]||''}</p>`:''}</div>
  <div class="heading"><h2>Bộ từ vựng</h2>${btn('Ôn từ chưa biết','review')}</div>
  <div class="grid">${[1,2,3,6,7,4,5].map(level=>{const m=metric(level);return `<button class="panel tile" data-act="set-${level}"><span class="pill">${names[level]}</span><h3>${descriptions[level]}</h3>${bar(m.pct)}<p class="muted">${m.seen}/${m.total} từ đã luyện</p></button>`;}).join('')}</div>`;
}
function normalize(str) { return str.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/g,'d').trim(); }
function entries() {
  const pool = set(state.level).filter(w=>(!showMarked||state.marked[w.id]) && normalize([w.zh,w.py,w.vi].join(' ')).includes(normalize(query)));
  return `<p class="muted" aria-live="polite">${pool.length} từ</p>` + (pool.length?pool.map(w=>`<article class="panel entry"><span class="zh" lang="zh-Hans">${escape(w.zh)}</span><span class="muted">${escape(w.py)}</span><span class="definition">${escape(w.vi||'Chưa có nghĩa tiếng Việt')}</span><button class="btn ${state.marked[w.id]?'marked':''}" data-act="mark:${w.id}" aria-pressed="${!!state.marked[w.id]}">${state.marked[w.id]?'Đã đánh dấu':'Chưa biết'}</button></article>`).join(''):empty('Chưa có từ phù hợp. Thử đổi bộ từ, bỏ lọc hoặc thêm từ mới.'));
}
function vocabulary() {
  return label('Từ vựng','Tìm theo chữ Hán, pinyin hoặc nghĩa tiếng Việt. Bộ HSK 1–3 là bộ chọn lọc. HSK 4–5 có thể tải trọn danh sách HSK 2.0.')+
  advancedNotice(state.level)+`<div class="controls">${select('vocab-level','Bộ từ',levels(state.level))}<label>Tìm từ<input id="search" type="search" value="${escape(query)}" placeholder="Ví dụ: thời tiết"></label><label class="check"><input id="marked" type="checkbox" ${showMarked?'checked':''}> Chỉ từ chưa biết</label></div><div class="row" style="margin-bottom:10px">${btn('Luyện bộ này','study-set','primary')} ${btn('Ôn từ chưa biết','review')}</div><div class="list" id="entries">${entries()}</div>`;
}
function resetCards(review=state.review, level=state.cardsLevel) {
  state.cardsLevel = level;
  state.review = review;
  const pool = review ? all().filter(w=>state.marked[w.id]) : set(level);
  state.sessions.cards = {ids:pool.map(w=>w.id),index:0,flipped:false};
  save();
}
function flashcards() {
  if (!state.sessions.cards) resetCards();
  const s = state.sessions.cards;
  const w = byId(s.ids[s.index]);
  const zh = state.direction === 'zh';
  return `<section class="study">${label('Flashcard','Lật thẻ rồi chọn “Nhớ rồi” hoặc “Chưa biết”. Từ chưa biết sẽ vào bộ ôn lại.')}
  <div class="controls">${select('cards-level','Bộ từ',levels(state.review ? 0 : state.cardsLevel).replace(/^/,`<option value="0" ${selected(+state.review,1)}>Từ chưa biết</option>`))}${select('direction','Chiều học',dirOptions(state.direction))}</div>${state.review?'':advancedNotice(state.cardsLevel)}
  ${w?`<p class="muted">Thẻ ${s.index+1}/${s.ids.length}</p>${bar(100*s.index/s.ids.length)}
  <button class="panel cardface" data-act="flip" aria-label="${s.flipped?'Ẩn đáp án':'Lật thẻ để xem đáp án'}"><strong ${zh?'class="zh" lang="zh-Hans"':''}>${escape(zh?w.zh:w.vi)}</strong>${s.flipped?`<span class="answer" ${zh?'':'lang="zh-Hans"'}>${escape(zh?w.vi:w.zh)}</span><small>${escape(w.py)}</small>`:'<small>Chạm để lật thẻ</small>'}</button>
  <div class="row">${btn('Thẻ trước','previous','',s.index===0)} ${btn('Chưa biết','card-miss','',!s.flipped)} ${btn('Nhớ rồi','card-hit','primary',!s.flipped)}</div>`:
  `<div class="panel"><h2>${s.ids.length?'Đã đi hết bộ thẻ':'Bộ này chưa có thẻ'}</h2><p class="muted">${s.ids.length?'Bạn có thể luyện lại hoặc chọn bộ khác.':'Chọn bộ khác hoặc đánh dấu từ trong danh sách từ vựng.'}</p><p>${btn('Bắt đầu lại','restart-cards')} ${btn('Xem từ vựng','go-words')}</p></div>`}
  </section>`;
}
function startQuiz() {
  const pool = set(state.quizLevel).filter(w=>w.vi);
  if(pool.length<20) return;
  const questions = shuffle(pool).slice(0,20).map((w,i)=>{
    const dir = state.quizDir==='mix' ? (i%2?'vi':'zh') : state.quizDir;
    const field = dir==='zh'?'vi':'zh';
    const used = new Set([w[field]]);
    const prompt = dir==='zh'?'zh':'vi';
    const other = shuffle(pool).filter(x=>{
      if (normalize(x[prompt])===normalize(w[prompt]) || used.has(x[field])) return false;
      used.add(x[field]);
      return true;
    }).slice(0,3);
    return {id:w.id,dir,choices:shuffle([w,...other].map(x=>x.id)),answer:null};
  });
  state.sessions.quiz = {questions,index:0,finished:false};
  save();
}
function quiz() {
  const s = state.sessions.quiz;
  const question = s?.questions[s.index];
  const w = question && byId(question.id);
  const answered = question?.answer !== null;
  const isZh = question?.dir==='zh';
  const count = set(state.quizLevel).filter(w=>w.vi).length;
  return `<section class="study">${label('Kiểm tra 20 từ','Mỗi lượt rút 20 từ khác nhau trong bộ bạn chọn. Từ trả lời sai được đánh dấu để ôn lại.')}
  ${!s||s.finished?`<div class="controls">${select('quiz-level','Bộ từ',levels(state.quizLevel,true))}${select('quiz-dir','Chiều kiểm tra',dirOptions(state.quizDir,true))}</div>${advancedNotice(state.quizLevel)}
  ${s?.finished?`<div class="panel"><h2>Kết quả ${s.questions.filter(q=>q.answer===q.id).length}/20</h2><div class="log">${s.questions.filter(q=>q.answer!==q.id).map(q=>{const item=byId(q.id);return `<div><span class="zh" lang="zh-Hans">${escape(item.zh)}</span> <span class="muted">${escape(item.py)}</span> · ${escape(item.vi)}</div>`;}).join('')||'Bạn đã trả lời đúng cả 20 từ.'}</div></div>`:''}
  <p>${btn(s?'Làm lượt mới':'Bắt đầu kiểm tra','start-quiz','primary',count<20)}</p>${count<20?'<p class="muted">Bộ này có dưới 20 từ. Hãy chọn bộ khác hoặc thêm từ.</p>':''}`:
  `<div class="panel question"><p class="muted">Câu ${s.index+1}/20 · ${isZh?'Trung – Việt':'Việt – Trung'}</p>${bar(s.questions.filter(q=>q.answer!==null).length*5)}<strong ${isZh?'class="zh" lang="zh-Hans"':''} style="margin-top:12px">${escape(isZh?w.zh:w.vi)}</strong></div>
  <div class="options">${question.choices.map(id=>{const option=byId(id);const style=answered?(id===w.id?'correct':id===question.answer?'wrong':''):'';return btn(isZh?escape(option.vi):`<span class="zh" lang="zh-Hans">${escape(option.zh)}</span>`,'answer:'+id,style,answered);}).join('')}</div>
  ${answered?`<div class="feedback" role="status">${question.answer===w.id?'Chính xác!':'Đáp án đúng'} · <span class="zh" lang="zh-Hans">${escape(w.zh)}</span> · ${escape(w.py)} · ${escape(w.vi||'Chưa có nghĩa tiếng Việt')}</div>${btn(s.index===19?'Xem kết quả':'Câu tiếp theo','next-quiz','primary')}`:''}`}
  </section>`;
}
function loadDrill(s) {
  const row=sentences[s.order[s.index]];
  const tokens=row?.[2].split(' ')||[];
  const indices=tokens.map((_,i)=>i);
  s.tiles=shuffle(indices);
  if (s.tiles.every((i,pos)=>i===pos)) s.tiles.reverse();
  s.picked=[];
  s.feedback='';
  s.hint=false;
}
function startDrill() {
  const candidates = sentences.map((row,i)=>({row,i})).filter(({row})=>row[0]===state.drillLevel);
  // Prioritize sentences that reuse the learner's reviewed words.
  const ranks = row => row[2].split(' ').filter(token=>all().some(w=>w.zh===token&&state.seen[w.id])).length;
  const order = shuffle(candidates).sort((a,b)=>ranks(b.row)-ranks(a.row)).map(x=>x.i);
  const s = {order,index:0};
  loadDrill(s);
  state.sessions.sentences=s;
  save();
}
function drill() {
  if(!state.sessions.sentences) startDrill();
  const s=state.sessions.sentences;
  const row=sentences[s.order[s.index]];
  const tokens=row?.[2].split(' ')||[];
  const chip = (id, action) => btn(`<span class="zh" lang="zh-Hans">${tokens[id]}</span>`,action+':'+id,'',s.feedback==='ok');
  return `<section class="study">${label('Luyện ghép câu','Chọn các cụm tiếng Trung theo đúng thứ tự. Chạm vào cụm đã chọn để bỏ ra. Bài luyện ưu tiên câu có từ bạn đã ôn.')}
  <div class="controls">${select('drill-level','Cấp độ',lessonLevels(state.drillLevel))}</div>
  ${row?`<div class="panel"><small>Câu ${s.index+1}/${s.order.length}</small><h2>${row[1]}</h2><div class="chips assembled" aria-label="Câu bạn đang ghép">${s.picked.length?s.picked.map(id=>chip(id,'unpick')).join(''):'<span class="muted">Câu của bạn sẽ xuất hiện ở đây.</span>'}</div><div class="chips" aria-label="Các cụm từ có sẵn">${s.tiles.filter(id=>!s.picked.includes(id)).map(id=>chip(id,'pick')).join('')}</div>
  ${s.hint&&s.feedback!=='ok'?`<p class="muted">Gợi ý từ đầu câu: <span lang="zh-Hans">${tokens[0]}</span>${row[5]?` hoặc <span lang="zh-Hans">${row[5].split(' ')[0]}</span>`:''}</p>`:''}
  ${s.feedback?`<div class="feedback" role="status">${s.feedback==='ok'?`Chính xác! <span lang="zh-Hans">${row[3]}</span> · ${row[4]}`:'Thứ tự chưa đúng. Bạn có thể đổi vị trí các cụm và thử lại.'}</div>`:''}
  <div class="row">${s.feedback==='ok'?btn('Tiếp tục','next-drill','primary'):btn('Kiểm tra câu','check-drill','primary',s.picked.length!==tokens.length)+btn('Gợi ý','hint')+btn('Xóa câu','clear-drill','',!s.picked.length)}</div></div>`:
  `<div class="panel"><h2>Đã hoàn thành bộ câu</h2><p>${btn('Luyện lại','restart-drill','primary')}</p></div>`}
  </section>`;
}
function progress() {
  const dates = Object.keys(state.daily).sort().reverse();
  const format = d=>d.split('-').reverse().join('/');
  return label('Tiến độ học','Một từ được tính khi bạn chấm thẻ, trả lời câu hỏi về từ đó hoặc ghép đúng câu có từ đó.')+
  `<div class="grid">${[1,2,3,6,7,4,5].map(level=>{const m=metric(level); return `<div class="panel"><h3>${names[level]}</h3>${bar(m.pct)}<p class="muted">${m.seen}/${m.total} từ đã luyện · ${m.pct}%</p></div>`;}).join('')}</div>
  <div class="heading"><h2>Tiến độ ngữ pháp</h2>${btn('Xem các bài','go-grammar')}</div><div class="grid">${[1,2,3,4,5].map(level=>{const total=grammarLessons.filter(row=>row[0]===level).length;const done=grammarCompleted(level);return `<div class="panel"><h3>HSK ${level}</h3>${bar(done/total*100)}<p class="muted">${done}/${total} bài đã hoàn thành</p></div>`;}).join('')}</div>
  <div class="heading"><h2>Nhật ký theo ngày</h2></div><div class="panel">${dates.length?`<div class="log">${dates.map(d=>{const item=state.daily[d];return `<div class="row"><strong>${d===dateKey()?'Hôm nay · ':''}${format(d)}</strong><span>${Object.keys(item.words).length} từ · ${item.quizzes} lượt kiểm tra · ${item.sentences} câu đúng · ${item.grammar||0} bài ngữ pháp mới</span></div>`;}).join('')}</div>`:empty('Nhật ký sẽ xuất hiện sau hoạt động học đầu tiên.')}</div>`;
}
function addWord() {
  return label('Thêm từ mới','Lưu từ vào một cấp độ, bộ giao tiếp hoặc bộ “Từ của tôi”.')+
  `<form id="add-word" class="panel form"><label>Chữ Hán<input name="zh" required maxlength="80" lang="zh-Hans" placeholder="Ví dụ: 早上好"></label>
  <label>Pinyin<input name="py" required maxlength="120" placeholder="Ví dụ: zǎoshang hǎo"></label><label>Nghĩa tiếng Việt<input name="vi" required maxlength="160" placeholder="Ví dụ: chào buổi sáng"></label><label>Bộ từ<select name="level">${levels(5)}</select></label>
  <button class="btn primary" type="submit">Lưu từ</button><div id="add-status" role="status">${escape(addMessage)}</div></form>`;
}
function grammarCompleted(level) {
  return grammarLessons.filter(([grade,id])=>(!level||level===grade)&&state.grammar.lessons[id]?.completed).length;
}
function grammar() {
  const g=state.grammar;
  const lesson=grammarLessons.find(row=>row[1]===g.current);
  if(!lesson) {
    return label('Ngữ pháp HSK 1–5','Mỗi bài có một cấu trúc, ví dụ giao tiếp có pinyin và một câu luyện tập. Trả lời đúng để hoàn thành bài.')+
      `<div class="controls">${select('grammar-level','Cấp độ',lessonLevels(g.level))}</div>
      <div class="list">${grammarLessons.filter(row=>row[0]===g.level).map(([,id,title,pattern])=>{
        const progress=g.lessons[id];
        return `<button class="panel tile grammar-tile" data-act="lesson:${id}"><span><strong>${title}</strong><span class="muted"> ${pattern}</span></span><span class="pill">${progress?.completed?'Đã hoàn thành':progress?'Đang học':'Chưa học'}</span></button>`;
      }).join('')}</div>`;
  }
  const [level,id,title,pattern,note,zh,py,vi,prompt,options,correct,feedback]=lesson;
  const progress=g.lessons[id];
  const choice=progress.choice;
  const next=grammarLessons[grammarLessons.indexOf(lesson)+1];
  return `<section class="study">
    <div class="heading">${btn('Danh sách bài','grammar-list')}<span class="pill">HSK ${level} · ${progress.completed?'Đã hoàn thành':'Đang học'}</span></div>
    ${label(title,note)}
    <div class="panel grammar-example"><h2>Mẫu câu</h2><p class="grammar-pattern">${pattern}</p><p class="zh" lang="zh-Hans">${zh}</p><p class="muted">${py}</p><p>${vi}</p></div>
    <div class="panel grammar-exercise"><h2>Luyện tập</h2><p>${prompt}</p>
      <div class="options">${options.map((option,i)=>btn(`<span lang="zh-Hans">${option}</span>`,'grammar-answer:'+i,choice!==null&&i===choice?(i===correct?'correct':'wrong'):'',choice===correct)).join('')}</div>
      <div role="status">${choice===correct?`<p class="feedback">Đúng rồi! ${feedback}</p>`:choice!==null?'<p class="feedback">Chưa đúng. Xem lại mẫu câu rồi thử đáp án khác.</p>':''}</div>
      ${choice===correct?`<div class="row">${next?btn('Bài tiếp theo','lesson:'+next[1],'primary'):''} ${btn('Làm lại bài tập','grammar-retry')}</div>`:''}
    </div>
  </section>`;
}
const views={home, words:vocabulary,grammar,cards:flashcards,quiz,sentences:drill,progress,add:addWord};
function changeMark(id) { if(state.marked[id]) delete state.marked[id]; else state.marked[id]=true; }
function action(code) {
  const [type,id]=code.split(':');
  if(type.startsWith('go-')) return go(type.slice(3));
  if(type.startsWith('set-')) {
    state.level=+type.slice(4); query=''; showMarked=false; save(); return go('words');
  }
  const c=state.sessions.cards, q=state.sessions.quiz, s=state.sessions.sentences;
  switch(type) {
    case 'resume-grammar': state.grammar.current=state.grammar.last; save(); return go('grammar');
    case 'lesson': {
      const lesson=grammarLessons.find(row=>row[1]===id);
      if(!lesson) return;
      state.grammar.current=id;
      state.grammar.last=id;
      state.grammar.level=lesson[0];
      state.grammar.lessons[id] ||= {choice:null,completed:false};
      state.resume='grammar';
      break;
    }
    case 'grammar-list': state.grammar.current=''; break;
    case 'grammar-retry': state.grammar.lessons[state.grammar.current].choice=null; break;
    case 'grammar-answer': {
      const lesson=grammarLessons.find(row=>row[1]===state.grammar.current);
      const progress=state.grammar.lessons[lesson[1]];
      progress.choice=+id;
      if(+id===lesson[10]&&!progress.completed) {
        progress.completed=true;
        progress.completedOn=dateKey();
        const daily=day();
        daily.grammar=(daily.grammar||0)+1;
      }
      break;
    }
    case 'download': return loadAdvanced(+id);
    case 'review': resetCards(true); return go('cards');
    case 'study-set': resetCards(false,state.level); return go('cards');
    case 'mark': changeMark(id); break;
    case 'flip': c.flipped=!c.flipped; break;
    case 'previous': c.index--; c.flipped=false; break;
    case 'card-miss':
    case 'card-hit': {
      const current=c.ids[c.index];
      record(current);
      if(type==='card-miss') state.marked[current]=true;
      else delete state.marked[current];
      c.index++; c.flipped=false;
      break;
    }
    case 'restart-cards': resetCards(); break;
    case 'start-quiz': startQuiz(); break;
    case 'answer': {
      const current=q.questions[q.index];
      if(current.answer!==null) return;
      current.answer=id; record(current.id);
      if(id!==current.id) state.marked[current.id]=true;
      break;
    }
    case 'next-quiz':
      if(q.index===19) { q.finished=true; day().quizzes++; } else q.index++;
      break;
    case 'pick': s.picked.push(+id); s.feedback=''; break;
    case 'unpick': s.picked=s.picked.filter(i=>i!==+id); s.feedback=''; break;
    case 'clear-drill': s.picked=[]; s.feedback=''; break;
    case 'hint': s.hint=!s.hint; break;
    case 'check-drill': {
      const row=sentences[s.order[s.index]], tokens=row[2].split(' ');
      const assembled=s.picked.map(i=>tokens[i]).join(' ');
      s.feedback=assembled===row[2]||assembled===row[5]?'ok':'retry';
      if(s.feedback==='ok') {
        day().sentences++;
        for(const w of all()) if(tokens.includes(w.zh)) record(w.id);
      }
      break;
    }
    case 'next-drill': s.index++; loadDrill(s); break;
    case 'restart-drill': startDrill(); break;
  }
  save(); render();
  const continuation = {answer:'next-quiz','check-drill':s?.feedback==='ok'?'next-drill':null,'card-hit':'flip','card-miss':'flip','next-quiz':null,'next-drill':null}[type];
  const same = Array.from(app.querySelectorAll('[data-act]')).find(b=>b.dataset.act===(continuation||code)&&!b.disabled);
  (same||app).focus({preventScroll:true});
}
document.addEventListener('click', event=>{
  const button=event.target.closest('button[data-go],button[data-act]');
  if(!button) return;
  if(button.dataset.go) return go(button.dataset.go);
  action(button.dataset.act);
});
app.addEventListener('input', event=>{
  if(event.target.id==='search') {
    query=event.target.value;
    document.querySelector('#entries').innerHTML=entries();
  }
});
app.addEventListener('change', event=>{
  const {id,value,checked}=event.target;
  switch(id) {
    case 'grammar-level': state.grammar.level=+value; break;
    case 'marked': showMarked=checked; break;
    case 'vocab-level': state.level=+value; break;
    case 'cards-level': resetCards(+value===0,+value||state.cardsLevel); break;
    case 'direction': state.direction=value; state.sessions.cards.flipped=false; break;
    case 'quiz-level': state.quizLevel=+value; break;
    case 'quiz-dir': state.quizDir=value; break;
    case 'drill-level': state.drillLevel=+value; startDrill(); break;
    default: return;
  }
  save(); render(); document.getElementById(id)?.focus();
});
app.addEventListener('submit', event=>{
  if(event.target.id!=='add-word') return;
  event.preventDefault();
  const form=new FormData(event.target);
  const [zh,py,vi]=['zh','py','vi'].map(field=>String(form.get(field)).trim());
  const level=+form.get('level');
  const status=document.querySelector('#add-status');
  if(!zh||!py||!vi) { status.textContent='Hãy nhập đủ cả ba trường.'; return; }
  if(!/\p{Script=Han}/u.test(zh)) { status.textContent='Hãy nhập ít nhất một chữ Hán.'; return; }
  if(set(level).some(w=>w.zh===zh&&normalize(w.vi)===normalize(vi))) { status.textContent='Từ này đã có trong bộ đã chọn.'; return; }
  const item={id:'u'+crypto.randomUUID(),zh,py,vi,level};
  state.custom.push(item);
  const session=state.sessions.cards;
  if(session&&!state.review&&state.cardsLevel===level&&!session.ids.includes(item.id)) session.ids.push(item.id);
  save();
  addMessage=storageFailed?'Đã thêm trong phiên này. Trình duyệt đang chặn lưu dữ liệu.':`Đã lưu ${zh} vào bộ ${names[level]}.`;
  event.target.reset();
  event.target.elements.level.value=level;
  status.textContent=addMessage;
  event.target.elements.zh.focus();
});
window.addEventListener('hashchange', route);
route();
