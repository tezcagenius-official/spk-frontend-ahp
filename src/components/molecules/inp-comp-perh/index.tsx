import { IInpCompPerhParams } from "@/interfaces/components/inp-comp-perh/index.interface";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const InpCompPerh: React.FC<IInpCompPerhParams> = ({
    data: { id, kriteria_id, sub_kriteria_id },
    datakriteria,
    datasubkriteria,
    i,
    register,
    onValueChange,
    disableAll = false,
}) => {
    return (
        <div className="mt-3">
            <div className="flex gap-2 items-center mb-1">
                <h2
                    className={`text-xl font-semibold ${
                        disableAll && "text-neutral-500"
                    }`}
                >
                    Kriteria {i + 1}
                </h2>
                {/* <IconButton
                    className="space-x-1"
                    type="button"
                    color="error"
                    disabled={disableRemove || disableAll}
                    onClick={() => onRemoveList?.()}
                >
                    <FontAwesomeIcon icon={faEraser} />
                </IconButton> */}
            </div>
            <div className="flex py-1 gap-1">
                <Autocomplete
                    {...register(`penilaian.${i}.kriteria_id`)}
                    className="grow"
                    size="small"
                    disabled
                    options={datakriteria?.data ?? []}
                    isOptionEqualToValue={(option, value) =>
                        option.kriteria_id === value.kriteria_id
                    }
                    value={datakriteria?.data?.find(
                        (dk) => dk.kriteria_id === kriteria_id
                    )}
                    getOptionLabel={(option) => option?.nama_kriteria ?? ""}
                    getOptionKey={(option) => option.kriteria_id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Kriteria"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: "search",
                                },
                            }}
                        />
                    )}
                    onChange={(_, value) => {
                        if (value && value.kriteria_id)
                            onValueChange?.({
                                id,
                                kriteria_id: value.kriteria_id,
                                sub_kriteria_id,
                            });
                    }}
                />
                <Autocomplete
                    {...register(`penilaian.${i}.sub_kriteria_id`)}
                    className="grow"
                    size="small"
                    disabled={disableAll}
                    options={datasubkriteria ?? []}
                    isOptionEqualToValue={(option, value) =>
                        option.sub_kriteria_id === value.sub_kriteria_id
                    }
                    value={datasubkriteria?.find(
                        (dk) => dk.sub_kriteria_id === sub_kriteria_id
                    )}
                    getOptionLabel={(option) => option?.nama_sub_kriteria ?? ""}
                    getOptionKey={(option) => option.sub_kriteria_id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Sub Kriteria"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    type: "search",
                                },
                            }}
                        />
                    )}
                    onChange={(_, value) => {
                        if (value && value.sub_kriteria_id)
                            onValueChange?.({
                                id,
                                kriteria_id,
                                sub_kriteria_id: value.sub_kriteria_id,
                            });
                    }}
                />
            </div>
        </div>
    );
};

export default InpCompPerh;
