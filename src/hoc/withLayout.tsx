import React, { forwardRef, Ref, useRef } from 'react';

import classes from 'hoc/scss/withLayout.module.scss';
import classNames from 'utils/classNames';
import { useCaptureRef } from 'hooks/useCaptureRef';

type Props<P> = P & {
  title?: string;
  footerButtons?: { component: JSX.Element; key: string }[];
  onFooterClick?: (button: string) => void;
};

function withLayout<P>(WrappedComponent: React.ComponentType<P>) {
  return forwardRef(function ({ title, footerButtons, ...other }: Props<P>, ref: Ref<any>) {
    const wrappedRef = useRef<any>(null);

    useCaptureRef(wrappedRef.current, ref);

    return (
      <div
        className={classNames(
          classes.container,
          title && classes.title_placeholder,
          classes.footer_placeholder,
        )}
      >
        <WrappedComponent {...(other as P)} ref={wrappedRef} />
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
              return React.cloneElement(button.component, { onClick, key: button.key });
            })}
          </div>
        )}
      </div>
    );
  });
}

export default withLayout;
