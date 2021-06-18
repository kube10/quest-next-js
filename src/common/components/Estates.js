const Estates = ({ estates }) => {
  return (
    <div>
      {estates.map((estate, index) => (
        <p key={`estate-${index}`}>{estate.address}</p>
      ))}
    </div>
  );
};

export default Estates;
