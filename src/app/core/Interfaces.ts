
export interface IList
{
    name: string;
    id: number;
    idMovies: number[];
}

export interface IComment
{
    username: string | null;
    text: string | null;
    idMovie: number;
    user_id?: number;
}

export interface IUser {
    userName: string | null;
    email: string | null;
    password: string | null;
    lists: IList[];
    comments: IComment[] | null;
    id?: number;
  }


export interface User {
    userName: string | null;
    email: string | null;
    password: string | null;
}