import React, { useState, RefObject } from 'react';
import playIcon from 'assets_v3/icons/svgIcons/copy.svg';
import classes from './GroupeCard.module.scss';

interface Props {
  title: string;
  code: string;
  users: any[];
}
const GroupeCard = ({ title, code, users }: Props) => {
  const [isOpen, changeOpen] = useState(false);
  const ref: RefObject<HTMLSpanElement> = React.createRef();
  function copyToClipBoard() {
    if (ref.current) {
      const copyedText = ref.current.innerText;
      const textArea = document.createElement('textarea');
      textArea.value = copyedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('Copy');
      textArea.remove();
      document.execCommand('copy');
    }
  }
  return (
    <div className={classes.groupeCard}>
      <div className={classes.headerContainer}>
        <div className={classes.nameContainer}>
          <div
            className={classes.triangle}
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            onClick={() => changeOpen(!isOpen)}
          />
          <span style={{ marginLeft: '3px' }}>{`${title}`}</span>
        </div>
        <div className={classes.codeGroupeContainer}>
          <span>Code Groupe:</span>
          <span className={classes.code} ref={ref}>
            {code}
          </span>
          <img
            src={playIcon}
            alt="play"
            className={classes.playIcon}
            onClick={() => copyToClipBoard()}
          />
        </div>
      </div>
      <div className={classes.headerContainer2}>
        <span>
          {' '}
          {`${users.length} membres`}
        </span>
        <button>Actualiser</button>
      </div>
    </div>
  );
};
export default GroupeCard;
