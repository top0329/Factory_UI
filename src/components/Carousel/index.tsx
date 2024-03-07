import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import { CarouselModel } from '../../types';
import { useAtom } from 'jotai';
import { activeAddComponentTokenAtom } from '../../jotai/atoms';

type Props = {
  data: CarouselModel[];
  autoPlay?: boolean;
  size?: 'normal' | 'large';
  headerTextType?: 'black' | 'white';
  subTextType?: 'black' | 'white';
  animationDuration?: 1 | 2 | 3 | number;
  leftItem?:
    | React.ReactHTMLElement<HTMLElement>
    | React.ReactNode
    | React.ReactChild;
  rightItem?:
    | React.ReactHTMLElement<HTMLElement>
    | React.ReactNode
    | React.ReactChild;
};

export const Carousel = ({
  data,
  autoPlay = false,
  size = 'normal',
  headerTextType = 'black',
  subTextType = 'white',
  animationDuration = 3,
  leftItem,
  rightItem,
}: Props) => {
  const [activeItem, setActiveItem] = useAtom<number>(
    activeAddComponentTokenAtom
  );
  const [onDragState, setOnDragState] = useState(0);

  const handleNextSlide = useCallback(
    (increase: boolean) => {
      if (increase) {
        if (activeItem + 1 > data.length - 1) {
          setActiveItem(0);
        } else {
          setActiveItem(activeItem + 1);
        }
      } else {
        if (activeItem === 0) {
          setActiveItem(data.length - 1);
        } else {
          setActiveItem(activeItem - 1);
        }
      }
    },
    [activeItem, data.length, setActiveItem]
  );

  useEffect(() => {
    autoPlay &&
      setTimeout(() => {
        handleNextSlide(true);
      }, animationDuration * 1000);
  }, [activeItem, animationDuration, autoPlay, handleNextSlide]);

  const onDragEnded = (e: React.DragEvent) => {
    if (e.clientX - onDragState < 150) {
      handleNextSlide(true);
    } else if (e.clientX - onDragState > 400) {
      handleNextSlide(false);
    }
  };

  const onDragStarted = (e: React.DragEvent) => setOnDragState(e.clientX);
  return (
    <div
      className={`container w-full justify-center ${
        size === 'normal' ? 'container-normal' : 'container-large'
      }`}
    >
      {data.map((item, index) => {
        let className = 'inner ';

        // Determine and append the correct class for each item based on activeItem index
        switch (index) {
          case activeItem:
            className += 'active-item';
            break;
          case (activeItem + 1) % data.length: // Use modulus to loop back to the start of the array
            className += 'right-active-item';
            break;
          case (activeItem - 1 + data.length) % data.length: // Use modulus to loop to the end of the array
            className += 'left-active-item';
            break;
          default:
            // This should not happen since there are only three items
            break;
        }
        return (
          <div
            className={className}
            key={index}
            onDragStart={onDragStarted}
            onDragEnd={onDragEnded}
          >
            <img
              src={item.image}
              width="100%"
              className={`max-h-32 min-w-[240px] image rounded-xl xs:max-h-44 sm:max-h-56 sm:min-w-[380px] md:max-h-60 md:min-w-[400px] ${
                size === 'normal' ? 'image-normal' : 'image-large'
              }`}
            />
            {item.headerText && (
              <p
                className={`header-text ${
                  headerTextType === 'white'
                    ? 'header-text-white'
                    : 'header-text-black'
                }
               ${
                 size === 'normal'
                   ? 'header-text-normal-size'
                   : ' header-text-large-size'
               }
              `}
              >
                {item.headerText}
              </p>
            )}
            {item.subText && (
              <p
                className={`sub-text ${
                  subTextType === 'white' ? 'sub-text-white' : 'sub-text-black'
                }
                 ${
                   size === 'normal'
                     ? 'sub-text-normal-size'
                     : 'sub-text-large-size'
                 }`}
              >
                {item.subText}
              </p>
            )}
            {index === activeItem && (
              <div className="active-render-item">
                {leftItem ? (
                  <div
                    onClick={() => handleNextSlide(false)}
                    className="custom-item"
                  >
                    {leftItem}
                  </div>
                ) : (
                  <span
                    className="default-item"
                    onClick={() => handleNextSlide(false)}
                  >
                    ←
                  </span>
                )}
                {rightItem ? (
                  <div
                    onClick={() => handleNextSlide(true)}
                    className="custom-item"
                  >
                    {rightItem}
                  </div>
                ) : (
                  <span
                    className="default-item"
                    onClick={() => handleNextSlide(true)}
                  >
                    →
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
