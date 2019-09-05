import React from 'react';
import acceuil from 'assets_v3/tuto/1.png';
import theme from 'assets_v3/tuto/2.png';
import actvities from 'assets_v3/tuto/3.png';
import competencesPerso from 'assets_v3/tuto/4.png';
import successPerso from 'assets_v3/tuto/5.png';
import intermediate from 'assets_v3/tuto/6.png';
import addPro from 'assets_v3/tuto/7.png';
import searchPro from 'assets_v3/tuto/8.png';
import competencesPro from 'assets_v3/tuto/9.png';
import MultiIcon from 'components_v3/icons/multiIcon/multiIcon';
import classes from './tuto.module.scss';

interface Props {
  type:
    | 'acceuil'
    | 'themes'
    | 'actvities'
    | 'competencesPerso'
    | 'successPerso'
    | 'intermediate'
    | 'addPro'
    | 'competencesPro'
    | 'searchPro';
  click: () => void;
  passer?: () => void;
}

const TutoModal = ({ type, click, passer }: Props) => {
  const setSrc = () => {
    let src: string = '';
    switch (type) {
      case 'acceuil':
        src = acceuil;
        break;
      case 'themes':
        src = theme;
        break;
      case 'actvities':
        src = actvities;
        break;
      case 'competencesPerso':
        src = competencesPerso;
        break;
      case 'successPerso':
        src = successPerso;
        break;
      case 'intermediate':
        src = intermediate;
        break;
      case 'addPro':
        src = addPro;
        break;
      case 'competencesPro':
        src = competencesPro;
        break;
      case 'searchPro':
        src = searchPro;
        break;
      default:
        console.log('object');
    }
    return src;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.header}>
          <MultiIcon width="60" height="60" type="help" className={classes.help} />
          <span className={classes.title}> aide</span>
        </div>
        <img src={setSrc()} alt="tuto" className={classes.img} />
        <div className={classes.buttonsContainer}>
          <MultiIcon
            type={type === 'acceuil' ? 'play' : 'validate'}
            width="35"
            height="35"
            withText
            text={type === 'acceuil' ? 'Mini-Jeu Tutoriel' : 'Compris'}
            onClick={click}
            Iconcolor="#ffba27"
            textColor="#ffba27"
            className={classes.compris}
          />
          {type === 'acceuil' && (
            <MultiIcon
              type="remove"
              width="35"
              height="35"
              withText
              text="PASSER L’INTRODUCTION"
              onClick={passer}
              Iconcolor="#FF001F"
              textColor="#FF001F"
              className={classes.compris}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default TutoModal;
