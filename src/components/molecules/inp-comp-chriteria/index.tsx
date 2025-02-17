import { IInpCompChriteriaParams } from "@/interfaces/components/inp-create-chriteria/index.interface";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import React from "react";

const InpCompChriteria: React.FC<IInpCompChriteriaParams> = ({
  data: { id, kriteria1_id, kriteria2_id, nilai_perbandingan },
  datakriteria,
  onRemoveList,
  register,
  i,
  onValueChange,
  disableAll = false,
  disableRemove = false,
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
          {...register(`perbandingan.${i}.kriteria1_id`)}
          className="grow"
          size="small"
          disabled={disableAll}
          options={datakriteria?.data ?? []}
          isOptionEqualToValue={(option, value) =>
            option.kriteria_id === value.kriteria_id
          }
          value={
            datakriteria?.data?.find((dk) => dk.kriteria_id === kriteria1_id) ??
            (null as any) // eslint-disable-line
          }
          getOptionLabel={(option) => option?.nama_kriteria ?? ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kriteria 1"
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
                kriteria1_id: value.kriteria_id,
                kriteria2_id,
                nilai_perbandingan,
              });
          }}
        />
        <Autocomplete
          {...register(`perbandingan.${i}.kriteria2_id`)}
          className="grow"
          size="small"
          disabled={disableAll}
          options={datakriteria?.data ?? []}
          isOptionEqualToValue={(option, value) =>
            option.kriteria_id === value.kriteria_id
          }
          value={
            datakriteria?.data?.find((dk) => dk.kriteria_id === kriteria2_id) ??
            (null as any) // eslint-disable-line
          }
          getOptionLabel={(option) => option?.nama_kriteria ?? ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kriteria 2"
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
                kriteria1_id,
                kriteria2_id: value.kriteria_id,
                nilai_perbandingan,
              });
          }}
        />
        <TextField
          disabled={disableAll}
          size="small"
          label="Nilai Perbandingan"
          type="number"
          key={id}
          {...register(`perbandingan.${i}.nilai_perbandingan`)}
        />
      </div>
    </div>
  );
};

export default InpCompChriteria;
