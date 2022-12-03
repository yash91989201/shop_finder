import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetShopsQuery } from "../features/shop/shopApi";
import { useAddShopMutation } from "../features/shop/shopApi";
// custom components
import ShopCard from "../features/shop/components/ShopCard";

interface FormProps {
  name: string;
  area: string;
  category: string;
  opening_date: Date;
  closing_date: Date;
}

// function dateValidation({ open, close }: { open: Date; close: Date }): boolean {
//   if (open.getTime > close.getTime) return false;
//   return true;
// }

export default function MyShops(): React.ReactElement {
  const { data: shop_list, refetch } = useGetShopsQuery("");
  const [addShopMutation] = useAddShopMutation();
  const { register, handleSubmit, reset } = useForm<FormProps>();
  const addShop: SubmitHandler<FormProps> = async (formData) => {
    const res = await addShopMutation(formData);
    console.log(res);
    refetch();
    reset();
  };
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold text-center text-indigo-500 md:text-left">
        Manage your shops.
      </h2>
      <div className="flex flex-col max-w-6xl px-3 space-y-6 md:px-0 md:flex-row md:space-y-0">
        <div className="flex flex-col flex-1 px-6 space-y-6 md:px-0">
          {!!shop_list &&
            shop_list.data.shop.map((shop) => (
              <Link to={`/my-shops/${shop._id}`} key={shop._id}>
                <ShopCard shop={shop} />
              </Link>
            ))}
        </div>
        <div className="p-6 text-white bg-indigo-100 border rounded md:mx-3 h-fit">
          <form
            onSubmit={handleSubmit(addShop)}
            className="flex flex-col space-y-6"
          >
            <p className="mb-3 text-xl font-semibold text-center text-black">
              Add new shop
            </p>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
              className="p-2 text-black rounded "
            />
            <input
              type="text"
              {...register("area", { required: true })}
              placeholder="Area"
              className="p-2 text-black rounded "
            />
            <input
              type="text"
              {...register("category", { required: true })}
              placeholder="Category"
              className="p-2 text-black rounded "
            />
            <div className="flex space-x-3">
              <label htmlFor="" className="flex flex-col space-y-2 text-black ">
                <span>Opening Date</span>
                <input
                  type="date"
                  {...register("opening_date", { required: true })}
                  className="p-2 text-black rounded "
                />
              </label>
              <label htmlFor="" className="flex flex-col space-y-2 text-black">
                <span>Closing Date</span>
                <input
                  type="date"
                  {...register("closing_date", { required: true })}
                  className="p-2 rounded "
                />
              </label>
            </div>
            <button
              type="submit"
              className="p-2 font-semibold text-white bg-indigo-500 rounded-full"
            >
              Add Shop
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
