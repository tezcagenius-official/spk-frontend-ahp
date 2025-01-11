import { IInpCompSubChriteriaParams } from "@/interfaces/components/inp-create-sub-chriteria/index.interface";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, IconButton, Input, TextField } from "@mui/material";
import React from "react";

const InpCompSubChriteria: React.FC<IInpCompSubChriteriaParams> = ({
  data: { id, sub_kriteria1_id, sub_kriteria2_id, nilai_perbandingan },
  dataSubKriteria,
  onRemoveList,
  register,
  i,
  onValueChange,
  disableRemove = false,
  disableAll = false,
}) => {
  return (
    <div className="mt-3">
      <div className="flex gap-2 items-center mb-1">
        <h2 className="text-xl font-semibold">Sub Kriteria {i + 1}</h2>
        <IconButton
          className="space-x-1"
          type="button"
          color="error"
          disabled={disableRemove || disableAll}
          onClick={() => onRemoveList?.()}
        >
          <FontAwesomeIcon icon={faEraser} />
        </IconButton>
      </div>
      <div className="flex py-1 gap-1">
        <Autocomplete
          {...register(`perbandingan.${i}.sub_kriteria1_id`)}
          className="grow"
          size="small"
          options={dataSubKriteria?.data ?? []}
          isOptionEqualToValue={(option, value) =>
            option.sub_kriteria_id === value.sub_kriteria_id
          }
          value={dataSubKriteria?.data?.find(
            (dk) => dk.sub_kriteria_id === sub_kriteria1_id
          )}
          disabled={disableAll}
          getOptionLabel={(option: any) => option.nama_sub_kriteria}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sub Kriteria 1"
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: "search",
                },
              }}
            />
          )}
          onChange={(_, value: any) => {
            if (value && value.sub_kriteria_id)
              onValueChange?.({
                id,
                sub_kriteria1_id: value.sub_kriteria_id,
                sub_kriteria2_id,
                nilai_perbandingan,
              });
          }}
        />
        <Autocomplete
          {...register(`perbandingan.${i}.sub_kriteria2_id`)}
          className="grow"
          size="small"
          options={dataSubKriteria?.data ?? []}
          disabled={disableAll}
          isOptionEqualToValue={(option, value) =>
            option.sub_kriteria_id === value.sub_kriteria_id
          }
          value={dataSubKriteria?.data?.find(
            (dk) => dk.sub_kriteria_id === sub_kriteria2_id
          )}
          getOptionLabel={(option: any) => option.nama_sub_kriteria}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sub Kriteria 2"
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: "search",
                },
              }}
            />
          )}
          onChange={(_, value: any) => {
            if (value && value.sub_kriteria_id)
              onValueChange?.({
                id,
                sub_kriteria1_id,
                sub_kriteria2_id: value.sub_kriteria_id,
                nilai_perbandingan,
              });
          }}
        />
        <TextField
          size="small"
          label="Nilai Perbandingan"
          type="number"
          disabled={disableAll}
          key={id}
          {...register(`perbandingan.${i}.nilai_perbandingan`)}
        />
      </div>
    </div>
  );
};

export default InpCompSubChriteria;
