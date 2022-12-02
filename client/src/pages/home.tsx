import { useGetShopsQuery } from "../features/shop/shopApi";
// custom components
import ShopCard from "../features/shop/components/ShopCard";

export default function Home(): React.ReactElement {
  const { data: shop_list, isLoading } = useGetShopsQuery("");

  if (isLoading) return <p>Loading ...</p>;
  return (
    <section>
      <div className="space-y-3">
        {!!shop_list &&
          shop_list.data.shop.map((shop) => (
            <ShopCard shop={shop} key={shop._id} />
          ))}
      </div>
    </section>
  );
}
