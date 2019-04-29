import React from 'react';
import Button from '../../components/buttons/RoundButton/RoundButton';
import Circle from '../../components/ui/Circle/Circle';
import Card from '../../components/cards/Card/Card';
import WithSub from '../../components/ui/WithSub/WithSub';
import './home.css';
import HomeCard from '../../components/cards/HomeCard/HomeCard';

const HomeContainer = ({ history }: any) => {
  const navigate = () => {
    history.push('/themes');
  };

  const items1 = [];
  for (let i = 0; i < 12; i += 1) {
    items1.push(<div className={'item-1'} style={{ background: 'blue', height: 50 }} />);
  }

  const items2 = [];
  for (let i = 0; i < 6; i += 1) {
    items2.push(<div className={'item-2'} style={{ background: 'blue', height: 50 }} />);
  }

  const items3 = [];
  for (let i = 0; i < 4; i += 1) {
    items3.push(<div className={'item-3'} style={{ background: 'blue', height: 50 }} />);
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={'container'}>{items1}</div>
      <div style={{ marginTop: 20 }} className={'container'}>
        {items2}
      </div>
      <div style={{ marginTop: 20 }} className={'container'}>
        {items3}
      </div>
      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-4'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-8'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-5'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-7'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-6'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-6'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-7'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-5'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-8'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-4'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-9'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-3'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-10'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-2'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-11'} style={{ background: 'blue', height: 50 }} />
        <div className={'item-1'} style={{ background: 'blue', height: 50 }} />
      </div>

      <div style={{ marginTop: 20 }} className={'container'}>
        <div className={'item-12'} style={{ background: 'blue', height: 50 }} />
      </div>

      <Card>Famille</Card> 
    </div>
  );
};

export default HomeContainer;
