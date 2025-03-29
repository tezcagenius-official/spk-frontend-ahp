export interface ICreateDivisiRequest {
    nama_divisi: string;
}

export interface IUpdateDivisiRequest {
    body: { nama_divisi: string };
    divisi_id: number;
}

export interface IDeleteDivisiRequest {
    divisi_id: number;
}
