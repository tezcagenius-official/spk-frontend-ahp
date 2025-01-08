import { IBreadcrumbProps } from "@/interfaces/components/breadcrumb/index.interface";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ list }) => {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {list.map((l, i) =>
        i + 1 !== list.length ? (
          <Link
            key={i}
            className="hover:underline"
            href={l.link ?? "/dashboard"}
          >
            {l.name}
          </Link>
        ) : (
          <Typography key={i} sx={{ color: "text.primary" }}>
            {l.name}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
