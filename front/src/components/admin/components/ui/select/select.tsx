import React from "react";
import ReactSelect, { Props, components } from "react-select";
import { selectStyles } from "./select.styles";

const Input = (props: any)  => (
  <components.Input 
     {...props} 
     inputClassName="outline-none border-none shadow-none focus:ring-transparent "
  />
)

export type Ref = any;

export const Select = React.forwardRef<Ref, Props>((props, ref) => (
  <ReactSelect ref={ref} placeholder={props.placeholder} styles={props.customStyle? props.customStyle : selectStyles} {...props}   components={{ Input }}  />
  // <ReactSelect ref={ref} styles={selectStyles} {...props}  />
));
export default Select;
