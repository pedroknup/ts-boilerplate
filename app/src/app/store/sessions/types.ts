import { user } from '../../../../../api/src/entities/user';
export interface Session {
  token: string;
  user: user;
}

export interface ISessionState {
  token: string;
  isLoading: boolean;
  errorMsg: string;
  instagramId?: string;
  facebookId?: string;
  FBToken?: string;
  IGToken?: string;
  email?: string;
  password?: string;
  user?: user;
}

export interface ILoginPayload {
  email?: string;
  password?: string;
}
export interface SessionGroup {
  startTime: string;
  sessions: Session[];
}
