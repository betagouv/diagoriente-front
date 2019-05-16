import { IFamille } from 'reducers';
const addPrevFamily = (families: IFamille[], prevFamily: string[]): IFamille[] => {
  const copySelected: IFamille[] = [];

  prevFamily.forEach(item => {
    const xxx = families.filter(obj => obj._id === item);
    copySelected.push(xxx[0]);
  });
  return copySelected;
};
export default addPrevFamily;
