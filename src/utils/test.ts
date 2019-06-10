const background = document.createElement("img");
background.setAttribute("src", body);
doc.addImage(background, "PNG", 25, 25, width - 50, height - 50, "", "FAST");
const firstName: string = authUser.user.user.profile.firstName;
const lastName = authUser.user.user.profile.lastName;

doc.setFontSize(12);
doc.setTextColor(0, 49, 137);
doc.setFont("lato", "bold");
doc.text(`DE ${firstName.toUpperCase()} ${lastName.toUpperCase()}`, 350, height / 3.4, { charSpace: 2 });
const SNU = document.createElement("img");
SNU.setAttribute("src", logoSNU);
doc.addImage(SNU, "PNG", 80, 80, 85, 75, "", "FAST");
const RF = document.createElement("img");
RF.setAttribute("src", logoRF);
doc.addImage(RF, "PNG", width - 180, 80, 90, 80, "", "FAST");
doc.setFont("lato", "bold");
doc.setFontSize(10);
doc.setTextColor(0, 49, 137);
doc.text("Mes expériences", 80, 215, { charSpace: 0 });
const checked = document.createElement("img");
checked.setAttribute("src", check);
const fullStar = document.createElement("img");
fullStar.setAttribute("src", starFull);
const emptyStar = document.createElement("img");
emptyStar.setAttribute("src", starEmpty);
doc.setFont("lato", "normal");
doc.setFontSize(8);
const n1 = themesPerso.length < 5 ? themesPerso.length : 5;
for (let i = 0; i < n1; i++) {
  doc.addImage(checked, "PNG", 80, 230 + i * 15, 5, 5, "", "FAST");
  doc.text(themesPerso[i], 90, 235 + i * 15);
}
doc.setFont("lato", "bold");
doc.setFontSize(10);
const y2 = 235 + n1 * 15 + 10;
doc.text("Mes intérêts", 80, y2);
doc.setFont("lato", "normal");
doc.setFontSize(8);
const interests = getParcours.data.globalInterest.map((el: any) => el.title);
const n2 = interests.length < 5 ? interests.length : 5;
let lines = 0;
for (let i = 0; i < n2; i++) {
  const splitText = doc.splitTextToSize(interests[i], 100);
  doc.addImage(checked, "PNG", 80, y2 + 15 + lines * 10, 5, 5, "", "FAST");
  doc.text(splitText, 90, y2 + 20 + lines * 10, { maxWidth: 100 });
  lines += splitText.length;
}

if (skillPro) {
  doc.setFont("lato", "bold");
  doc.setFontSize(10);
  const y3 = y2 + 20 + lines * 10 + 10;
  doc.text("Mon SNU : ce que j'apprécie le plus", 80, y3, { maxWidth: 90 });
  doc.setFont("lato", "normal");
  doc.setFontSize(8);
  lines = 0;
  const n3 = actiPro.length < 3 ? actiPro.length : 3;
  for (let i = 0; i < n3; i++) {
    const splitText = doc.splitTextToSize(actiPro[i], 100);
    doc.addImage(checked, "PNG", 80, y3 + 30 + lines * 10, 5, 5, "", "FAST");
    doc.text(splitText, 90, y3 + 35 + lines * 10, { maxWidth: 100 });
    lines += splitText.length;
  }
}

doc.setFont("lato", "bold");
doc.setFontSize(12);

for (let i = 0; i < 10; i++) {
  const row = i >= 5 ? i - 5 : i;
  const col = i >= 5 ? 260 : 0;
  const x = 195 + col;
  const y = 230 + row * 40;
  for (let j = 1; j <= 4; j++) {
    doc.addImage(j <= competences[i].value ? starFull : starEmpty, "PNG", x + j * 15, y - 10, 11, 11, "", "FAST");
  }
  doc.text(competences[i].title, x + 82, y);
}

doc.setFont("lato", "normal");
doc.setFontSize(8);
doc.text("Fait à ………………………………………………………", 480, 470);
doc.text("Le …………………………………………………………", 480, 490);
doc.text("Signature", 480, 510);
