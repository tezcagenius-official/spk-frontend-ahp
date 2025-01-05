export interface ICreatePerbKriteriaRequest {
  perbandingan: ICreatePerbKritList[];
}

export interface ICreatePerbKritList {
  kriteria1_id: number;
  kriteria2_id: number;
  nilai_perbandingan: number;
}
