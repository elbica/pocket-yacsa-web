import type { ButtonHTMLAttributes } from "react";
import React, { useState } from "react";

interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  defaultChecked?: boolean;
  onClick?: (on: boolean) => void;
}

const Switch = ({ onClick, defaultChecked, ...rest }: SwitchProps) => {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      {...rest}
      aria-checked={on}
      className="relative flex h-27 items-center"
      role="switch"
      onClick={() => {
        onClick?.(!on);
        setOn((p) => !p);
      }}
    >
      <span className={(on ? "bg-primary-light-0" : "bg-ui-light-5") + " h-22 w-44 rounded-11"} />
      <span
        className={`l-0 pointer-events-none absolute inline-block h-20 w-20 rounded-10 bg-white shadow-[0_1.3px_1.3px_rgba(0,0,0,0.3)] transition-transform ${
          on ? "translate-x-23" : "translate-x-1"
        } `}
      />
    </button>
  );
};

export default Switch;
