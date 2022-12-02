import React from "react";
import { useParams } from "react-router-dom";
import ShopCard from "../features/shop/components/ShopCard";
import { useGetShopQuery } from "../features/shop/shopApi";

export default function SingleShop(): React.ReactElement {
  const { shop_id } = useParams();
  const { data, isLoading } = useGetShopQuery({ shop_id: shop_id! });
  if (isLoading) return <p>Loading...</p>;
  console.log(data);
  return <div>{<ShopCard shop={data?.data.shop!} enableDelete />}</div>;
}
