import styled from 'styled-components/macro';

export const BlogSidebarWrapper = styled.div`
  position: relative;

  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: minmax(0, 900px) minmax(0, 360px);
    gap: 60px;
  }

  @media screen and (min-width: 1280px) {
    grid-template-columns: minmax(0, 900px) minmax(0, 460px);
  }
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 30px;

  @media screen and (min-width: 768px) {
    gap: 60px;
  }
`;