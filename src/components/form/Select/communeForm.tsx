import React, { MouseEvent, Fragment } from 'react';
import onClickOutside from 'react-onclickoutside';
import { isEmpty } from 'lodash';
import { ICommune } from 'requests';

// style
import style from './select.module.scss';
// image

type IProps = {
  open: boolean;
  selectOpen: (e: MouseEvent<HTMLElement>) => void;
  selectClose: (e: MouseEvent<HTMLElement>) => void;
  onChange: (value: any) => void;
  value: ICommune;
  options: ICommune[];
  className: string;
  placeholder: string;
  onChangeValue: (event: any) => void;
};

const Select = ({
  className,
  selectOpen,
  selectClose,
  value,
  options,
  onChange,
  onChangeValue,
  open,
  placeholder,
}: IProps) => {
  (Select as any).handleClickOutside = (e: any) => {
    if (!open) {
      selectClose(e);
    }
  };

  let title = placeholder;
  if (value) {
    const selectedOption = !isEmpty(options) && options.find(o => o.Code_commune_INSEE === value.Code_commune_INSEE);
    title = selectedOption ? selectedOption.Libelle_acheminement : placeholder;
  }

  return (
    <div className={style.selectContainer} onClick={selectOpen}>
      <div className={style.communeInput}>
        <input
          type="text"
          className={style.text_container}
          placeholder={title}
          onChange={onChangeValue}
        />

        {open && (
          <div className={style.select_drop}>
            {!isEmpty(options)
              && options.map(el => {
                const onChangeText = (e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  onChange(el);
                };
                return (
                  <div key={el.Code_postal} onClick={onChangeText} className={style.select_item}>
                    {el.Code_commune_INSEE}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
const clickOutsideConfig = {
  handleClickOutside: () => (Select as any).handleClickOutside,
};
export default onClickOutside(Select, clickOutsideConfig);
