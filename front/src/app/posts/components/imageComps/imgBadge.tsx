import React from 'react';
import NumericLabel from 'react-pretty-numbers';

type Props = {
  children: any;
  count: number | null;
};

var option = {
  justification: 'C',
  locales: 'en-AU',
  currency: false,
  // 'currencyIndicator':'AUD',
  percentage: false,
  // 'precision':1,
  wholenumber: null,
  commafy: true,
  shortFormat: true,
  shortFormatMinValue: 1000,
  shortFormatPrecision: 1,
  title: true,
  cssClass: ['red'],
};

const ImgBadge = ({ children, count }: Props) => {
  return (
    <div>
      <span className="relative inline-block">
        {children}

        {count ? (
          <span className="absolute bottom-7 left-5 transform rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
            <NumericLabel params={option}>{count}</NumericLabel>
          </span>
        ) : (
          <></>
        )}
      </span>
    </div>
  );
};

export default ImgBadge;
