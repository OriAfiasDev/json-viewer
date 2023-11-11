import styled from 'styled-components';

export const Text = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;
