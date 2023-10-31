
export interface IMovie
{
    idMovie: number;
}

export interface IList
{
    name: string;
    id: number;
    movies: IMovie[];
}

export interface IComment
{
    name: string | null;
    comment: string | null;
    idMovie: number;
}

export interface IUser {
    userName: string | null;
    email: string | null;
    password: string | null;
    lists: IList[];
    comments: IComment[] | null;
    id?: number;
  }


