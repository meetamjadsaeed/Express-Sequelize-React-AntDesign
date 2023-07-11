import HttpServices from "../httpServices";
import { ENDPOINTS } from "../helpers/endpoints";

export const header = {
  Accept: "application/json",
};

class AppService extends HttpServices {
  /* All Products*/
  static allProducts() {
    return this.get(ENDPOINTS.getAllProducts, {});
  }

  /* Single Product*/
  static singleProduct(id) {
    return this.get(`${ENDPOINTS.getSingleProduct}/${id}`, {});
  }

  /* Update Product*/
  static addProduct(payload) {
    return this.post(ENDPOINTS.addProduct, header, { ...payload });
  }

  /* Update Product*/
  static updateProduct(payload, id) {
    return this.put(`${ENDPOINTS.updateProduct}/${id}`, header, { ...payload });
  }

  /* Delete Product*/
  static deleteProduct(id) {
    return this.delete(`${ENDPOINTS.deleteProduct}/${id}`, header);
  }

  /* Register New user*/
  static register(payload) {
    return this.post(ENDPOINTS.register, header, { ...payload });
  }

  /* Login user*/
  static logIn(payload) {
    return this.post(ENDPOINTS.login, header, { ...payload });
  }
}

export default AppService;
