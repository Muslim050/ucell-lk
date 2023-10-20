import React from 'react';
import style from './AutoExit.module.scss';
import { ReactComponent as Quit } from 'src/assets/Quit.svg';

function AutoExit() {
  const [isTooltip, setIsTooltip] = React.useState(false);

  const handleProfileClick = () => {
    setIsTooltip(!isTooltip);
  };
  return (
    <>
      <div>
        <div className={style.tooltipWrapper}>
          <button
            className={style.tooltipWrapper__wrapper}
            onClick={handleProfileClick}
          >
            <Quit style={{ width: '16px', height: '16px' }} />
            <div
              style={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '18px',
                color: 'white',
                marginLeft: '5px'
              }}
            >
              20:47
            </div>
          </button>
        </div>

        {isTooltip && (
          <div className={style.tooltipWrapper__tooltip}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px'
                }}
              >
                <div
                  style={{
                    width: '125px',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '17px',
                    color: '#898989'
                  }}
                >
                  Автоматический выход через:
                </div>
                <div
                  style={{
                    fontWeight: '400',
                    fontSize: '24px',
                    lineHeight: '44px',
                    color: '#898989'
                  }}
                >
                  29:47
                </div>
              </div>
              <div style={{ height: '100%', display: 'flex' }}>
                <button
                  style={{
                    width: '95px',
                    background: '#C41B79',
                    fontSize: '20px',
                    height: '60px',

                    color: 'white',
                    borderRadius: '0px 12px 12px 0px'
                  }}
                >
                  {' '}
                  Выйти
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AutoExit;
