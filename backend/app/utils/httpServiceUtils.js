const axios = require("axios");
const commonUtils = require("./commonUtils");
const logger = require("./loggerUtils");
const trippleDesUtils = require("./trippleDesUtils");

const sendOtpSms = async (mobileNumber, msg) => {
  logger.info("IN - sendSms ");
  logger.info("SMS Text: ", msg);
  mobileNumber = "+92" + mobileNumber.substring(1, 11);
  logger.info("sending OTP SMS to: " + mobileNumber);

  const encodeSMS = commonUtils.encodeToUtf8(msg);
  const encodeMobileNumber = commonUtils.encodeToUtf8(mobileNumber);
  const encodePassword = commonUtils.encodeToUtf8(process.env.SMS_PASSWORD);

  try {
    logger.info("Trying to send SmsOtp ");

    const url = `${process.env.SMS_URL}UserId=${process.env.SMS_USERID}&Password=${encodePassword}&MobileNo=${encodeMobileNumber}&MsgId=Paysys&SMS=${encodeSMS}&MsgHeader=${process.env.SMS_SMSGHEADER}`;
    logger.info("query string: ", url);

    const result = await axios.get(url);
    logger.info("SMS Sent successfully ");

    logger.info("result.status: ", result.status);
    logger.info("result.body: ", result.data?.toString());
  } catch (err) {
    logger.info("ERROR - sendSms ");
    logger.error(err.message.toString());
  }
};

const sendEmailOtp = async (stan, toName, toEmail, emailBody, subject) => {
  let encodedStan = commonUtils.encodeToBase64(
    trippleDesUtils.getTrippleDESEncrypted(stan).toString()
  );
  let encodedEmailBody = commonUtils.encodeToBase64(
    trippleDesUtils.getTrippleDESEncrypted(emailBody).toString()
  );
  let encodedToName = commonUtils.encodeToBase64(
    trippleDesUtils.getTrippleDESEncrypted(toName).toString()
  );
  let encodedToEmail = commonUtils.encodeToBase64(
    trippleDesUtils.getTrippleDESEncrypted(toEmail).toString()
  );
  let encodedSubject = commonUtils.encodeToBase64(
    trippleDesUtils.getTrippleDESEncrypted(subject).toString()
  );
  let encodedFromName = commonUtils.encodeToBase64(
    trippleDesUtils
      .getTrippleDESEncrypted(process.env.EMAIL_FROM_NAME)
      .toString()
  );
  let encodedFromEmail = commonUtils.encodeToBase64(
    trippleDesUtils
      .getTrippleDESEncrypted(process.env.EMAIL_FROM_ADDRESS)
      .toString()
  );

  logger.info("Email Text: ", emailBody);

  logger.info("sending OTP Email to: " + toEmail);

  try {
    const url = `${process.env.EMAIL_URL}${encodedStan}/${encodedToName}/${encodedToEmail}/${encodedFromName}/${encodedFromEmail}/${encodedEmailBody}/${encodedSubject}`;
    const result = await axios.get(url);
    logger.info("Email Sent successfully ");

    logger.info("result.status: ", result.status);
    logger.info("result.body: ", result.data?.toString());
    return result;
  } catch (err) {
    logger.info("ERROR - sendEmail ");
    logger.error(err.message.toString());
  }
};

const mpayGetCall = async (endPoint, query) => {
  const resp = await axios.get(endPoint + query);
  return resp;
};

const mpayPostCall = async (endPoint, query, body) => {
  const config = {
    headers: { "Content-Type": "application/json;charset=utf-8" },
  };
  const resp = await axios.post(endPoint + query, body, config);
  return resp;
};

const HttpServiceUtils = {
  sendOtpSms,
  sendEmailOtp,
  mpayGetCall,
  mpayPostCall,
};

module.exports = HttpServiceUtils;
