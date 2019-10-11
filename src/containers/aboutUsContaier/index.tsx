import React from 'react';
import Header from 'components_v3/Header/Header';
import home from 'assets_v3/Home/ACCUEIL.png';
import parse from 'html-react-parser';
import { useDidMount } from 'hooks';
import { getAbout } from 'requests/about';
import withApi, { ApiComponentProps } from 'hoc/withApi';
import classes from './aboutus.module.scss';

interface test {
  data: {
    title: string;
    type: string;
    page: { text: string; _id: string }[];
    _id: string;
  }[];
}
type IProps = test & ApiComponentProps<{ get: typeof getAbout }>;

const AboutContainer = ({ get }: IProps) => {
  useDidMount(() => {
    get.call('about');
  });
  const { data } = get.data;
  const renderAbout = () => {
    let result: any = [];
    if (data) {
      result = data.page.map((el: any) => <span key={el._id}>{parse(el.text)}</span>);
    }
    return <div>{result}</div>;
  };
  return (
    <div className={classes.container}>
      <Header showLogout />
      <div className={classes.TopBackground}>
        <span className={classes.title}>À PROPOS</span>
        <img src={home} alt="home" className={classes.image} />
      </div>
      <div className={classes.body}>
        <div className={classes.reponses}>{renderAbout()}</div>
      </div>
    </div>
  );
};
export default withApi({ get: getAbout })(AboutContainer);
