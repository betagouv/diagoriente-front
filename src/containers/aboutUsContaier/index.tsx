import React, { useState } from 'react';
import Header from 'components_v3/Header/Header';
import home from 'assets_v3/Home/ACCUEIL.png';
import parse from 'html-react-parser';
import classes from './aboutus.module.scss';

interface test {
  data: { rebrique: string; questions: { question: string; response: any }[]; _id: string }[];
}

const AboutContainer = () => {
  const [list, setList] = useState<test | null>(null);
  const [faq, sertFaq] = useState<any>({});
  const [selected, setSelected] = useState('');
  const [rubrique, setRubrique] = useState('');
  const [questionId, setId] = useState('');

  return (
    <div className={classes.container}>
      <Header showLogout />

      <div className={classes.TopBackground}>
        <span className={classes.title}>À PROPOS</span>
        <img src={home} alt="home" className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.reponses}>
          <span className={classes.bigTitle}>{rubrique}</span>

          <div className={classes.questionAnswer}>
            <h3 className={classes.question}>Qu’est-ce que DiagOriente ?</h3>
            <span>
              Diagoriente est une application numérique accompagnée qui propose auxjeunes d’explorer
              leurs expériences, d’analyser leurs compétencestransversales et d’identifier leurs
              intérêts professionnels pour se dessinerun avenir et choisir leur voie.
            </span>
          </div>
          <div className={classes.questionAnswer}>
            <h3 className={classes.question}>Qui se cache derrière DiagOriente ?</h3>
            <span>
              DiagOriente est le produit d’un assemblage composite d’expertisesdiverses: sociologie
              et sciences de l’éducation/orientation, ingénieriepédagogique et multimédia,
              développement web, UX/UI design... toutesces spécialités se sont conjuguées pour
              concevoir, tester, développer etaméliorer en continu l’application.Soutenu par la
              DGEFP (délégation générale à l’emploi et à la formationprofessionnelle) du Ministère
              du Travail et la DINSIC (direction placée sous l'autorité du Premier ministre, chargée
              de coordonner les actions desadministrations en matière de systèmes d'information)dans
              le cadre duprogramme StartUp d’Etat, DiagOriente est aussi le fruit d’un
              partenariatfertile incluant des organisations oeuvrant au quotidien pour l’éducation
              etl’insertion des jeunes: Missions locales, Écoles de la 2ème Chance, Epide,collèges,
              etc. Tous ces partenaires nous ont chaleureusement ouvert leursportes pour concevoir
              l’application qui existe aujourd’hui.
            </span>
          </div>
          <div className={classes.questionAnswer}>
            <h3 className={classes.question}>A qui s’adresse DiagOriente</h3>
            <span>
              Diagoriente s’adresse à tous les jeunes qui se posent des questions surleur
              orientation, qu’ils soient scolarisés ou non, soit:- aux jeunes qui cherchent à
              s’insérer professionnellement, accompagnésou non par les acteurs du monde de l’emploi
              (Missions locales, Pôleemploi, Cap emploi, etc.);- aux collégiens et lycéens ayant à
              former des choix d’orientation,notamment en classes de 3ème, 1ère et Terminale;- aux
              étudiants envisageant une réorientation.
            </span>
          </div>
          <div className={classes.questionAnswer}>
            <h3 className={classes.question}> De quelles compétences parle-t-on ?</h3>
            <span>
              {`Une“compétence est un savoir agir prenant appui sur la mobilisation et lacombinaison
              efficaces d’une variété de ressources internes (savoir,capacité cognitive, capacité
              métacognitive, savoir-faire relationnel, savoir-faire procédural, ressources
              physiologiques, ressources émotionnelles,...)et externes (réseaux, logiciels, banques
              de données, ressourcesdocumentaires, membres du collectif, moyens de
              l’environnementprofessionnel,...) à l’intérieur d’une situation dans un contexte
              donné.”(Jacques Tardif -2006).Les compétences transversales sont des compétences
              mobilisablesdans diverses situations professionnelles.Pour valoriser les compétences
              transversales des jeunes, nous avonschoisi de nous appuyer sur le référentiel RECTEC
              (fruit d’un partenariateuropéen réunissant des experts reconnus à l’échelle
              internationale pourleurs travaux sur les compétences et leur certification)qui en
							distingue10 :`}
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '10px',
                margin: '2px 0px 10px 10px',
              }}
            >
              <span>1.Organiser son activité</span>
              <span>2.Gérer des informations</span>
              <span>3.Agircollectivement</span>
              <span>4.Communiquer à l’oral</span>
              <span>5.Communiquer à l’écrit</span>
              <span>6.Agir face à l’imprévu</span>
              <span>7.Prendre en compte les règles</span>
              <span>8.Prendre en compte les codes sociaux</span>
              <span>9.Utiliser le numérique </span>
              <span>10.Utiliser les mathématiques</span>
            </div>
            <span>Pour approfondir RECTEC: ici</span>
          </div>
          <div className={classes.questionAnswer}>
            <h3 className={classes.question}>Comment est né DiagOriente?</h3>
            <span>
              Financés par la DGEFP via un programme appelé StartUp d’Etat, incubé àla DINSIC, nous
              avons eu la chance de pouvoir dédier un temps précieuxet utilement long où nous
              définissions notre futur produit. Le concept a pris sa source dans 8 ans de travaux
              autour de la valorisationdes compétences transversales et il s’est précisé au sein des
              Missionslocales, à la suite de 200 entretiens menés avec des jeunes en
              parcoursaccompagné d’insertion (Garantie Jeune). Cette enquête exploratoire nousa
              permis de comprendre ce que ces jeunes attendaient du dispositif etcomment ils
              envisageaient une application numérique à leur service aucours de cet accompagnement
              vers l’emploi. Par la suite, nous avons testé, avec les jeunes de Garantie Jeune et
              enversion papier, toutes les versions possibles de la future application webjusqu’à
              déterminer celle qui serait développée pour de nouvellesexpérimentations, digitalisées
              cette fois. Dans les 9 mois suivants, les aller-retours furent nombreux et
              toujoursfructueux pour adapter le déroulé, les contenus, le vocabulaire,l’ergonomie,
              les graphismes et bien d’autres choses encore aux attenteset besoins des jeunes. (plus
              de 5000 jeunes testeurs)
            </span>
          </div>
          <div className={classes.questionAnswer}>
            <h3 className={classes.question}>DiagOriente demain</h3>
            <span>
              DiagOriente est profilée pour devenir un service public d’orientationentièrement
              gratuit pour les professionnels jeunesse. L’application a vocation à s’enrichir en
              continu de nouvellesfonctionnalités qui seront jugées utiles par son public. Un
              système de «Notes de version» en tiendra informé chacun dans larubrique «Actualités»
              de ce site.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutContainer;
