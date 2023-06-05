import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import { Icon } from "@/component/common/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  endComponents?: ReactNode;
}

//FIX : forwardRef 적용(추후에 autofocus 등을 위해 ref 사용 고려) , 나중에 Form 추가 고려
export const InputBase = forwardRef(function InputBase(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { endComponents, ...rest } = props;

  return (
    <>
      <input {...rest} ref={ref} />
      {endComponents}
    </>
  );
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  onSearchByKeyWord?: () => void;
}

export const SearchInput = ({ onReset, onSearchByKeyWord, value, ...rest }: Props) => {
  return (
    <form
      className="relative flex w-full items-center justify-start p-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchByKeyWord?.();
      }}
    >
      <InputBase
        className="h-48 w-full rounded-30 bg-gray-100 pl-24 pr-72 text-16-medium-140 text-black outline-none placeholder:text-[#c2c1c9] dark:bg-ui-dark-2 dark:text-white"
        value={value}
        {...rest}
        endComponents={
          <>
            {value && (
              <Icon
                className="absolute right-54 cursor-pointer"
                height={24}
                name="searchDelete"
                width={24}
                onClick={onReset}
              />
            )}
            <button className="absolute right-24">
              <Icon color="black" height={24} name="smallSearch" width={24} />
            </button>
          </>
        }
      />
    </form>
  );
};
