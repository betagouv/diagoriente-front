declare module 'reducers' {
  type ApiReducer<T = undefined> = T extends undefined
    ? { readonly fetching: boolean; readonly error: string }
    : {
      readonly fetching: boolean;
      readonly error: string;
      readonly data: T;
    };

  export interface IAPiUpdate {
    readonly fetching: boolean;
    readonly error: string;
    readonly updated: boolean;
  }
  export interface IModal {
    readonly open: boolean;
    readonly children: JSX.Element | null;
    readonly animationType: string;
    readonly backdropClassName: string | undefined;
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

  export interface IAdvisor {
    createdAt: string;
    email: string;
    parcours: string[];
    platform: string;
    profile: { pseudo: string; firstName: string; lastName: string };
    question: [];
    role: string;
    _id: string;
  }

  export interface IToken {
    readonly accessToken: string;
    readonly expiresIn: string;
    readonly refreshToken: string;
    readonly tokenType: string;
  }

  export type User = { user?: IUser; token?: IToken };

  export type Advisor = { readonly advisor?: IAdvisor; readonly token?: IToken };

  export interface IInterests {
    _id: string;
    weight: number;
    rank: string;
    nom: string;
  }

  export interface IActivity {
    _id: string;
    title: string;
    description: string;
    type: string;
    verified: boolean;
    interests: IInterests[];
  }

  export interface ITheme {
    _id: string;
    title: string;
    parentId: string;
    description: string;
    type: 'personal' | 'professional';
    verified: boolean;
    createdAt: string;
    activities: IActivity[];
    resources?: { color: string; backgroundColor: string; icon: string };
  }

  export interface ISkillPopulated {
    theme: ITheme;
    activities: IActivity[];
    competences: { _id: string; value: number }[];
    type: 'professional' | 'personal';
    _id: string;
  }

  export interface IParcoursResponse {
    completed: boolean;
    createdAt: string;
    families: [];
    skills: ISkillPopulated[];
    updatedAt: string;
    userId: string;
    _id: string;
    played: boolean;
  }
  export interface IRestResponse {
    readonly email: string;
    readonly token: string;
  }

  export interface IFamille {
    _id: string;
    nom: string;
    interests: { _id: string; nom: string; rank: string }[];
    resources?: {
      base64: string;
      mimetype: string;
      name: string;
      _id: string;
    }[];
  }
  export interface Famille {
    _id: string;
    nom: string;
    interests: { _id: string; nom: string; rank: string }[];
    resources?: {
      base64: string;
      mimetype: string;
      name: string;
      _id: string;
    };
  }

  export interface IExpertise {
    _id: string;
    title: string;
    rank: string;
    niveau: [{ title: string; sub_title?: string }];
  }

  export type ReduxState = {
    readonly startup: boolean;
    readonly modal: IModal;
    readonly authUser: {
      readonly user: User;
      readonly login: ApiReducer;
      readonly register: ApiReducer;
      readonly resetPassword: ApiReducer<IRestResponse>;
      readonly updatePassword: IAPiUpdate;
    };
    readonly authAdvisor: {
      readonly advisor: Advisor;
      readonly login: ApiReducer;
    };
    readonly expertises: ApiReducer<IExpertise[]>;
    readonly parcours: ApiReducer<IParcoursResponse>;
    readonly themes: ITheme[];
    readonly listFamille: ApiReducer<IFamille[]>;
    readonly activity: ApiReducer<IActivity>;
  };
}
