import React from 'react';

interface FormatterPriceProps {
  data: number | null | undefined;
}

function FormatterPrice(props: FormatterPriceProps) {
  const number = props.data;
  const formattedNumber = number ? number.toLocaleString('en-US') : ' ';
  return (
    <div>
      <div>{formattedNumber}</div>
    </div>
  );
}

export default FormatterPrice;
