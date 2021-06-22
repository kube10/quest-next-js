import Link from "next/link";

const Estates = ({ estates }) => {
  return (
    <div>
      {estates.map((estate) => (
        <p key={estate.id}>
          <Link href="/estate/[id]" as={`/estate/${estate.id}`}>
            {estate.address}
          </Link>{" "}
          {estate.number}
          <br />
          {estate.purpose.id === 1
            ? "Te koop"
            : estate.purpose.id === 2
            ? "Te huur"
            : "Life anuity sale"}
        </p>
      ))}
    </div>
  );
};

export default Estates;
