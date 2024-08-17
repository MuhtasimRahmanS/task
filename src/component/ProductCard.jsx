const FoodCard = ({ product }) => {
  const { ProductName, ProductImage, Category, Price, Ratings } = product;

  return (
    <div
      style={{
        backgroundImage: `url(${ProductImage})`,
      }}
      className="relative  overflow-hidden rounded-xl border-2 border-[#3DB043]  h-96 bg-cover bg-center"
    >
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent w-full">
        <div className="p-4 text-white w-full">
          <h2 className="text-xl font-bold mb-2">{ProductName}</h2>
          <p>Category: {Category}</p>
          <p>Price: ${Price}</p>
          <p>Rating: {Ratings}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
