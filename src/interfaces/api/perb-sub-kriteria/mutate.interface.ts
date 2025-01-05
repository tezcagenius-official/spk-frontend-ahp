export interface ICreatePerbSubKriteriaRequest {
  kriteria_id: number;
  perbandingan: ICreatePerbSubKritList[];
}

export interface ICreatePerbSubKritList {
  sub_kriteria1_id: number;
  sub_kriteria2_id: number;
  nilai_perbandingan: number;
}
