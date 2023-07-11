import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState<any>();

  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  const getProduct = async (value) => {
    try {
      setLoading(true);
      const apiResp = await AppService.singleProduct(value);
      const response = apiResp?.data;
      setSingleProduct(response?.data);
      console.log(response?.data, "product");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(paths[1]);
  }, []);

  const UpdateProduct = async (values) => {
    console.log(values, "values");
    try {
      setLoading(true);
      const apiResp = await AppService.updateProduct(values, paths[1]);
      //   restForm();
      toast.success(apiResp?.data?.message);
      //   console.log(apiResp, "UpdateProduct");

      // console.log(apiResp?.data?.message, "delete product");

      setTimeout(() => navigate("/"), 3000);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.success("Error updating product");
      setLoading(false);
    }
  };

  const handleImageUpload = (file) => {
    // Handle image upload logic here, e.g., send it to a server and get the image URL
    // For demonstration purposes, we'll just use a mock URL
    const mockImageUrl = "https://example.com/image.jpg";
    setImageUrl(mockImageUrl);
  };

  const beforeImageUpload = (file) => {
    // Check if the uploaded file is an image
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    // Return false to prevent upload if the file is not an image
    return isImage;
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      handleImageUpload(info.file.originFileObj);
    }
  };

  useEffect(() => {
    // Populate form fields with initial values on component mount
    form.setFieldsValue(singleProduct);
    // Set the initial image URL if available
    setImageUrl("https://example.com/image.jpg");
  }, [form, singleProduct]);

  return (
    <>
      <ToastContainer />

      <Form
        form={form}
        layout="vertical"
        onFinish={UpdateProduct}
        className="add-product-form"
      >
        <Form.Item
          name="title"
          label="Title"
          style={{ color: "#ffffff" }}
          rules={[
            { required: true, message: "Please enter the product title" },
          ]}
        >
          <Input
            className="input-field"
            defaultValue={singleProduct?.title}
            value={singleProduct?.title}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea className="input-field" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the product price" },
          ]}
        >
          <InputNumber
            min={0}
            precision={2}
            className="input-field"
            formatter={(value) => `$ ${value}`}
          />
        </Form.Item>

        {/* <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            name="image"
            accept="image/*"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeImageUpload}
            onChange={handleImageChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Product" className="uploaded-image" />
            ) : (
              <div className="upload-placeholder">
                <UploadOutlined className="upload-icon" />
                <div className="upload-text">Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProduct;
