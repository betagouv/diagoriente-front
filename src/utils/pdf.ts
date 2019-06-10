import jsPDF from "jspdf";
// assets
import body from "../assets/pdf/body.png";
import logoRF from "../assets/pdf/rf.png";
import logoSNU from "../assets/pdf/snu.png";
import starEmpty from "../assets/pdf/star-empty.png";
import starFull from "../assets/pdf/star-full.png";
import check from "../assets/pdf/check.png";
import niveau0 from "../assets/pdf/niveau 0.png";
import niveau1 from "../assets/pdf/niveau 1.png";
import niveau2 from "../assets/pdf/niveau 2.png";
import niveau3 from "../assets/pdf/niveau 3.png";
import niveau4 from "../assets/pdf/niveau 4.png";
import logo1 from "../assets/pdf/logo 1.png";
import linear from "../assets/pdf/linear.png";
import backdrop from "../assets/pdf/backdrop.png";
import diagoriente from "../assets/pdf/logoDiagpdf.png";

import latoRegular from "../assets/pdf/fonts/Lato-Regular";
import latoBold from "../assets/pdf/fonts/Lato-Bold";
import nunitoRegular from "../assets/pdf/fonts/Nunito-Regular";
import nunitoBold from "../assets/pdf/fonts/Nunito-Bold";

export function pdf(parcours: any, getParcours: any, authUser: any, div: any = false) {
  const doc = new jsPDF("l", "pt", "a4", true as any);
  doc.addFileToVFS("Lato-Regular", latoRegular);
  doc.addFont("Lato-Regular", "lato", "normal");
  doc.addFileToVFS("Lato-Bold", latoBold);
  doc.addFont("Lato-Bold", "lato", "bold");
  doc.addFileToVFS("Nunito-Regular", nunitoRegular);
  doc.addFont("Nunito-Regular", "nunito", "normal");
  doc.addFileToVFS("Nunito-Bold", nunitoBold);
  doc.addFont("Nunito-Bold", "nunito", "bold");
  const skills = parcours.data.skills;
  const themesPerso: any = [];
  let skillPro: any = null;
  skills.forEach((skill: any) => {
    if (skill.theme.type === "personal") themesPerso.push(skill.theme.title);
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

  const background = document.createElement("img");
  background.setAttribute("src", linear);
  doc.addImage(background, "PNG", 0, 0, width, 9, "", "FAST");

  const firstName: string = authUser.user.user.profile.firstName;
  const lastName = authUser.user.user.profile.lastName;

  const diagorienteTitle = document.createElement("img");
  diagorienteTitle.setAttribute("src", diagoriente);
  doc.addImage(diagorienteTitle, "PNG", 12, 17, 166, 41, "", "FAST");

  const backdropDiv = document.createElement("img");
  backdropDiv.setAttribute("src", backdrop);
  doc.addImage(backdropDiv, "PNG", 0, 67, width, 35, "", "FAST");

  const RF = document.createElement("img");
  RF.setAttribute("src", logoRF);
  doc.addImage(RF, "PNG", width - 168, 87, 70, 57, "", "FAST");

  const SNU = document.createElement("img");
  SNU.setAttribute("src", logoSNU);
  doc.addImage(SNU, "PNG", width - 75, 87, 57, 57, "", "FAST");

  doc.setFont("nunito", "bold");
  doc.setFontSize(30);
  doc.setTextColor(26, 68, 131);
  doc.text("Carte de compétences", 21, 120);

  doc.setFont("nunito", "normal");
  doc.setFontSize(16);
  doc.text(`de ${firstName.toUpperCase()} ${lastName.toUpperCase()}`, 22, 144);

  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(23, 175, 380, 245, 7, 7, "S");

  doc.setFont("lato", "normal");
  const y1 = 212;
  const niveaux = [null, niveau1, niveau2, niveau3, niveau4];
  for (let i = 0; i < 10; i++) {
    doc.setFontSize(13);
    doc.setTextColor(100, 100, 100);
    doc.text(competences[i].title, 45, y1 + i * 20);
    doc.setFontSize(8);
    doc.setTextColor(170, 170, 170);
    if (competences[i].value > 0) doc.text(competences[i].niveau.title, 45 + 20, y1 + 6.5 + i * 20);
    for (let j = 1; j <= competences[i].value; j++)
      doc.addImage(niveaux[j], "PNG", 45 + 20 + 240 + j * 16, y1 - 8.5 + i * 20, 11, 11, "", "FAST");
  }

  doc.roundedRect(423, 175, 230, 245, 7, 7, "S");

  const pdfTitle =
    "Carte de compétences - " +
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    " " +
    lastName[0].toUpperCase() +
    lastName.slice(1) +
    ".pdf";

  if (div) {
    doc.setProperties({
      title: pdfTitle
    });
    const output = doc.output("datauristring");
    return output;
  }
  doc.save(pdfTitle);
}
