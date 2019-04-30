import React, { MouseEvent } from 'react';
import onClickOutside from 'react-onclickoutside';
import { isEmpty } from 'lodash';
// reducers
import { IQuestion } from 'reducers';
// style
import style from './select.module.scss';
// image
import Arrow from '../../../assets/icons/arrow.png';

type IProps = {
  open: boolean;
  selectOpen: () => void;
  selectClose: () => void;
  onChange: (value: string) => void;
  value: string;
  options: { value: string; label: string }[];
  className: string;
  placeholder: string
}

const Select = ({ className, selectOpen, selectClose, value, options, onChange, open, placeholder }: IProps) => {
  (Select as any).handleClickOutside = () => selectClose();

  let title = placeholder
  if (value) {
    const selectedOption = options.find(o => o.value === value)
    title = selectedOption ? selectedOption.label : placeholder
  }


  return (
    <div className={className} onClick={selectOpen}>
      <div className={style.login_container_input}>

        <div className={style.text_container}>
          {title}
        </div>
        <div onClick={selectOpen} className={style.img_container}>
          <img src={Arrow} className={style.arrow} />
        </div>
        {open && <div className={style.select_drop}>
          {!isEmpty(options) && options.map(el => {
            const onChangeText = (e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation()
              onChange(el.value);
            }
            return (
              <div key={el.value} onClick={onChangeText} className={style.select_item}>{el.label}</div>
            )
          })}
        </div>
        }
      </div>
    </div>
  )
}
const clickOutsideConfig = {
  handleClickOutside: () => (Select as any).handleClickOutside,
};
export default onClickOutside(Select, clickOutsideConfig);
