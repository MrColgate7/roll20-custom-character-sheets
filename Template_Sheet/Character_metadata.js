// === Character metadata -> Attributes (IDs -> Names, Avatar, Default Token) ===
// Commande chat: !syncchar  (GM uniquement)

on('ready', () => log('Character metadata sync ready. Use !syncchar to resync.'));

const ATTR = {
  editors: 'editors',
  journals: 'journals',
  editors_names: 'editors_names',
  journals_names: 'journals_names',
  avatar_url: 'avatar_url',
  defaulttoken_img: 'defaulttoken_img',
};

function upsertAttr(charId, name, value) {
  const v = (value == null ? '' : String(value));
  let a = findObjs({ _type:'attribute', _characterid: charId, name })[0];
  if (a) a.set({ current: v });
  else createObj('attribute', { characterid: charId, name, current: v });
}

function csvToArray(csv) {
  if (!csv) return [];
  return csv.split(',').map(s => s.trim()).filter(Boolean);
}

function idsToNames(listCsv) {
  if (!listCsv) return '';
  if (listCsv === 'all' || listCsv === 'gm') return listCsv;
  const ids = csvToArray(listCsv);
  const names = ids.map(id => {
    const p = getObj('player', id);
    return p ? p.get('displayname') : id;
  });
  return names.join(', ');
}

function parseDefaultTokenImg(jsonStr) {
  try {
    if (!jsonStr) return '';
    const arr = JSON.parse(jsonStr);
    const t = Array.isArray(arr) ? arr[0] : arr;
    return t && t.imgsrc ? t.imgsrc : '';
  } catch (e) { return ''; }
}

function mirrorCharacter(char) {
  const id = char.id;
  const controlledby = char.get('controlledby') || '';
  const inJournals   = char.get('inplayerjournals') || '';
  const avatar       = char.get('avatar') || '';
  const defToken     = char.get('defaulttoken') || '';
  const defImg       = parseDefaultTokenImg(defToken);

  upsertAttr(id, ATTR.editors, controlledby);
  upsertAttr(id, ATTR.journals, inJournals);
  upsertAttr(id, ATTR.editors_names, idsToNames(controlledby));
  upsertAttr(id, ATTR.journals_names, idsToNames(inJournals));
  upsertAttr(id, ATTR.avatar_url, avatar);
  upsertAttr(id, ATTR.defaulttoken_img, defImg);
}

// Écoute les changements pertinents
['controlledby','inplayerjournals','avatar','defaulttoken'].forEach(prop => {
  on(`change:character:${prop}`, mirrorCharacter);
});
on('add:character', mirrorCharacter);

// Commande manuelle (GM)
on('chat:message', (msg) => {
  if (msg.type === 'api' && /^!syncchar\b/i.test(msg.content)) {
    if (!playerIsGM(msg.playerid)) { sendChat('Sync', '/w "'+ (getObj('player', msg.playerid)?.get('displayname') || 'player') +'" Only GMs can run !syncchar.'); return; }
    findObjs({ _type:'character' }).forEach(mirrorCharacter);
    sendChat('Sync', '/w gm Metadata synced.');
  }
});
