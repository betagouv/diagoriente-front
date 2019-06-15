import React from 'react';
import { Carousel as BaseCarousel, CarouselProps } from 'react-responsive-carousel';
import ReactTooltip from 'react-tooltip';

import Grid from '../Grid/Grid';

import scrollArrow from '../../../assets/icons/svg/scrollArrow.svg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './carousel.module.scss';
import classNames from '../../../utils/classNames';

type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;

interface Section<T> {
  title: string;
  data: T[];
  [key: string]: any;
}

interface Props<T> extends CarouselProps {
  sections: Section<T>[];
  renderItem: (data: T, index: number) => JSX.Element;
  renderTitle: (data: Section<T>, index: number) => JSX.Element;
  sectionWrapperComponent: ArgumentsType<typeof React.cloneElement>[0];
  itemWrapperComponent: ArgumentsType<typeof React.cloneElement>[0];
  sectionKeyExtractor: (section: Section<T>, index: number) => string | number;
  itemKeyExtractor: (item: T, index: number) => string | number;
  renderStepper?: (section: Section<T>, active: boolean, index: number) => JSX.Element;
}

interface State {
  selectedItem: number;
  height: 'auto' | number;
  opacity: number;
  arrowsTop: number | null;
}

class Carousel<T> extends React.PureComponent<Props<T>, State> {
  static defaultProps = {
    sectionKeyExtractor: (section: any, index: number) => index,
    itemKeyExtractor: (item: any, index: number) => index,
    sectionWrapperComponent: <Grid container padding={{ xl: 0 }} />,
    itemWrapperComponent: <Grid item xl={12} />,
  };

  state: State = {
    selectedItem: 1,
    height: 'auto',
    opacity: 0,
    arrowsTop: null,
  };

  wrapperRefs: (HTMLDivElement | undefined)[] = [];
  itemsRefs: (HTMLDivElement | undefined)[][] = [];
  carousel: React.RefObject<BaseCarousel> = React.createRef();
  container: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    const height = this.getMaxHeight();
    if (height) {
      this.setState({ height });
    }
  }

  componentDidUpdate(props: Props<T>, state: State) {
    if (this.props.sections.length !== props.sections.length) {
      this.setState({ height: 'auto' });
    }

    if (this.state.height === 'auto' && state.height !== 'auto') {
      const height = this.getMaxHeight();
      if (height) {
        this.setState({ height, selectedItem: 1 });
      }
    }
    if (typeof this.state.height === 'number' && state.height === 'auto' && this.carousel.current) {
      this.carousel.current.setState({ selectedItem: 0 }, () => {
        this.setState({ opacity: 1, selectedItem: 0 });
      });
    }

    if (this.state.selectedItem !== state.selectedItem && this.itemsRefs[this.state.selectedItem]) {
      const currentLength = this.props.sections[this.state.selectedItem].data.length;
      const lastRef = this.itemsRefs[this.state.selectedItem][currentLength - 1];
      const containerRef = this.container.current;
      if (lastRef && containerRef) {
        this.setState({ arrowsTop: lastRef.offsetTop + lastRef.clientHeight });
      }
    }
  }

  getMaxHeight = () => {
    return this.wrapperRefs.reduce((result, ref) => {
      if (ref) {
        return Math.max(result, ref.getBoundingClientRect().height);
      }
      return result;
    },                             0);
  }

  goToPrevious = () => {
    this.setState((state: State) => ({ selectedItem: state.selectedItem - 1 }));
  }

  goToNext = () => {
    this.setState((state: State) => ({ selectedItem: state.selectedItem + 1 }));
  }

  onItemChange = (selectedItem: number) => {
    this.setState({ selectedItem });
  }

  renderStepper = (section: Section<T>, active: boolean, index: number) => {
    const onClick = () => {
      this.setState({ selectedItem: index });
    };
    return (
      <>
        <div
          data-tip
          data-for={section.title}
          onClick={onClick}
          className={classNames(classes.stepper_circle, active && classes.stepper_circle_active)}
          key={`div${index}`}
        >
          <div className={classNames(classes.stepper_small_circle, active && classes.stepper_small_circle_active)} />
        </div>
        <ReactTooltip key={`tooltip${index}`} id={section.title} place="left" type="light" className={classes.tooltip}>
          {section.title}
        </ReactTooltip>
      </>
    );
  }

  render() {
    const {
      sections,
      renderItem,
      renderTitle,
      sectionWrapperComponent,
      itemWrapperComponent,
      sectionKeyExtractor,
      itemKeyExtractor,
      renderStepper,
      ...other
    } = this.props;
    return (
      <div ref={this.container} className={classes.wrapper} style={{ opacity: this.state.opacity }}>
        
        <BaseCarousel
          onChange={this.onItemChange}
          selectedItem={this.state.selectedItem}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          stopOnHover={false}
          axis={'vertical'}
          {...other}
          ref={this.carousel}
        >
        
          {sections.map((section, index) => {
            const captureWrapperRef = (ref: HTMLDivElement) => {
              this.wrapperRefs[index] = ref;
            };

            return (
              <div
                key={sectionKeyExtractor(section, index)}
                style={{ height: this.state.height }}
                className={classes.section_wrapper}
                ref={captureWrapperRef}
              >
                {React.cloneElement(
                  sectionWrapperComponent,
                  {},
                  <>
                    {renderTitle(section, index)}
                    {section.data.map((d, i) => {
                      const captureItemRef = (ref: HTMLDivElement) => {
                        if (!this.itemsRefs[index]) {
                          this.itemsRefs[index] = [];
                        }
                        this.itemsRefs[index][i] = ref;
                      };

                      return (React.cloneElement as any)(
                        itemWrapperComponent,
                        { key: itemKeyExtractor(d, i), ref: captureItemRef },
                        renderItem(d, i),
                      );
                    })}
                  </>,
                )}
              </div>
            );
          })}
        </BaseCarousel>
        <div className={classes.stepper}>
        <span  className={classes.titleCarousel}>Secteur</span>
          {sections.map((section, index) => {
            const active = this.state.selectedItem === index;
            if (renderStepper) return renderStepper(section, active, index);
            return this.renderStepper(section, active, index);
          })}
        </div>
        <div style={this.state.arrowsTop ? { top: this.state.arrowsTop + 20 } : {}} className={classes.nav_arrows}>
          {this.state.selectedItem !== 0 && (
            <div className={`${classes.nav_arrow} ${classes.nav_arrow_left}`}>
              <img onClick={this.goToPrevious} height={25} width={25} src={scrollArrow} />
            </div>
          )}
          {this.state.selectedItem !== this.props.sections.length - 1 && (
            <div className={classes.nav_arrow}>
              <img onClick={this.goToNext} height={25} width={25} src={scrollArrow} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
