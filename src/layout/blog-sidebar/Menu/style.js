import styled from 'styled-components/macro';

const StyledMenu = styled.div`
  max-width: 460px;
  margin-left: auto;
  width: 100%;

  @media screen and (min-width: 1024px) {
    margin-top: 25px;
  }

  .block {
    &:not(:last-child) {
      padding-bottom: 30px;
      border-bottom: 1px solid var(--divider);
    }

    .list-item {
      height: var(--elements-height);
      border: 1px solid var(--divider);
      padding: 0 20px;
      line-height: 1;
      transition: border-color var(--transition);

      &:hover, &.active {
        border-color: var(--accent);
      }

      .icon-calendar {
        font-size: 20px;
      }
    }
  }

  .react-calendar {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--divider);

    &__navigation {
      height: var(--elements-height);
      border-radius: 10px;
      background: var(--bg-tertiary);
      margin-bottom: 10px;
      text-align: center;
      display: flex;
      align-items: center;
      font-family: var(--heading-font);
      color: var(--text-light);
      font-size: var(--text-sm);
      pointer-events: none;

      &__arrow {
        display: none;
      }
    }

    &__tile {
      height: 42px;
      aspect-ratio: 1/1;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: all var(--transition);
      margin: 0 auto;

      &:hover {
        border-color: var(--accent);
        color: var(--text-light);
      }

      &--now {
        background: var(--accent);
        color: var(--bg-secondary) !important;
        border-color: var(--accent);
        font-weight: 600;
      }
    }

    &__month-view {
      &__weekdays {
        margin-bottom: 10px;
        gap: 10px;
        display: grid !important;
        grid-template-columns: repeat(7, 1fr);

        // --- iPhone XR ---

        @media screen and (min-width: 414px) {
          gap: 12px;
        }

        &__weekday {
          font-weight: 500;
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 34px;
          border-radius: 10px;
          border: 1px solid var(--divider);

          abbr {
            text-decoration: none;
          }
        }
      }

      &__days {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr);
      }
    }
  }
`;

export default StyledMenu