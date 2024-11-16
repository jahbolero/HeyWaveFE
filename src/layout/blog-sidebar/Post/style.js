import styled from 'styled-components/macro';

export const StyledPost = styled.div`
  .media {
    position: relative;
    height: 220px;
    //padding: 20px;

    &_img {
      z-index: -1;
      height: 100%;
      width: 100%;

      img {
        height: 100%;
      }
    }
  }

  .main {
    &_meta {
      margin: 15px 0;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--divider);
    }

    &_title {
      display: inline-block;
      margin-bottom: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .media {
      height: 300px;
    }

    .main_meta {
      margin: 20px 0;
      padding-bottom: 20px;
    }
  }

  // --- desktop ---

  @media screen and (min-width: 1280px) {
    .media {
      height: 450px;
    }
  }
`;

export const StyledPinnedPost = styled(StyledPost)`
  grid-area: 1 / 1 / 2 / 3;
  display: grid;
  grid-template-columns: minmax(0, 900px) minmax(0, 360px);
  gap: 60px;
  align-items: center;

  // --- desktop ---

  @media screen and (min-width: 1280px) {
    grid-template-columns: minmax(0, 900px) minmax(0, 460px);
  }
`;