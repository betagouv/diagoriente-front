export function getWidth(width: number) {
  let WIDTH: string = '';
  switch (width) {
    case 0:
      WIDTH = '0px';
      break;
    case 1:
      WIDTH = '25px';
      break;
    case 2:
      WIDTH = '50';
      break;
    case 3:
      WIDTH = '75px';
      break;
    case 4:
      WIDTH = '100px';
      break;
  }
  return WIDTH;
}
type style = {
  padding: string;
  left: string;
};
type IStyle = {
  marginLeft: string;
};
export function getProgress(progress: number) {
  let STYLE: style = { padding: '', left: '' };
  let MARGIN: IStyle = { marginLeft: '0px' };
  switch (progress) {
    case 1:
      STYLE = {
        padding: '10px',
        left: '12.5%',
      };
      MARGIN = {
        marginLeft: '50px',
      };
      break;
    case 2:
      STYLE = {
        padding: '15px',
        left: '25%',
      };
      MARGIN = {
        marginLeft: '90px',
      };
      break;
    case 3:
      STYLE = {
        padding: '15px',
        left: '50%',
      };
      MARGIN = {
        marginLeft: '-55px',
      };
      break;
    case 4:
      STYLE = {
        padding: '20px',
        left: '75%',
      };
      MARGIN = {
        marginLeft: '0px',
      };
      break;
  }
  return {
    STYLE,
    MARGIN,
  };
}
