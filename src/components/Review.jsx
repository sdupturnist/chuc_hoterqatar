export default function Review({ data }) {


  const filledStars = Math.floor(data?.rating ?? null); // Whole stars
  const halfStar = data?.rating % 1 >= 0.5;    // Check if there's a half star
  const emptyStars = 5 - Math.ceil(data?.rating); // Remaining empty stars




  const renderStars = (count, filled) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          fill={filled ? "#E7B66B" : "#E2DFDA"}
          viewBox="0 0 16 15"
        >
          <path d="m8 .33 2.125 5.075 5.483.453-4.169 3.59 1.263 5.354L8 11.946l-4.702 2.856L4.56 9.447.39 5.857l5.484-.452L8 .33Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <li>
      <span>{data?.author ?? null}</span>
      <div className="flex mt-[12px] mb-[16px]">
        {renderStars(filledStars, true)}
        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            fill="#E7B66B"
            viewBox="0 0 16 15"
          >
            <path d="m8 .33 2.125 5.075 5.483.453-4.169 3.59 1.263 5.354L8 11.946l-4.702 2.856L4.56 9.447.39 5.857l5.484-.452L8 .33Z" />
          </svg>
        )}
        {renderStars(emptyStars, false)}
      </div>
      <p className="text-gray-500">{data?.comment ?? null}</p>
      <span className="block text-gray-500 mt-[16px]">{data?.postedDate ?? null}</span>
    </li>
  );
}
