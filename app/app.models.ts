export class Pagination {
  constructor(public page: number,
              public perPage: number,
              public prePage: number | null,
              public nextPage: number | null,
              public total: number,
              public totalPages: number) {
  }
}

export interface JWTClaims {
  sub: string;
  created: number;
  exp: number;
  authorities: string[];
}

export interface BaseEntity {
  id?: number;
}

export interface Tema extends BaseEntity {
  naziv: string;
  forum: Forum;
  objave: Objava[];
}

export interface Forum extends BaseEntity {
  naziv: string;
  javni: boolean;
  teme: Tema[];
  korisniciNaForumu: KorisnikNaForumu[];
}

export interface Uloga extends BaseEntity {
  naziv: string;
  korisniciNaForumu: KorisnikNaForumu[];
}

export interface RegisteredUser extends BaseEntity {
  korisnickoIme: string;
  email: string;
  korisniciNaForumu: KorisnikNaForumu[];
}

export interface KorisnikNaForumu extends BaseEntity {
  registrovanKorisnik: RegisteredUser;
  korisnickoIme: string;
  uloge: Uloga[];
  forum: Forum;
}

export interface Objava extends BaseEntity {
  vremePostavljanja: Date;
  sadrzaj: string;
  fajlovi: File[];
}

export interface AuthResponse extends BaseEntity {
  jwt: string;
}
