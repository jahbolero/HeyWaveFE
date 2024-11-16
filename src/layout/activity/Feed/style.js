import styled from 'styled-components/macro';

const Activity = styled.div`
  flex: 1;

  .MuiTabsList-root {
    margin-bottom: 30px;
  }

  .list-item {
    flex-direction: column;
    gap: 20px;

    .media {
      width: 40px;
    }

    .main {
      padding: 20px;
      position: relative;
      overflow: visible;

      &:before {
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background: var(--bg-secondary);
        left: 15px;
        top: -5px;
        transform: rotate(45deg);
      }

      &_details {
        margin: 5px 0 7px;
      }

      &_icon {
        width: 50px;
        pointer-events: none;
      }
    }
  }

  @media screen and (min-width: 568px) {
    .list-item {
      flex-direction: row;

      .media {
        width: 160px;
      }

      .main {
        flex: 1;
        padding: 40px;

        &:before {
          display: none;
        }
      }
    }
  }
`;

export default Activity