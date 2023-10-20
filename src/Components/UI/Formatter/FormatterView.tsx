function FormatterView(props: any) {
  const number = props.data;

  const trimmedNumber = number.toString().slice(0, -2);
  const formattedNumber = trimmedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (
    <div>
      <div>{formattedNumber}</div>
    </div>
  );
}

export default FormatterView;
