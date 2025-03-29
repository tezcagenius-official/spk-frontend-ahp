export interface IDivisionProps {
    role: string;
}

export interface IFormDivision {
    type?: "create" | "update";
    divisi_id?: number;
    nama_divisi: string;
}
