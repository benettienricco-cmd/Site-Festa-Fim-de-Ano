// THE LAST DANCE · RSVP — Google Apps Script
// Backend do site: grava as respostas na aba "RSVP" desta planilha.

// Recebe as respostas enviadas pelo site (GitHub Pages)
function doPost(e) {
  salvar(JSON.parse(e.postData.contents));
  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('The Last Dance RSVP: ok');
}

var EMPRESAS = ['BFerraz', 'Eixo', 'Spons', 'Just Solutions'];
var CABECALHO = ['Atualizado em', 'ID', 'Nome', 'Empresa', 'Cargo', 'Presença'];

function limpar_(v) {
  var s = String(v == null ? '' : v).trim().slice(0, 80);
  if (/^[=+\-@]/.test(s)) s = "'" + s; // evita fórmulas injetadas na planilha
  return s;
}

function salvar(d) {
  d = d || {};
  var nome = limpar_(d.nome), cargo = limpar_(d.cargo);
  var empresa = EMPRESAS.indexOf(d.empresa) >= 0 ? d.empresa : '';
  var presenca = d.presenca === 'sim' ? 'Vai' : (d.presenca === 'nao' ? 'Não vai' : '');
  var id = String(d.id || '').replace(/[^a-z0-9]/gi, '').slice(0, 40);
  if (!nome || !cargo || !empresa || !presenca || !id) throw new Error('Dados incompletos');

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('RSVP') || ss.insertSheet('RSVP');
    if (sh.getLastRow() === 0) {
      sh.appendRow(CABECALHO);
      sh.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
      sh.setFrozenRows(1);
    }
    var linha = [new Date(), id, nome, empresa, cargo, presenca];
    var n = sh.getLastRow() - 1;
    var ids = n > 0 ? sh.getRange(2, 2, n, 1).getValues().map(function (r) { return String(r[0]); }) : [];
    var i = ids.indexOf(id);
    if (i >= 0) sh.getRange(i + 2, 1, 1, linha.length).setValues([linha]);  // pessoa alterou a resposta
    else sh.appendRow(linha);
    return true;
  } finally {
    lock.releaseLock();
  }
}
