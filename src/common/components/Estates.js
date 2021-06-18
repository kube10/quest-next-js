import Link from "next/link";

const Estates = ({ estates }) => {
  return (
    <div>
      {estates.map((estate) => (
        <p key={estate.id}>
          <Link href="/estate/[id]" as={`/estate/${estate.id}`}>
            {estate.address}
          </Link>
        </p>
      ))}
    </div>
  );
};

export default Estates;
