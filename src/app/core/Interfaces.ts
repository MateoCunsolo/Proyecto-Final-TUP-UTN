
export interface IMovie
{
    nameMovie: string;
    idMovie: number;
}

export interface IList
{
    name: string;
    id: number;
    movies: IMovie[] | null;
}

export interface IComment
{
    comment: string;
    id: number;
    idMovie: number;
}

export interface IUser {
    userName: string | null;
    email: string | null;
    password: string | null;
    lists: IList[] | null;
    comments: IComment[] | null;
  }

