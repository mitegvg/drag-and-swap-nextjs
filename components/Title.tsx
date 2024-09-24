import styled from "styled-components";

type TitleProps = {
  size?: "small" | "medium" | "large";
};

const sizeStyles = {
  small: `
    font-size: 12px;
    line-height: 16px;
  `,
  medium: `
    font-size: 16px;
    line-height: 20px;
  `,
  large: `
    font-size: 24px;
    line-height: 28px;
  `,
};

// Make sure 'Title' is initialized properly before export
const Title = styled.div<TitleProps>`
  font-style: normal;
  font-weight: 700;
  ${({ size = "medium" }) => sizeStyles[size]}
`;

export default Title;
