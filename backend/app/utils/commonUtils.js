const { v4: uuidv4 } = require("uuid");
const CryptoJS = require("crypto-js");
const moment = require("moment-timezone");
const bcrypt = require("bcrypt");
const xmlParser = require("xml-js");
const zlib = require("zlib");
const logger = require("./loggerUtils");
const html_to_pdf = require("html-pdf-node");
// const HummusRecipe = require("hummus-recipe");

let counter = 0;

const validateQueryString = (query) => {
  if (!query || query === "undefined" || query === "null") {
    return false;
  }
  return true;
};

const randomNumberGenerator = (length) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

const compareAndSet = (expectedValue, setValue) => {
  if (counter === expectedValue) {
    counter = setValue;
  }
};

const getIncrementCounter = () => {
  return ++counter;
};

const generateRRN = () => {
  compareAndSet(9999, 0);
  let nowDateTime = moment().format("DDhhmms") + getIncrementCounter();
  let rrn = nowDateTime.padStart(12, "0");

  return rrn.toString();
};

const generateChannelUniqueRefId = () => {
  compareAndSet(9999, 0);
  let nowDateTime = moment().format("DDhhmms") + getIncrementCounter();
  let rrn = nowDateTime.padStart(12, "0");

  return rrn.toString();
};

const generateStan = (rrn) => {
  return rrn.substring(rrn.length - 6);
};

const getUUID = () => {
  return uuidv4();
};

const getMd5Hash = (data) => {
  return CryptoJS.MD5(data.toString()).toString();
};

const encodeToUtf8 = (string) => {
  return encodeURIComponent(string);
};

const encodeToBase64 = (string) => {
  return Buffer.from(string).toString("base64");
};

const decodeToBase64 = (string) => {
  return Buffer.from(string, "base64").toString();
};
const getIpAddress = (ip_address) => {
  let formattedIpAddress = ip_address?.toString().replace("::ffff:", "");
  return formattedIpAddress;
};
const getFormattedDate = () => {
  let formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
  return formattedDate;
};
const getDate = () => {
  return moment().tz("Asia/Karachi").format("YYYY-MM-DD HH:mm:ss:SSS");
};

const auditLogOriginalUrl = (req) => {
  return req.baseUrl + req.path;
};

const getDateBefore18Years = () => {
  return moment().subtract(18, "years").format("YYYY-MM-DD");
};

const getTodaysDate = () => {
  return moment().format("YYYY-MM-DD");
};

const getTomorrowsDate = () => {
  return moment().add(1, "days").format("YYYY-MM-DD");
};

const getValueAndLabelMapped = (arr, key) => {
  return arr.map((item) => {
    return {
      value: item[key]?.value,
      label: item[key]?.label,
    };
  });
};

const getUniqueLovsByKey = (arr, key, uniqueKey) => {
  return [...new Map(arr.map((item) => [item[key][uniqueKey], item])).values()];
};

const getBooleanValue = (field) => {
  return field.default_value === "0" ? false : true;
};

const isArray = (arr) => {
  if (Array.isArray(arr)) {
    return true;
  } else {
    return false;
  }
};

const isEmpty = (val) => {
  return (
    typeof val === "undefined" ||
    val === null ||
    // has length and it's zero
    (val.hasOwnProperty("length") && val.length === 0) ||
    // is an Object and has no keys
    (val.constructor === Object && Object.keys(val).length === 0)
  );
};

const bcryptEncryption = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

const bcryptEncryptionComparision = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const parseXmlToJson = (xml) => {
  return xmlParser.xml2js(xml, { compact: true, spaces: 4 });
};

const compressedBase64 = (text) => {
  return !!text ? zlib.deflateSync(text).toString("base64") : "";
};

const arrayToObject = (key, value, array) => {
  let object = {};
  for (const element of array) {
    object = {
      ...object,
      [element[key]]: element[value],
    };
  }
  return object;
};
const camelToTitle = (stringValue) => {
  var result;
  if (stringValue.includes("_")) {
    var frags = stringValue.split("_");
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  } else if (stringValue.includes(" ")) {
    var frags = stringValue.split(" ");
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  } else {
    result = stringValue.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    // console.log(result.charAt(0).toUpperCase() + result.slice(1));
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
};
const convertHtmlToBase64 = async (sourceHtml, password, bankingType) => {
  logger.info("IN - convertHtmlToBase64 in common utils");

  let options = { format: "A4" };
  const file = { content: sourceHtml };
  const pdf = await html_to_pdf.generatePdf(file, options);
  const base64Pdf = pdf.toString("base64");

  // const htmlPdfBase64 = pdf.toString();
  // // console.log("pdf buffer: ", pdf.toString("base64"));
  // // logger.info("pdfBuffer", base64Pdf);
  // const passwordProtectedPdf = await pdfEncryption(htmlPdfBase64, password);
  // const base64 = encodeToBase64(passwordProtectedPdf);
  // logger.info("OUT - convertHtmlToBase64 in common utils");
  return base64Pdf;
};

// const pdfEncryption = (pdf, password) => {
//   const pdfDoc = new HummusRecipe(pdf, "AccountForm.pdf");

//   pdfDoc
//     .encrypt({
//       userPassword: password,
//       ownerPassword: password,
//       userProtectionFlag: 4,
//     })
//     .endPDF();

//   return pdfDoc;
// };
const commonUtils = {
  validateQueryString,
  randomNumberGenerator,
  getUUID,
  getMd5Hash,
  encodeToUtf8,
  generateRRN,
  generateChannelUniqueRefId,
  generateStan,
  encodeToBase64,
  decodeToBase64,
  getIpAddress,
  getFormattedDate,
  getDate,
  auditLogOriginalUrl,
  getDateBefore18Years,
  getTodaysDate,
  getTomorrowsDate,
  getValueAndLabelMapped,
  getUniqueLovsByKey,
  getBooleanValue,
  isArray,
  isEmpty,
  bcryptEncryption,
  bcryptEncryptionComparision,
  parseXmlToJson,
  compressedBase64,
  arrayToObject,
  camelToTitle,
  convertHtmlToBase64,
};

module.exports = commonUtils;
