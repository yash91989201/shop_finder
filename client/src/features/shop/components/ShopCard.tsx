import { ShopType } from "../shopApi";
import { MdLocationOn, MdCategory } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import moment from "moment";
import { useDeleteShopMutation } from "../shopApi";
import { useNavigate } from "react-router-dom";

interface Props {
  shop: ShopType;
  enableDelete?: boolean;
}

export default function ShopCard({
  shop,
  enableDelete,
}: Props): React.ReactElement {
  const navigate = useNavigate();
  const [deleteMutation] = useDeleteShopMutation();
  return (
    <div className="flex flex-col max-w-xl px-6 py-3 space-y-3 overflow-auto rounded shadow-md bg-gray-50 ">
      <div className="flex flex-col-reverse items-center md:flex-row md:justify-around">
        <div className="self-start space-y-3 md:self-center">
          <h2 className="text-2xl text-blue-500">{shop.name}</h2>
          <div className="flex flex-col ">
            <p className="flex items-center space-x-3">
              <MdLocationOn />
              <span>{shop.area}</span>
            </p>
            <p className="flex items-center space-x-3">
              <MdCategory />
              <span>{shop.category}</span>
            </p>
            <p className="flex items-center space-x-3">
              <BsFillCalendarEventFill />
              <span>
                {moment(shop.opening_date).format("Do MMM")}
                &minus;
                {moment(shop.closing_date).format("Do MMM")}
              </span>
            </p>
          </div>
        </div>
        {/* shop image */}
        <div>
          <img
            src={require("../../../assets/images/shop_img.png")}
            alt="shop"
          />
        </div>
      </div>
      {!!enableDelete && enableDelete && (
        <button
          onClick={() => {
            deleteMutation({ shop_id: shop._id });
            navigate("/my-shops");
            window.location.reload();
          }}
          className="flex items-center self-start justify-center p-3 py-1.5 space-x-3 text-white bg-red-500 border border-red-500 rounded-full "
        >
          <AiTwotoneDelete className="text-xl" />
          <span>Delete Shop</span>
        </button>
      )}
    </div>
  );
}
