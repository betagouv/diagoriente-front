import React, { forwardRef, Ref, useRef } from 'react';

import classes from './scss/withLayout.module.scss';
import classNames from '../utils/classNames';

type Props<P> = P & {
  title?: string;
  footerButtons?: string[];
  onFooterClick?: (button: string) => void;
};

function withLayout<P>(WrappedComponent: React.ComponentType<P>) {
  /*tslint:disable:ter-prefer-arrow-callback */
  return forwardRef(function ({ title, footerButtons, ...other }: Props<P>, ref: Ref<any>) {
    const wrappedRef = useRef<any>(null);
    const captureRef = (localRef: any) => {
      wrappedRef.current = localRef;
      if (ref) {
        if (typeof ref === 'function') ref(localRef);
        else (ref.current as any) = ref;
      }
    };

    return (
      <div className={classNames(classes.container, title && classes.title_placeholder, classes.footer_placeholder)}>
        <WrappedComponent {...other as P} ref={captureRef} />
        {title && (
          <div className={classes.title_container}>
            <h1 className={classes.title}>{title}</h1>
          </div>
        )}
        {footerButtons && (
          <div className={classes.footer_container}>
            {footerButtons.map(button => {
              const onClick = () => {
                const wrapped = wrappedRef.current as any;
                if (wrapped && wrapped.onFooterClick) {
                  wrapped.onFooterClick(button);
                }
              };
              return (
                <button className={classes.footer_button} key={button} onClick={onClick}>
                  {button}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  });
}

export default withLayout;
