import jsPDF from 'jspdf';
// assets

import lignediag3 from 'assets_v3/lignediag3.png';
import logov3Diag from 'assets_v3/Home/Logo_Diagoriente.png';

import logoRF from '../assets/pdf/rf.png';
import niveau1 from '../assets/pdf/niveau1.png';
import niveau2 from '../assets/pdf/niveau2.png';
import niveau3 from '../assets/pdf/niveau3.png';
import niveau4 from '../assets/pdf/niveau4.png';
import logo2 from '../assets/pdf/pdfreloc.png';

import linear from '../assets/pdf/lignetop.png';
import backdrop from '../assets/pdf/backdrop.png';
import diagoriente from '../assets/pdf/diagor2.png';

import latoRegular from '../assets/pdf/fonts/Lato-Regular';
import latoBold from '../assets/pdf/fonts/Lato-Bold';
import latoSemiBold from '../assets/pdf/fonts/Lato-SemiBold';
import nunitoRegular from '../assets/pdf/fonts/Nunito-Regular';
import nunitoBold from '../assets/pdf/fonts/Nunito-Bold';

export function pdf2(parcours: any, get: any, user: any, div: any = false) {
  const doc = new jsPDF('l', 'pt', 'a4', true as any);
  doc.addFileToVFS('Lato-Regular', latoRegular);
  doc.addFont('Lato-Regular', 'lato', 'normal');
  doc.addFileToVFS('Lato-Bold', latoBold);
  doc.addFont('Lato-Bold', 'lato', 'bold');
  doc.addFileToVFS('Lato-Semi-Bold', latoSemiBold);
  doc.addFont('Lato-Semi-Bold', 'lato', 'semiBold');
  doc.addFileToVFS('Nunito-Regular', nunitoRegular);
  doc.addFont('Nunito-Regular', 'nunito', 'normal');
  doc.addFileToVFS('Nunito-Bold', nunitoBold);
  doc.addFont('Nunito-Bold', 'nunito', 'bold');

  const { skills } = parcours;
  const themesPerso: any = [];
  const skillPro: any = [];
  skills.forEach((skill: any) => {
    if (skill.theme.type === 'personal') themesPerso.push(skill.theme.title);
    else skillPro.push(skill.theme.title);
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor('F5F5F5');
  doc.rect(0, 0, width, height, 'F');

  doc.setFillColor('FFFFFF');
  doc.rect(0, 0, width, 80, 'F');

  const ligneel = document.createElement('img');
  ligneel.setAttribute('src', lignediag3);
  doc.addImage(ligneel, 'PNG', -0.5, 0, width + 0.5, 5.5, '', 'FAST');

  const { firstName } = user.profile;
  const { lastName } = user.profile;

  doc.setFont('nunito', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(26, 68, 131);
  doc.text('Carte de compétences', 16, 42);

  doc.setFont('nunito', 'normal');
  doc.setFontSize(14);
  doc.text(`de ${firstName.toUpperCase()} ${lastName.toUpperCase()}`, 17, 62);

  const RF = document.createElement('img');
  RF.setAttribute('src', logoRF);
  doc.addImage(RF, 'PNG', width - 70, 20, 56, 45, '', 'FAST');

  const competences = get.data.globalCopmetences;

  doc.setFont('lato', 'semiBold');
  const y1 = 120;
  const x1 = 480;
  for (let i = 0; i < 10; i++) {
    doc.setFillColor('FFFFFF');
    doc.rect(x1 - 10, y1 - 12 + i * 42, 210, 20, 'F');

    doc.setFillColor(competences[i].color.slice(1));
    doc.rect(x1 - 10, y1 - 13 + i * 42, 8, 20, 'F');

    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text(competences[i].title, x1, y1 + i * 42);
    doc.setFontSize(10);
    doc.setTextColor(160, 160, 160);
    if (competences[i].value > 0) doc.text(competences[i].niveau.title, x1 + 5, y1 + 20 + i * 42);
    for (let j = 1; j <= 4; j++) {
      if (j <= competences[i].value) doc.setFillColor(competences[i].color.slice(1));
      else doc.setFillColor('FFFFFF');
      doc.circle(x1 + 220 + j * 22, y1 + i * 42, 6.5, 'F');
    }
  }

  const y2 = 95;

  doc.setFillColor('FFFFFF');
  doc.rect(0, y2, 440, 200, 'F');

  doc.setFont('nunito', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(26, 68, 131);
  doc.text('EXPÉRIENCES PERSONNELLES', 24, y2 + 22);

  doc.setFont('lato', 'semiBold');
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  const n2 = themesPerso.length < 16 ? themesPerso.length : 16;
  for (let i = 0; i < n2; i++) {
    const x2 = i < 8 ? 38 : 248;
    const j = i < 8 ? i : i - 8;
    doc.text(themesPerso[i], x2, y2 + 48 + j * 18);
  }
  doc.setDrawColor(230, 230, 230);

  doc.line(32, y2 + 37, 32, y2 + 37 + 140);
  if (n2 > 8) {
    doc.line(242, y2 + 37, 242, y2 + 37 + 140);
  }

  const y3 = 305;

  doc.setFillColor('FFFFFF');
  doc.rect(0, y3, 440, 195, 'F');

  doc.setFont('nunito', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(26, 68, 131);
  doc.text('EXPÉRIENCES PROFESSIONNELLES', 24, y3 + 22);

  doc.setFont('lato', 'semiBold');
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  const n3 = skillPro.length < 16 ? skillPro.length : 16;
  for (let i = 0; i < n3; i++) {
    const x2 = i < 8 ? 38 : 248;
    const j = i < 8 ? i : i - 8;
    doc.text(skillPro[i], x2, y3 + 48 + j * 18);
  }
  doc.setDrawColor(230, 230, 230);

  doc.line(32, y3 + 37, 32, y3 + 37 + 140);
  if (n3 > 8) {
    doc.line(242, y3 + 37, 242, y3 + 37 + 140);
  }

  doc.setFillColor('FFFFFF');
  doc.rect(0, height - 37, width, 37, 'F');

  const logoDiag = document.createElement('img');
  logoDiag.setAttribute('src', logov3Diag);
  doc.addImage(logoDiag, 'PNG', width - 105, height - 28, 90, 16, '', 'FAST');

  doc.addImage(ligneel, 'PNG', -0.5, height - 5, width + 0.5, 5.5, '', 'FAST');

  const pdfTitle = `Carte de compétences - ${firstName[0].toUpperCase()}${firstName.slice(
    1,
  )} ${lastName[0].toUpperCase()}${lastName.slice(1)}.pdf`;

  if (div) {
    doc.setProperties({
      title: pdfTitle,
    });
    doc.autoPrint();
    doc.output('dataurlnewwindow');
  } else doc.save(pdfTitle);
}

export function pdf(parcours: any, getParcours: any, authUser: any, div: any = false) {
  const doc = new jsPDF('l', 'pt', 'a4', true as any);
  doc.addFileToVFS('Lato-Regular', latoRegular);
  doc.addFont('Lato-Regular', 'lato', 'normal');
  doc.addFileToVFS('Lato-Bold', latoBold);
  doc.addFont('Lato-Bold', 'lato', 'bold');
  doc.addFileToVFS('Lato-Semi-Bold', latoSemiBold);
  doc.addFont('Lato-Semi-Bold', 'lato', 'semiBold');
  doc.addFileToVFS('Nunito-Regular', nunitoRegular);
  doc.addFont('Nunito-Regular', 'nunito', 'normal');
  doc.addFileToVFS('Nunito-Bold', nunitoBold);
  doc.addFont('Nunito-Bold', 'nunito', 'bold');
  const { skills } = parcours.data;
  const themesPerso: any = [];
  let skillPro: any = null;
  skills.forEach((skill: any) => {
    if (skill.theme.type === 'personal') themesPerso.push(skill.theme.title);
    else skillPro = skill;
  });

  const competences = getParcours.data.globalCopmetences;

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  const background = document.createElement('img');
  background.setAttribute('src', linear);
  doc.addImage(background, 'PNG', 0, 0, width, 9, '', 'FAST');

  const { firstName } = authUser.user.user.profile;
  const { lastName } = authUser.user.user.profile;

  const diagorienteTitle = document.createElement('img');
  diagorienteTitle.setAttribute('src', diagoriente);
  doc.addImage(diagorienteTitle, 'PNG', 12, 17, 156, 41, '', 'FAST');

  const backdropDiv = document.createElement('img');
  backdropDiv.setAttribute('src', backdrop);
  doc.addImage(backdropDiv, 'PNG', 0, 67, width, 35, '', 'FAST');

  const RF = document.createElement('img');
  RF.setAttribute('src', logoRF);
  doc.addImage(RF, 'PNG', width - 90, 87, 70, 57, '', 'FAST');

  doc.setFont('nunito', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(26, 68, 131);
  doc.text('Carte de compétences', 21, 120);

  doc.setFont('nunito', 'normal');
  doc.setFontSize(16);
  doc.text(`de ${firstName.toUpperCase()} ${lastName.toUpperCase()}`, 22, 144);

  doc.setLineWidth(1.1);
  doc.setDrawColor(215, 215, 215);
  doc.roundedRect(23, 175, 380, 380, 7, 7, 'S');

  doc.setFont('lato', 'semiBold');
  const y1 = 212;
  const niveaux = [null, niveau1, niveau2, niveau3, niveau4];
  for (let i = 0; i < 10; i++) {
    doc.setFontSize(13);
    doc.setTextColor(100, 100, 100);
    doc.text(competences[i].title, 45, y1 + i * 35);
    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    if (competences[i].value > 0) doc.text(competences[i].niveau.title, 45 + 5, 221 + 6.3 + i * 35);
    for (let j = 1; j <= competences[i].value; j++) {
      doc.addImage(
        niveaux[j],
        'PNG',
        45 + 20 + 240 + j * 16,
        y1 - 8.5 + i * 35,
        11,
        11,
        '',
        'FAST',
      );
    }
  }

  doc.roundedRect(423, 175, 230, 245, 7, 7, 'S');

  doc.setFont('nunito', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(26, 68, 131);
  doc.text('Intérêts', 442, 211);

  doc.setFont('lato', 'semiBold');
  doc.setFontSize(12.5);
  doc.setTextColor(100, 100, 100);
  const interests = getParcours.data.globalInterest.map((el: any) =>
    el.title.split('/').map((el: string) => el.trim()));

  const n = interests.length <= 6 ? interests.length : 6;
  let col = 0;
  let row = 0;
  for (let i = 0; i < n; i++) {
    if (i === 3 || i === 4 || i === 5) col = 1;
    if (i === 1 || i === 4) row = 1;
    else if (i === 2 || i === 5) row = 2;
    else row = 0;
    const x = 442 + 108 * col;
    let y = 211 + 4 * 15 * row;
    y += 5 * row;

    let j = 0;
    let k = 0;
    while (k < interests[i].length && j < 4) {
      const splitText = doc.splitTextToSize(interests[i][k], 100);
      if (splitText.length + j > 4) break;
      splitText.forEach((text: any, index: number) => {
        doc.text(text, x, y + 25 + j * 15 + index * 15, { maxWidth: 100 });
      });
      k++;
      j += splitText.length;
    }
    doc.line(x - 4, y + 15, x - 4, y + 15 + 14 * j);
  }

  doc.roundedRect(674, 175, 149, 245, 7, 7, 'S');

  doc.setFont('nunito', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(26, 68, 131);
  doc.text('Expériences', 693, 211);

  doc.setFont('lato', 'semiBold');
  doc.setFontSize(12.5);
  doc.setTextColor(100, 100, 100);
  const n2 = themesPerso.length < 10 ? themesPerso.length : 10;
  for (let i = 0; i < n2; i++) {
    doc.text(themesPerso[i], 693, 211 + 28 + i * 18);
  }
  const logo2Div = document.createElement('img');
  logo2Div.setAttribute('src', logo2);
  doc.addImage(logo2Div, 484, 462, 118, 90, '' as any, 'FAST');

  doc.setFont('nunito', 'normal');
  doc.setFontSize(12.5);
  doc.setTextColor(26, 68, 131);

  doc.text('Fait à .......................................', 622, 478);
  doc.text('Le .......................................', 622, 508);
  doc.text('Signature', 622, 538);

  doc.addImage(background, 'PNG', 0, height - 9, width, 9, '', 'FAST');

  const pdfTitle = `Carte de compétences - ${firstName[0].toUpperCase()}${firstName.slice(
    1,
  )} ${lastName[0].toUpperCase()}${lastName.slice(1)}.pdf`;

  if (div) {
    doc.setProperties({
      title: pdfTitle,
    });
    const output = doc.output('datauristring');
    return output;
  }
  doc.save(pdfTitle);
}
