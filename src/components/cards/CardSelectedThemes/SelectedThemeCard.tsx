import React from 'react';
import classes from './selectedCard.module.scss';

interface IProps {
    title: string;
    logo?: string;
    open?: boolean;
}

const SelectedCard = ({ title, logo, open }: IProps) => (
    <div className={classes.container}>
        {logo && <div className={classes.logo_container}>
            <img alt='logo' src={logo} className={classes.logo} />
        </div>}
        <span className={classes.theme_title}>{title}</span>
    </div>
)
export default SelectedCard;