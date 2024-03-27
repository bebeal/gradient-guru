import { forwardRef } from "react";
import { Spinner } from "./Icons";

export const Loader = forwardRef((props?: any, ref?: any) => {
  const { className = '', ...rest } = props;
  return <Spinner ref={ref} className={cn('animate-spin', className)} {...rest} />;
});
