import type { FC, SVGProps } from "react";

import * as Icons from "./assets";

const colors = {
  black: "[&_*]:stroke-black  dark:[&_*]:stroke-[#c2c2c2] ",
  primary: "[&_*]:stroke-primary-light-0 [&_*]:fill-primary-light-0",
  default: "",
} as const;

type Colors = keyof typeof colors;

export type IconName = keyof typeof Icons;

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  color?: Colors;
}
export const Icon = ({ name, className, color = "default", ...rest }: Props) => {
  const Svg = Icons[name] as FC<SVGProps<SVGSVGElement>>;

  return <Svg className={`${className} ${colors[color]}`} {...rest} />;
};
