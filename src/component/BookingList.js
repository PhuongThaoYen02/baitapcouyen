import React, { useEffect, useState } from "react";

const BookingList = () => {
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    setBookingList(JSON.parse(localStorage.getItem("booking-list")));
  }, []);
  return (
    <div className="" style={{ display: "block" }}>
      <h1
        style={{
          fontSize: "32px",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: "30px",
        }}
        className="py-16"
      >
        Các dịch vụ đã đặt
      </h1>
      <div
        className="booking-map"
        style={{
          width: "100%",
          marginTop: "50px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {bookingList?.map((info, index) => (
          <div className="card-items">
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Tên dịch vụ :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.service}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Tên nhân viên :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.employee}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Thời gian :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.time}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                CSKH :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.area}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Tên khách hàng :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.fullname}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                SDT :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.phoneNumber}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Email :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.email}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Địa chỉ :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info?.address}
              </p>
            </div>
            <div className="flex">
              <p style={{ fontSize: "16px" }} className="font-semibold">
                Số tiền :{" "}
              </p>
              <p style={{ fontSize: "16px" }} className="text-base">
                {info.cost?.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
