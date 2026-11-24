const advancedLevel = {6:4,7:5};
const advancedWords = {};
const advancedStatus = {};
const advancedFallback = {
  6:`爱情|ài qíng|tình yêu
安排|ān pái|sắp xếp
安全|ān quán|an toàn
按时|àn shí|đúng giờ
按照|àn zhào|theo, căn cứ vào
包括|bāo kuò|bao gồm
保护|bǎo hù|bảo vệ
保证|bǎo zhèng|bảo đảm
报名|bào míng|đăng ký
抱歉|bào qiàn|xin lỗi
毕业|bì yè|tốt nghiệp
标准|biāo zhǔn|tiêu chuẩn
表达|biǎo dá|diễn đạt
表格|biǎo gé|biểu mẫu
表扬|biǎo yáng|khen ngợi
材料|cái liào|tài liệu, vật liệu
参观|cān guān|tham quan
成功|chéng gōng|thành công
出差|chū chāi|đi công tác
打扰|dǎ rǎo|làm phiền
道歉|dào qiàn|xin lỗi, tạ lỗi
负责|fù zé|phụ trách
支持|zhī chí|ủng hộ
仔细|zǐ xì|kỹ lưỡng`,
  7:`爱护|ài hù|giữ gìn, bảo vệ
爱惜|ài xī|quý trọng, trân trọng
安慰|ān wèi|an ủi
安装|ān zhuāng|lắp đặt
把握|bǎ wò|nắm bắt
办理|bàn lǐ|giải quyết, làm thủ tục
保存|bǎo cún|lưu giữ
保持|bǎo chí|duy trì
报道|bào dào|đưa tin
毕竟|bì jìng|xét cho cùng
避免|bì miǎn|tránh
辩论|biàn lùn|tranh luận
标志|biāo zhì|biểu trưng, dấu hiệu
采取|cǎi qǔ|áp dụng, thực hiện
采访|cǎi fǎng|phỏng vấn
参考|cān kǎo|tham khảo
参与|cān yù|tham gia
差距|chā jù|khoảng cách, chênh lệch
承认|chéng rèn|thừa nhận
承担|chéng dān|gánh vác
发挥|fā huī|phát huy
改善|gǎi shàn|cải thiện
效率|xiào lǜ|hiệu suất
总结|zǒng jié|tổng kết`
};
const advancedId = (level,zh) => 'hsk'+advancedLevel[level]+'-'+Array.from(zh,c=>c.codePointAt(0).toString(16)).join('-');
for (const [level,list] of Object.entries(advancedFallback)) {
  advancedWords[level]=list.split('\n').map(line=>{
    const [zh,py,vi]=line.split('|');
    return {id:advancedId(level,zh),level:+level,zh,py,vi};
  });
  try {
    const cached=JSON.parse(localStorage.getItem('mandarin-hsk-'+level));
    if(Array.isArray(cached)&&cached.length>advancedWords[level].length) {
      advancedWords[level]=cached; advancedStatus[level]='ready';
    }
  } catch {}
}
const hskSource='drkameleon/complete-hsk-vocabulary/main/wordlists/exclusive/old';
const dictSource='ph0ngp/CVDICT/main/CVDICT.u8';
let dictionaryRequest;
async function fetchPublic(path) {
  for(const host of ['https://raw.githubusercontent.com/','https://cdn.jsdelivr.net/gh/']) {
    const url=host.includes('jsdelivr')?host+path.replace(/^([^/]+\/[^/]+)\/([^/]+)\//,'$1@$2/'):host+path;
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(15000)});
      if(response.ok) return await response.text();
    } catch {}
  }
  throw Error('Không tải được dữ liệu.');
}
function dictionaryEntries(text) {
  const entries=new Map();
  for(const line of text.split(/\r?\n/)) {
    const match=line.match(/^\s*\S+\s+(\S+)\s+\[([^\]]+)\]\s*\/(.+)\/$/);
    if(!match) continue;
    const [,zh,py,body]=match;
    const key=py.toLowerCase().replace(/u:|v/g,'ü');
    const definition=body.split('/').map(x=>x.trim()).filter(x=>x&&!/^(CL:|biến thể |dị thể |xem )/iu.test(x)).slice(0,3).join('; ');
    if(!definition) continue;
    const forms=entries.get(zh)||new Map();
    forms.set(key,definition);
    entries.set(zh,forms);
  }
  if(entries.size<50000) throw Error('Từ điển chưa tải đủ.');
  return entries;
}
async function loadAdvanced(level) {
  if(advancedStatus[level]==='loading'||advancedStatus[level]==='ready') return;
  advancedStatus[level]='loading'; render();
  try {
    dictionaryRequest ||= fetchPublic(dictSource).then(dictionaryEntries).catch(error=>{dictionaryRequest=null;throw error;});
    const [data,dictionary]=await Promise.all([fetchPublic(hskSource+'/'+advancedLevel[level]+'.json').then(JSON.parse),dictionaryRequest]);
    if(!Array.isArray(data)||data.length<(level===6?550:1200)) throw Error('Danh sách chưa tải đủ.');
    const local=new Map(advancedWords[level].map(w=>[w.zh,w]));
    const list=data.map(({simplified:zh,forms})=>{
      const item=local.get(zh);
      if(item) return item;
      const fromDict=dictionary.get(zh);
      const displayForms=(forms||[]).filter(form=>form.transcriptions?.pinyin&&!/^(?:old |archaic )?variant of |^surname /i.test(form.meanings?.[0]||''));
      const first=displayForms.find(form=>fromDict?.has(form.transcriptions.numeric?.toLowerCase().replace(/u:|v/g,'ü')))||displayForms[0]||forms?.[0];
      const vi=fromDict?.get(first?.transcriptions?.numeric?.toLowerCase().replace(/u:|v/g,'ü'))||fromDict?.values().next().value||'';
      return {id:advancedId(level,zh),level,zh,py:first?.transcriptions?.pinyin||'',vi};
    });
    advancedWords[level]=list;
    advancedStatus[level]='ready';
    const deck=state.sessions.cards;
    if(deck&&!state.review&&state.cardsLevel===level) {
      const ids=new Set(deck.ids);
      deck.ids.push(...list.filter(w=>!ids.has(w.id)).map(w=>w.id));
      save();
    }
    try { localStorage.setItem('mandarin-hsk-'+level,JSON.stringify(list)); } catch {}
  } catch { advancedStatus[level]='error'; }
  if(['home','words','cards','quiz','progress'].includes(page)) render();
}
function advancedNotice(level) {
  if(!advancedLevel[level]) return '';
  const status=advancedStatus[level];
  const missing=advancedWords[level].filter(w=>!w.vi).length;
  const message=status==='ready'
    ? `Đã nạp ${advancedWords[level].length} mục HSK ${advancedLevel[level]} theo bộ HSK 2.0.${missing?` ${missing} mục đang thiếu nghĩa tiếng Việt và được bỏ qua trong kiểm tra.`:''} Nghĩa từ điển mang tính tham khảo.`
    : status==='loading'?'Đang tải danh sách HSK và ghép nghĩa từ điển tiếng Việt…'
    : status==='error'?'Chưa tải được bộ đầy đủ. Bạn vẫn có thể dùng bộ mẫu có sẵn.'
    : 'Đang hiển thị 24 từ mẫu. Kết nối Internet để tải trọn bộ từ của cấp này.';
  return `<div class="empty" role="status" style="margin-bottom:12px">${message} ${status==='ready'||status==='loading'?'':btn('Tải bộ từ đầy đủ','download:'+level)} <small class="sources">Dữ liệu <a href="https://github.com/drkameleon/complete-hsk-vocabulary">Complete HSK Vocabulary</a> · Nghĩa <a href="https://github.com/ph0ngp/CVDICT">CVDICT</a> (<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>)</small></div>`;
}
