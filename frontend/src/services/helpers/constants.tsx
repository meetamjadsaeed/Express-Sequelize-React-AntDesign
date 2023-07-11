class ReUsable {

  
  static sortArrayOfObjectsDes(array) {
    return array.sort((a, b) => b.price - a.price);
  }

  static sortArrayOfObjectsAsc(array) {
    return array.sort((a, b) => a.price - b.price);
  }
}

export default ReUsable;
