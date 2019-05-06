declare module 'reducers' {
  type ApiReducer<T = undefined> = T extends undefined
    ? { readonly fetching: boolean; readonly error: string }
    : {
      readonly fetching: boolean;
      readonly error: string;
      readonly data: T;
    };

  export interface IModal {
    readonly open: boolean;
    readonly children: JSX.Element | null;
    readonly animationType: string;
  }

  export interface IUser {
    readonly _id: string;
    readonly uniqId: string;
    readonly role: string;
    readonly platform: string;
    readonly parcours: [];
    readonly profile: {
      readonly firstName: string;
      readonly lastName: string;
    };
    readonly createdAt: string;
  }

  export interface IToken {
    readonly accessToken: string;
    readonly expiresIn: string;
    readonly refreshToken: string;
    readonly tokenType: string;
  }

  export type User = { user: IUser; token: IToken } | {};

  export interface IInterests {
    _id: string;
    weight: number;
    rank: string;
    nom: string;
  }

  export interface IActivity {
    _id: string;
    title: string;
    type: string;
    verified: boolean;
    interests: IInterests[];
  }

  export interface ITheme {
    _id: string;
    title: string;
    parentId: string;
    description: string;
    type: string;
    verified: boolean;
    createdAt: string;
    activities: IActivity[];
    resources: { color: string; backgroundColor: string; icon: string };
  }

  export type ICurrentParcours = {
    completed: boolean;
    createdAt: string;
    families: [];
    skills: [];
    updatedAt: string;
    userId: string;
    _id: string;
  };

  export interface IParcours {
    readonly themes: ITheme[];
    readonly activities: { readonly [key: string]: IActivity[] };
    readonly competences: { readonly [key: string]: { readonly _id: string; readonly value: number }[] };
    readonly lastIndex: number;
  }
  export interface IQuestion {
    readonly _id: string;
    readonly title: string;
  }

  export type ReduxState = {
    readonly startup: boolean;
    readonly modal: IModal;
    readonly authUser: {
      readonly user: User;
      readonly login: ApiReducer;
      readonly register: ApiReducer;
    };
    readonly parcours: IParcours;
    readonly questions: IQuestion;
    readonly currentParcours: ApiReducer<ICurrentParcours>;
  };
}
