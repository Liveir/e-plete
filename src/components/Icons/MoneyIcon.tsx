import React from "react";
import { IconSvgProps } from "@/types/svg";

export const MoneyIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 20 20"
    width={size || width}
    {...props}
  >
    <path
      fill="currentColor"
      d="M8 6a2 2 0 1 1 3.999-.001A2 2 0 0 1 8 6m9 4H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1M0 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2"
    />
  </svg>
);
