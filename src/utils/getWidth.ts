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
  let MARGIN: IStyle = { marginLeft: '' };
  switch (progress) {
    case 1:
      STYLE = {
        padding: '10px',
        left: '12.5%',
      };
      MARGIN = {
        marginLeft: 'position_text_1',
      };
      break;
    case 2:
      STYLE = {
        padding: '15px',
        left: 'get_left_25',
      };
      MARGIN = {
        marginLeft: 'position_text_2',
      };
      break;
    case 3:
      STYLE = {
        padding: '15px',
        left: 'get_left_50',
      };
      MARGIN = {
        marginLeft: 'position_text_3',
      };
      break;
    case 4:
      STYLE = {
        padding: '20px',
        left: 'get_left_75',
      };
      MARGIN = {
        marginLeft: 'position_text_4',
      };
      break;
  }
  return {
    STYLE,
    MARGIN,
  };
}
