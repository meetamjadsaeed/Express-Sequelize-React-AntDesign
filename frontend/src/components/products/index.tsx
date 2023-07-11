import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { Pagination, Spin, Select, Input } from "antd";
import { LoadingOutlined, AudioOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import ProductCard from "./ProductCard";

import ReUsable from "../../services/helpers/constants";

const { Search } = Input;

const rowStyle = {
  marginBottom: "16px",
};

const colStyle = {
  marginBottom: "16px",
};

const filtersStyle = {
  display: "flex",
  flexDirection: "row",
  alignContent: "space-around",
  justifyContent: "space-around",
  padding: "50px 0px 50px 0px",
};

const antIcon = React.createElement(LoadingOutlined, {
  style: { fontSize: 24 },
  spin: true,
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortable, setSortable] = useState("asc");

  const recordsPerPage = 8;

  const getProducts = async () => {
    try {
      setLoading(true);
      const apiResp = await AppService.allProducts();
      const response = apiResp?.data;

      // console.log(response?.data,"apiResp")

      const products = response?.data;

      const sortDesc = sortProductsDescending([...products]);
      const sortAsc = sortProductsAscending([...products]);

      setProducts(
        sortable === "asc" ? sortAsc : sortable === "desc" ? sortDesc : null
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [sortable]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products?.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortedChange = (value) => {
    setSortable(value);
  };


  const sortProductsDescending = (products) => {
    return ReUsable.sortArrayOfObjectsDes(products);
  };

  const sortProductsAscending = (products) => {
    return ReUsable.sortArrayOfObjectsAsc(products);
  };

  return (
    <>
      <div style={filtersStyle}>
        <p>Sort</p>
        <Select
          defaultValue="asc"
          style={{ width: 120 }}
          onChange={handleSortedChange}
          options={[
            { value: "asc", label: "ASC" },
            { value: "desc", label: "DESC" },
          ]}
        />
      </div>

      <Row gutter={[40, 40]} style={rowStyle}>
        {loading ? (
          <Spin indicator={antIcon} />
        ) : currentRecords.length > 0 ? (
          currentRecords.map((product, index) => {
            return (
              <Col
                style={colStyle}
                key={index}
              >
                <ProductCard
                  productData={{
                    id: product?.id,
                    title: product?.title,
                    thumbnail: product?.thumbnail,
                    description: product?.description,
                    price: product?.price,
                  }}
                />
              </Col>
            );
          })
        ) : (
          <p>No Records Found</p>
        )}
      </Row>

      {loading ? (
        <Spin indicator={antIcon} />
      ) : currentRecords.length > 0 ? (
        <Pagination
          current={currentPage}
          pageSize={recordsPerPage}
          total={products.length}
          onChange={handlePageChange}
          style={{
            marginTop: "16px",
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
            width: "50%",
            margin: "auto",
          }}
        />
      ) : null}
    </>
  );
};

export default Products;
