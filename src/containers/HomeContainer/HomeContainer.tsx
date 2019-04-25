import React from 'react';
import Button from '../../components/buttons/RoundButton/RoundButton';
import Circle from '../../components/ui/Circle/Circle';
import Card from '../../components/cards/Card/Card';
import WithSub from '../../components/ui/WithSub/WithSub';
import './home.css';
import HomeCard from '../../components/cards/HomeCard/HomeCard';

const HomeContainer = () => {
  return (
    <div style={{ width: 300 }}>
      hello world
      <Button>Commencer</Button>
      <Circle>1</Circle>
      <div>
        <Card>Numerique</Card>
      </div>
      <WithSub title={'Voyage'} subTitle={'Releve tex competence'} />
      <div style={{ width: 500 }}>
        <HomeCard
          title="repond a quelques questions sur tes passions"
          subTitle="lorem ipsum yanap butomatu crown lavat froma class tacktic slfsdlfjk skdjf ssdfljkns dmlfk sdmlf,sdlkf sldkjfsdlfkjsd sdlfk jsdlf "
          image="https://steemitimages.com/p/hgjbkodzNP3kumx8jDvG5UJWWNpEGQeXqQ3r48B8V6PwVj3oj4MLE4JUz5Fdxy8kEpZLox2JDyr5N2ki5XzdFgSFRv?format=match&mode=fit"
          buttonText="commencer"
          cardNumber={1}
        />
      </div>
    </div>
  );
};

export default HomeContainer;
