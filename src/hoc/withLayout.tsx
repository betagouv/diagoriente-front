import React, {
 forwardRef, Ref, useRef, useState,
} from 'react';
import { isEqual } from 'lodash';

import classes from 'hoc/scss/withLayout.module.scss';
import classNames from 'utils/classNames';

type Props<P> = P & {
  title?: string;
  footerButtons?: { component: JSX.Element; key: string }[];
  onFooterClick?: (button: string) => void;
};

function withLayout<P>(WrappedComponent: React.ComponentType<P>) {
  return forwardRef(function ({ title, footerButtons, ...other }: Props<P>, ref: Ref<any>) {
    const wrappedRef = useRef<any>(null);
    const [state, stateChange] = useState(false);

    function captureRef(localRef: any) {
      if (
        localRef
        && (!wrappedRef.current
          || (wrappedRef.current
            && !isEqual(localRef.footerButtonsProps, wrappedRef.current.footerButtonsProps)))
      ) {
        stateChange(!state);
      }
      wrappedRef.current = localRef;

      if (ref) {
        if (typeof ref === 'function') ref(localRef);
        // eslint-disable-next-line
        else (ref.current as any) = localRef;
      }
    }

    return (
      <div
        className={classNames(
          classes.container,
          title && classes.title_placeholder,
          classes.footer_placeholder,
        )}
      >
        <WrappedComponent {...(other as P)} ref={captureRef} />
        {title && (
          <div className={classes.title_container}>
            <h1 className={classes.title}>{title}</h1>
          </div>
        )}
        {footerButtons && (
          <div className={classes.footer_container}>
            {footerButtons.map((button, i) => {
              const onClick = () => {
                const wrapped = wrappedRef.current as any;
                if (wrapped && wrapped.onFooterClick) {
                  wrapped.onFooterClick(button.key, i);
                }
              };
              let props = {};
              if (wrappedRef.current && wrappedRef.current.footerButtonsProps) {
                props = wrappedRef.current.footerButtonsProps;
              }
              return React.cloneElement(button.component, { onClick, key: button.key, ...props });
            })}
          </div>
        )}
      </div>
    );
  });
}

export default withLayout;
