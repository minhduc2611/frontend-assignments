export type IPagination = {
  page: number;
  limit: number;
};

export type CommonEntity = {
  id: number;
}

export type RestResponse<N extends string, T> = {
    _embedded: {
        [K in N]: T[];
    };
}