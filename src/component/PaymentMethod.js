import { Radio } from "antd";
import React from "react";

const PaymentMethod = ({ handleSelectPayment, goBack }) => {
  return (
    <div className="py-10">
      <div className="">
        <Radio.Group defaultValue={"vietcom"} className="flex gap-x-5 mb-10">
          <div className="gap-y-5 rounded-md w-full flex flex-col items-center">
            <img
              src="https://portal.vietcombank.com.vn/content/PublishingImages/The/Hinh%20the%20moi/connect24-dome.png"
              className="h-96 rounded-3xl"
            />
            <Radio value="vietcom" defaultChecked={true} className="max-w-max">
              Vietcombank
            </Radio>
          </div>
          <div className="gap-y-5 rounded-md w-full flex flex-col items-center">
            <img
              src="https://static.mservice.io/blogscontents/momo-upload-api-190911101232-637037935524343737.png"
              className="h-96 rounded-3xl"
            />
            <Radio value="momo" defaultChecked={false} className="max-w-max">
              Momo
            </Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="space-x-6 flex justify-end">
        <button
          onClick={goBack}
          type="button"
          className="px-6 py-3 border border-gray-300 rounded"
        >
          Quay lại
        </button>
        <button
          onClick={handleSelectPayment}
          className="px-6 py-3 border border-green-500 rounded text-green-500"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
