import React from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  withArrow?: boolean;
};

const Button = ({}: ButtonProps) => {
  return <div>Button</div>;
};

export default Button;
