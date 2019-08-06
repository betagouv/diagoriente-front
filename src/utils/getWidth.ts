export function getWidth(width: number) {
  let WIDTH: string = '';
  switch (width) {
    case 0:
      WIDTH = '0px';
      break;
    case 1:
      WIDTH = 'get_width_25_px';
      break;
    case 2:
      WIDTH = 'get_width_50_px';
      break;
    case 3:
      WIDTH = 'get_width_75_px';
      break;
    case 4:
      WIDTH = 'get_width_100_px';
      break;
    default:
      WIDTH = '0px';
  }
  return WIDTH;
}
type style = {
  padding?: string;
  left?: string;
  marginLeft?: string;
  right?: string;
};
type IStyle = {
  marginLeft: string;
};
export function getProgress(prog: number) {
  let STYLE: style = { padding: '', left: '' };
  let MARGIN: IStyle = { marginLeft: '' };
  switch (prog) {
    case 0:
      STYLE = {
        padding: '10px',
        left: 'get_left_0',
        marginLeft: '40px',
      };
      MARGIN = {
        marginLeft: 'position_text_1',
      };
      break;

    case 1:
      STYLE = {
        padding: '0px',
        left: 'get_left_25',
      };
      MARGIN = {
        marginLeft: 'position_text_2',
      };
      break;

    case 2:
      STYLE = {
        padding: '15px',
        left: 'get_left_50',
      };
      MARGIN = {
        marginLeft: 'position_text_3',
      };
      break;

    case 3:
      STYLE = {
        padding: '15px',
        left: 'get_left_75',
      };
      MARGIN = {
        marginLeft: 'position_text_4',
      };
      break;
    case 4:
      STYLE = {
        padding: '20px',
        right: 'get_left_100',
      };
      MARGIN = {
        marginLeft: 'position_text_5',
      };
      break;
    default:
      STYLE = {
        padding: '10px',
        left: 'get_left_0',
        marginLeft: '40px',
      };
      MARGIN = {
        marginLeft: 'position_text_1',
      };
  }
  return {
    STYLE,
    MARGIN,
  };
}
export function progress(width: number) {
  let WIDTH: string = '';
  switch (width) {
    case 1:
      WIDTH = '25%';
      break;
    case 2:
      WIDTH = '50%';
      break;
    case 3:
      WIDTH = '75%';
      break;
    case 4:
      WIDTH = '100%';
      break;
    default:
      WIDTH = '100%';
  }
  return WIDTH;
}
