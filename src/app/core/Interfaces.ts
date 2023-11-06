
export interface IList
{
    name: string;
    id: number;
    idMovies: number[];
}

export interface IComment
{
    name: string | null;
    comment: string | null;
    idMovie: number;
}

export interface IUser {
    [x: string]: any;
    userName: string | null;
    email: string | null;
    password: string | null;
    lists: IList[];
    comments: IComment[] | null;
    id?: number;
  }


