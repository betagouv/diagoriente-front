import { IFamille } from 'reducers';
const addPrevFamily = (families: IFamille[], prevFamily: string[]): IFamille[] => {
  const copySelected: IFamille[] = [];

  prevFamily.forEach(item => {
    const family = families.find(obj => obj._id === item);
    if (family) {
      copySelected.push(family);
    }
  });
  return copySelected;
};
export default addPrevFamily;
