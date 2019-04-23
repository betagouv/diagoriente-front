declare module 'reducers' {
  interface ApiReducer {
    readonly fetching: boolean;
    readonly error: string;
  }

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

  export type ReduxState = {
    readonly startup: boolean;
    readonly modal: IModal;
    readonly authUser: {
      readonly user: User;
      readonly login: ApiReducer;
      readonly register: ApiReducer;
    };
  };
}
