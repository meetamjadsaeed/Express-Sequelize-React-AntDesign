import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import AppService from "../../services/appServices";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "react-toastify/dist/components";

const { Meta } = Card;

const ProductCard = ({ productData }) => {
  const [loading, setLoading] = useState(true);

  const { id, title, thumbnail, description, price } = productData;

  const deleteProduct = async (e, id) => {
    // e.preventDefault();
    try {
      setLoading(true);
      const apiResp = await AppService.deleteProduct(id);

      toast.success(apiResp?.data?.message);

      // Reload the page to reflect the updated data
      window.location.reload();

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setLoading(false);
    }
  };

  var userToken = localStorage.getItem("userToken");

  return (
    <>
      <ToastContainer />
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={
              "https://th.bing.com/th/id/R.48b0e53005711104f5dd7e0547bee564?rik=91jCm%2bXZW6fKaQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-J5Gg1yS520s%2fT3tnZuM4JtI%2fAAAAAAAAALA%2fpzlX4dMpUAo%2fs1600%2f(14).jpg&ehk=8pGTs2WMCVN2tbjcYwytf0Q0z07L%2fwrs%2b2pwXzJ2ahc%3d&risl=&pid=ImgRaw&r=0"
            }
            width={100}
            height={200}
          />
        }
        actions={[
          userToken ? (
            <DeleteOutlined
              key="delete"
              onClick={(e) => {
                deleteProduct(e, id);
              }}
            />
          ) : (
            "Login to delete"
          ),

          <>
            <Link to={userToken ? `/updateProduct/${id && id}` : "/login"}>
              <EditOutlined key="edit" />
            </Link>
            <Link to={`/product/${id && id}`}>
              <EllipsisOutlined key="ellipsis" />
            </Link>
          </>,
        ]}
      >
        <Meta
          title={<Link to={`/product/${id && id}`}>{title && title}</Link>}
          description={description && description?.slice(0, 20)}
        />
        <h5>Price: {price && price}</h5>
      </Card>
    </>
  );
};

export default ProductCard;
