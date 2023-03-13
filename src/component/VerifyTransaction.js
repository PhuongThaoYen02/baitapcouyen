import { Button, Input, Result } from "antd";
import React from "react";

const VerifyTransaction = ({ goBack, handleVerify, service, info }) => {
  return (
    <div>
      <div className="p-10">
        <div className="booking-verify">
          <div className="flex gap-x-4">
            <img className="w-1/2 rounded-md" src={service?.img} />
            <div className="booking-info-verify" style={{ width: "50%" }}>
              <div className="flex">
                <span className="abc">Tên dịch vụ : </span>
                <span>{service?.service_name}</span>
              </div>
              <div className="flex">
                <span className="abc">Tên nhân viên : </span>
                <span>{info?.employee}</span>
              </div>
              <div className="flex">
                <span className="abc">Thời gian : </span>
                <span>{info?.time}</span>
              </div>
              <div className="flex">
                <span className="abc">CSKH : </span>
                <span>{info?.area}</span>
              </div>
              <div className="flex">
                <span className="abc">Tên khách hàng : </span>
                <span>{info?.fullname}</span>
              </div>
              <div className="flex">
                <span className="abc">SDT : </span>
                <span>{info?.phoneNumber}</span>
              </div>
              <div className="flex">
                <span className="abc">Email : </span>
                <span>{info?.email}</span>
              </div>
              <div className="flex">
                <span className="abc">Địa chỉ : </span>
                <span>{info?.address}</span>
              </div>
              <div className="flex">
                <span className="abc">Số tiền : </span>
                <span>
                  {Number(service?.cost)?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <Result
          status="success"
          title="Successfully Purchased Cloud Server ECS!"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="default" key="console">
              Go Console
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        /> */}
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
          onClick={handleVerify}
          className="px-6 py-3 border border-green-500 rounded text-green-500"
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default VerifyTransaction;
