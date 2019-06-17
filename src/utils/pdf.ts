import jsPDF from 'jspdf';
// assets
import logoRF from '../assets/pdf/rf.png';
import niveau1 from '../assets/pdf/niveau1.png';
import niveau2 from '../assets/pdf/niveau2.png';
import niveau3 from '../assets/pdf/niveau3.png';
import niveau4 from '../assets/pdf/niveau4.png';
import linear from '../assets/pdf/lignetop.png';
import backdrop from '../assets/pdf/backdrop.png';
import diagoriente from '../assets/pdf/diagor2.png';

import latoRegular from '../assets/pdf/fonts/Lato-Regular';
import latoBold from '../assets/pdf/fonts/Lato-Bold';
import latoSemiBold from '../assets/pdf/fonts/Lato-SemiBold';
import nunitoRegular from '../assets/pdf/fonts/Nunito-Regular';
import nunitoBold from '../assets/pdf/fonts/Nunito-Bold';

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
  const skills = parcours.data.skills;
  const themesPerso: any = [];
  let skillPro: any = null;
  skills.forEach((skill: any) => {
    if (skill.theme.type === 'personal') themesPerso.push(skill.theme.title);
    else skillPro = skill;
  });

  const competences = getParcours.data.globalCopmetences;
  let themePro, actiPro;
  if (skillPro) {
    themePro = skillPro.theme.title;
    actiPro = skillPro.activities.map((acti: any) => acti.title);
  }
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  const background = document.createElement('img');
  background.setAttribute('src', linear);
  doc.addImage(background, 'PNG', 0, 0, width, 9, '', 'FAST');

  const firstName: string = authUser.user.user.profile.firstName;
  const lastName = authUser.user.user.profile.lastName;

  const diagorienteTitle = document.createElement('img');
  diagorienteTitle.setAttribute('src', diagoriente);
  doc.addImage(diagorienteTitle, 'PNG', 12, 17, 156, 41, '', 'FAST');

  const backdropDiv = document.createElement('img');
  backdropDiv.setAttribute('src', backdrop);
  doc.addImage(backdropDiv, 'PNG', 0, 67, width, 35, '', 'FAST');

  const RF = document.createElement('img');
  RF.setAttribute('src', logoRF);
  doc.addImage(RF, 'PNG', width - 126, 87, 70, 57, '', 'FAST');

  doc.setFont('nunito', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(26, 68, 131);
  doc.text('Carte de compétences', 21, 120);

  doc.setFont('nunito', 'normal');
  doc.setFontSize(16);
  doc.text(`de ${firstName.toUpperCase()} ${lastName.toUpperCase()}`, 22, 144);

  doc.setLineWidth(1.1);
  doc.setDrawColor(215, 215, 215);
  doc.roundedRect(23, 175, 380, 245, 7, 7, 'S');

  doc.setFont('lato', 'semiBold');
  const y1 = 212;
  const niveaux = [null, niveau1, niveau2, niveau3, niveau4];
  for (let i = 0; i < 10; i++) {
    doc.setFontSize(13);
    doc.setTextColor(100, 100, 100);
    doc.text(competences[i].title, 45, y1 + i * 20);
    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    if (competences[i].value > 0) doc.text(competences[i].niveau.title, 45 + 20, y1 + 6.5 + i * 20);
    for (let j = 1; j <= competences[i].value; j++) {
      doc.addImage(niveaux[j], 'PNG', 45 + 20 + 240 + j * 16, y1 - 8.5 + i * 20, 11, 11, '', 'FAST');
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
  console.log('**', getParcours);
  const interests = getParcours.data.globalInterest.map((el: any) =>
    el.title.split('/').map((el: string) => el.trim()),
  );

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

    doc.line(x - 4, y + 15, x - 4, y + 15 + 14 * 4);
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

  if (skillPro) {
    doc.roundedRect(23, 442, 380, 120, 7, 7, 'S');

    doc.setFont('nunito', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(26, 68, 131);
    doc.text('Mon SNU', 42, 478);

    doc.setFont('lato', 'semiBold');
    doc.setFontSize(12.5);
    doc.setTextColor(100, 100, 100);
    const n3 = actiPro.length < 3 ? actiPro.length : 3;
    for (let i = 0; i < n3; i++) doc.text(actiPro[i], 42, 506 + i * 18);
  }

  doc.setFont('nunito', 'normal');
  doc.setFontSize(12.5);
  doc.setTextColor(26, 68, 131);

  doc.text('Fait à .......................................', 622, 478);
  doc.text('Le .......................................', 622, 508);
  doc.text('Signature', 622, 538);

  doc.addImage(background, 'PNG', 0, height - 9, width, 9, '', 'FAST');

  const pdfTitle =
    'Carte de compétences - ' +
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    ' ' +
    lastName[0].toUpperCase() +
    lastName.slice(1) +
    '.pdf';

  if (div) {
    doc.setProperties({
      title: pdfTitle,
    });
    const output = doc.output('datauristring');
    return output;
  }
  doc.save(pdfTitle);
}
