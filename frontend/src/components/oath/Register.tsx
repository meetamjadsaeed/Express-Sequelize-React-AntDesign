import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const registerUser = async (values) => {
    console.log(values, "login");
    try {
      setLoading(true);
      const apiResp = await AppService.register(values);
      restForm();
      toast.success(apiResp?.data?.message);

      setTimeout(() => navigate("/login"), 3000);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      restForm();
      setLoading(false);
    }
  };

  const restForm = () => {
    // / Reset form fields after successful submission
    form.resetFields();
  };

  return (
    <>
      <ToastContainer />

      <Form
        form={form}
        layout="vertical"
        onFinish={registerUser}
        className="add-product-form"
      >
        {/* <Form.Item
          name="name"
          label="name"
          style={{ color: "#ffffff" }}
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input className="input-field" />
        </Form.Item> */}

        <Form.Item
          name="username"
          label="username"
          style={{ color: "#ffffff" }}
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input className="input-field" />
        </Form.Item>

        <Form.Item
          name="email"
          label="email"
          style={{ color: "#ffffff" }}
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input className="input-field" />
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
