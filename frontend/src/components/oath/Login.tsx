import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (values) => {
    console.log(values, "LogIn");
    // Saving the user token to local storage
    try {
      setLoading(true);
      // const payload = {
      //   userName: "test user",
      //   password: "password",
      //   mobileNumber: 2121212,
      // };
      const apiResp = await AppService.logIn(values);
      toast.success(apiResp?.data?.message);
      restForm();

      localStorage.removeItem("userToken");
      const userToken = apiResp?.data?.data?.token;

      // console.log(userToken, "userToken");

      localStorage.setItem("userToken", userToken ? userToken : "");

      setTimeout(() => navigate("/"), 3000);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      restForm();
      setLoading(false);
      localStorage.removeItem("userToken");
      localStorage.setItem("userToken", "");
    }
  };

  const restForm = () => {
    form.resetFields();
  };

  return (
    <>
      <ToastContainer />

      <Form
        form={form}
        layout="vertical"
        onFinish={loginUser}
        className="add-product-form"
      >
        <Form.Item
          name="userName"
          label="userName"
          style={{ color: "#ffffff" }}
          rules={[{ required: true, message: "Please enter your userName" }]}
        >
          <Input className="input-field" />
        </Form.Item>

        <Form.Item
          name="password"
          label="password"
          style={{ color: "#ffffff" }}
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password className="input-field" />
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          label="mobileNumber"
          rules={[{ required: true, message: "Please enter the mobileNumber" }]}
        >
          <InputNumber
            min={11}
            precision={2}
            className="input-field"
            formatter={(value) => `${value}`}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogIn;
