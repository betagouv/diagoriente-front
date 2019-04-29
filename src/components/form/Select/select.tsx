import React, { Component, } from 'react';
import style from './select.module.scss';
import { IQuestion } from 'reducers';
import { isEmpty } from 'lodash';
import Arrow from '../../../assets/icons/arrow.png';
import onClickOutside from "react-onclickoutside";

type IProps = {
    open: boolean;
    selectOpen: () => void;
    selectClose: () => void;
    onChange: (question: IQuestion) => void;
    value: string;
    options: IQuestion[];
    className: string

}

class Select extends Component<IProps> {
    handleClickOutside = () => {
        this.props.selectClose();
    };
    render() {
        const { className, selectOpen,selectClose, value, options, onChange,open } = this.props
        return (
            <div className={className} onClick={()=>selectOpen()}>
                <div className={style.login_container_input}>

                    <div className={style.text_container}>
                        {value}
                    </div>
                    <div onClick={()=>selectOpen()} className={style.img_container}>
                        <img src={Arrow} className={style.arrow} />
                    </div>
                    {open && <div className={style.select_drop}>
                        {!isEmpty(options) && options.map(el => (
                            <div key={el.title} onClick={() => onChange(el)} className={style.select_item}>{el.title}</div>
                        ))}
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default onClickOutside(Select);
