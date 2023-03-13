import { Button, Input, message, Modal } from "antd";
import http from "../apiClient";
import React, { useEffect, useState } from "react";

const UserInfo = ({ info }) => {
  const accessTokenObj = JSON.parse(localStorage.getItem("userInfo"));
  const [money, setMoney] = useState(0);
  const [code, setCode] = useState("");
  const [currentMoney, setCurrentMoney] = useState(0);
  const [profile, setProfile] = useState({
    fullName: "",
    phoneNumber: "",
    date: "2023-02-26",
    sex: "Nam",
    country: "Vietnam",
    state: "Hưng Yên",
    town: "Ha Noi",
    nation: "Kinh",
    village: "VN",
    mail: "",
    location: "",
    passport: "1231232131231",
    relativeName: "Nguyễn Văn A",
    relativeNumber: "13123123123",
    healthInsurance: "SV2821001402141",
    relativeMail: "chunha2411@gmail.com",
    relative: "Chồng",
    idAccount: accessTokenObj?.id,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    //Là hook của farem-work ReactJS
    // Khi người dùng vào trang, thì lâo tức nó sẽ gọi data từ server về song song với lúc render ra giao diện, và không bị vỡ giao diện.
    fetchMoney();
  }, []);
  const fetchMoney = async () => {
    const accessTokenObj = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await http.post(
      "/payment/patient/money/get",
      {
        id_user: accessTokenObj?.id,
      },
      {
        headers: {
          token: `Bearer ${accessTokenObj?.accessToken}`,
        },
      }
    );
    setCurrentMoney(data?.data?.money);
  };

  const handleSaveMoney = async (e) => {
    const accessTokenObj = JSON.parse(localStorage.getItem("userInfo"));
    const payload = {
      dataCard: {
        optionWalet: "Vietcombank",
        payNumber: money,
        codePay: code,
      },
      id_user: accessTokenObj?.id,
    };
    try {
      const response = await http.post("/payment/patient/money", payload, {
        headers: {
          token: `Bearer ${accessTokenObj?.accessToken}`,
        },
      });
      message.success(response.data?.message);
      fetchMoney();
    } catch (error) {
      message.error(error.response.data?.message);
    }
  };

  const handleAddProfile = async () => {
    if (
      profile.fullName === "" ||
      profile.mail === "" ||
      profile.location === "" ||
      profile.phoneNumber === ""
    ) {
      message.error("Vui lòng nhập đầy đủ");
      setProfile({
        fullName: "",
        phoneNumber: "",
        date: "2023-02-26",
        sex: "Nam",
        country: "Vietnam",
        state: "Hưng Yên",
        town: "Ha Noi",
        nation: "Kinh",
        village: "VN",
        mail: "",
        location: "",
        passport: "1231232131231",
        relativeName: "Nguyễn Văn A",
        relativeNumber: "13123123123",
        healthInsurance: "SV2821001402141",
        relativeMail: "chunha2411@gmail.com",
        relative: "Chồng",
        idAccount: accessTokenObj?.id,
      });
    } else {
      try {
        await http.post("/user/data/patient/v1", profile, {
          headers: {
            token: `Bearer ${accessTokenObj?.accessToken}`,
          },
        });

        window.location.reload();
        message.success("Thành công");
      } catch (error) {
        message.error("Thất bại");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await http.post(
        "/user/data/patient/delete/v1",
        { _id: info._id },
        {
          headers: {
            token: `Bearer ${accessTokenObj?.accessToken}`,
          },
        }
      );

      message.success("Đã xoá thành công");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
      message.error("Đã xoá thất bại");
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
    setProfile({
      fullName: info?.fullName,
      phoneNumber: info?.phoneNumber,
      date: "2023-02-26",
      sex: "Nam",
      country: "Vietnam",
      state: "Hưng Yên",
      town: "Ha Noi",
      nation: "Kinh",
      village: "VN",
      mail: info?.mail,
      location: info?.location,
      passport: "1231232131231",
      relativeName: "Nguyễn Văn A",
      relativeNumber: "13123123123",
      healthInsurance: "SV2821001402141",
      relativeMail: "chunha2411@gmail.com",
      relative: "Chồng",
      idAccount: accessTokenObj?.id,
    });
  };
  const handleOk = async () => {
    try {
      await http.patch(
        "/user/data/patient/update/v1",
        { value: profile, _id: info._id },
        {
          headers: {
            token: `Bearer ${accessTokenObj?.accessToken}`,
          },
        }
      );

      message.success("Đã sửa thành công");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      message.error("Sửa thất bại thất bại");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          className=" mt-10 gap-x-3"
          style={{
            margin: "50px 10px 10px 10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
            }}
          >
            <p style={{ fontSize: "16px" }} className="font-semibold">
              Nhập tên:
            </p>
            <Input
              style={{ width: "100%" }}
              placeholder="Nhập tên..."
              className="w-96 h-16"
              value={profile.fullName}
              onChange={(e) => {
                setProfile((data) => {
                  return { ...data, fullName: e.target.value };
                });
              }}
            />
          </div>
          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
            }}
          >
            <p style={{ fontSize: "16px" }} className="font-semibold">
              Nhập số điện thoại:
            </p>
            <Input
              style={{ width: "100%", margin: "auto" }}
              placeholder="Nhập số điện thoại..."
              className="w-96 h-16"
              value={profile.phoneNumber}
              onChange={(e) => {
                setProfile((data) => {
                  return { ...data, phoneNumber: e.target.value };
                });
              }}
            />
          </div>
          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
            }}
          >
            <p style={{ fontSize: "16px" }} className="font-semibold">
              Nhập email:
            </p>
            <Input
              style={{ width: "100%", margin: "auto" }}
              placeholder="Nhập email..."
              className="w-96 h-16"
              value={profile.mail}
              onChange={(e) => {
                setProfile((data) => {
                  return { ...data, mail: e.target.value };
                });
              }}
            />
          </div>

          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "25px",
            }}
          >
            <p style={{ fontSize: "16px" }} className="font-semibold">
              Nhập địa chỉ:
            </p>
            <Input
              style={{ width: "100%", margin: "auto" }}
              placeholder="Nhập địa chỉ..."
              className="w-96 h-16"
              value={profile.location}
              onChange={(e) => {
                setProfile((data) => {
                  return { ...data, location: e.target.value };
                });
              }}
            />
          </div>
        </div>
      </Modal>
      <div className="flex flex-col">
        {info ? (
          <>
            <h1
              style={{
                fontSize: "32px",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "50px",
              }}
              className="py-16"
            >
              Thông tin tài khoản
            </h1>
            <div
              className="flex flex-col gap-y-5"
              style={{
                marginTop: "50px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="flex"
                style={{
                  margin: "10px",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Tên khách hàng :{" "}
                </p>
                <p style={{ fontSize: "16px" }} className="text-base">
                  {info?.fullName}
                </p>
              </div>
              <div
                className="flex"
                style={{ margin: "10px", justifyContent: "center" }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Số điện thoại :{" "}
                </p>
                <p style={{ fontSize: "16px" }} className="text-base">
                  {info?.phoneNumber}
                </p>
              </div>
              <div
                className="flex"
                style={{ margin: "10px", justifyContent: "center" }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Email :{" "}
                </p>
                <p style={{ fontSize: "16px" }} className="text-base">
                  {info?.mail}
                </p>
              </div>
              <div
                className="flex"
                style={{ margin: "10px", justifyContent: "center" }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Địa chỉ :{" "}
                </p>
                <p style={{ fontSize: "16px" }} className="text-base">
                  {info?.location}
                </p>
              </div>
              <div
                className="flex"
                style={{ margin: "10px", justifyContent: "center" }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Số tiền tài khoản :
                </p>
                <p style={{ fontSize: "16px" }} className="text-base">
                  {Number(currentMoney)?.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div>
                <Button
                  onClick={handleDelete}
                  type="default"
                  className="h-16"
                  style={{ margin: "0 15px" }}
                >
                  Xoá
                </Button>
                <Button onClick={showModal} type="default" className="h-16">
                  Sửa
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <h1
              style={{
                fontSize: "24px",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "60px",
                marginBottom: "60px",
              }}
              className="py-18"
            >
              Bạn chưa cập nhật thông tin, cập nhật thông tin ngay !
            </h1>
            <div
              className=" mt-10 gap-x-3"
              style={{
                margin: "50px 10px 10px 10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "25px",
                }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Nhập tên:
                </p>
                <Input
                  style={{ width: "100%" }}
                  placeholder="Nhập tên..."
                  className="w-96 h-16"
                  value={profile.fullName}
                  onChange={(e) => {
                    setProfile((data) => {
                      return { ...data, fullName: e.target.value };
                    });
                  }}
                />
              </div>
              <div
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "25px",
                }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Nhập số điện thoại:
                </p>
                <Input
                  style={{ width: "100%", margin: "auto" }}
                  placeholder="Nhập số điện thoại..."
                  className="w-96 h-16"
                  value={profile.phoneNumber}
                  onChange={(e) => {
                    setProfile((data) => {
                      return { ...data, phoneNumber: e.target.value };
                    });
                  }}
                />
              </div>
              <div
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "25px",
                }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Nhập email:
                </p>
                <Input
                  style={{ width: "100%", margin: "auto" }}
                  placeholder="Nhập email..."
                  className="w-96 h-16"
                  value={profile.mail}
                  onChange={(e) => {
                    setProfile((data) => {
                      return { ...data, mail: e.target.value };
                    });
                  }}
                />
              </div>

              <div
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "25px",
                }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Nhập địa chỉ:
                </p>
                <Input
                  style={{ width: "100%", margin: "auto" }}
                  placeholder="Nhập địa chỉ..."
                  className="w-96 h-16"
                  value={profile.location}
                  onChange={(e) => {
                    setProfile((data) => {
                      return { ...data, location: e.target.value };
                    });
                  }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={handleAddProfile}
                  type="default"
                  className="h-16"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        )}
        {info ? (
          <>
            <h1
              style={{
                fontSize: "24px",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "60px",
              }}
              className="py-18"
            >
              Nạp tiền
            </h1>
            <div>
              <div
                className="flex mt-10 gap-x-3"
                style={{
                  margin: "50px 10px 10px 10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Nhập mã
                </p>
                <Input
                  placeholder="Nhập mã"
                  className="w-96 h-16"
                  onChange={(e) => setCode(e.target.value)}
                />
                <p style={{ fontSize: "16px" }} className="font-semibold">
                  Nhập tiền
                </p>
                <Input
                  placeholder="Nhập tiền"
                  className="w-96 h-16"
                  onChange={(e) => setMoney(e.target.value)}
                />
                <Button
                  onClick={handleSaveMoney}
                  type="default"
                  className="h-16"
                >
                  Lưu
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default UserInfo;
