import { useGetShopsQuery } from "../features/shop/shopApi";
// custom components
import ShopCard from "../features/shop/components/ShopCard";

export default function Home(): React.ReactElement {
  const { data: shop_list, isLoading } = useGetShopsQuery("");

  if (isLoading) return <p>Loading ...</p>;
  return (
    <section>
      <div className="flex flex-col flex-1 px-6 space-y-6 md:px-0">
        {!!shop_list &&
          shop_list.data.shop.map((shop) => (
            <ShopCard shop={shop} key={shop._id} />
          ))}
      </div>
    </section>
  );
}
