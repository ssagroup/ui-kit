import styled from '@emotion/styled';

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  className?: string;
}

const Container = styled.div<{ direction?: string }>`
  display: flex;
  justify-content: space-between;

  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  align-items: ${({ direction }) =>
    direction === 'column' ? 'normal' : 'center'};
`;

const CardContent = ({ children, ...props }: CardProps) => (
  <Container {...props}>{children}</Container>
);

export default CardContent;
