import { handleMockGetRequest } from "@/functions";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const data = {
    data: {
      currency: "USD",
      rates: {
        "AUD":"1.44444444012513",
      "CAD":"1.3333333333666666",
      "CNY":"6.8888888891817443",
      "EUR":"0.9999999963230188",
      "GBP":"0.88888888888693",
      "HKD":"7.8888888888833364",
      "JPY":"134.11111111477",
      "KRW":"1317.1111111187101255",
      "NZD":"1.6666666666666666",
      "THB":"34.33333",
      "TWD":"30.4444444565275405",
      "USD":"1.000",
      "INR":"82.0000000011877",
      "RUB":"81.600000003331536",
      "BRL":"4.9999",
      "MXN":"18.000000008010921",
      },
    },
  };

  await handleMockGetRequest(data, 500, res);
};
