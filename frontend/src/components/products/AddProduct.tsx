import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const AddProduct = async (values) => {
    try {
      setLoading(true);
      const apiResp = await AppService.addProduct(values);
      restForm();
      toast.success(apiResp?.data?.message);

      setTimeout(() => navigate("/"), 3000);

      setLoading(false);
    } catch (error) {
      console.log(error);
      restForm();
      setLoading(false);
    }
  };

  const restForm = () => {
    // / Reset form fields after successful submission
    form.resetFields();
    // Reset the uploaded image
    setImageUrl("");
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

  return (
    <>
      <ToastContainer />

      <Form
        form={form}
        layout="vertical"
        onFinish={AddProduct}
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
          <Input className="input-field" />
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
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            name="image"
            accept="image/*"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeImageUpload}
            onChange={(info) => {
              if (info.file.status === "done") {
                handleImageUpload(info.file.originFileObj);
              }
            }}
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
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
