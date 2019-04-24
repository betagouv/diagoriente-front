import { IInterests } from './interest';

export interface IActivity {
  _id: string;
  title: string;
  type: string;
  verified: boolean;
  interests: IInterests[];
}
