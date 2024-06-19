import { type WithSession } from "fresh-session";

export type State = {
    branchId: number;
    csrf: string;
    userId: string;
    userName: string;
    accessToken?: string;
  } & WithSession;

export type PostState = State & { formData: FormData };