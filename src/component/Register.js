import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import http from "../apiClient";

function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target?.username?.value;
    const password = e.target?.password?.value;
    const confirmPassWord = e.target?.confirmPassWord?.value;
    const email = e.target?.email?.value;
    const fullName = e.target?.fullname?.value;
    const phoneNumber = e.target?.phoneNumber?.value;
    const address = e.target?.address?.value;
   
    if (password !== confirmPassWord) {
      message.error(
        "Vui lòng nhập trường Mật khẩu và Nhập lại Mật khẩu trùng nhau"
      );
      return;
    }
    try {
      setIsRegister(true);
      await http.post("/user/register/patient", {
        userName: username,
        passWord: password,
        confirmPassWord,
        email,
        role: "BN",
      });
      const { data } = await http.post("/user/data/patient", {
        userName: username,
        passWord: password,
      });
      const profile = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        date: "2023-02-26",
        sex: "Nam",
        country: "Vietnam",
        state: "Hưng Yên",
        town: "Ha Noi",
        nation: "Kinh",
        village: "VN",
        mail: email,
        location: address,
        passport: "1231232131231",
        relativeName: "Nguyễn Văn A",
        relativeNumber: "13123123123",
        healthInsurance: "SV2821001402141",
        relativeMail: "chunha2411@gmail.com",
        relative: "Chồng",
        idAccount: data?.id,
      };
      await http.post("/user/data/patient/v1", profile);
      message.success("Đăng ký thành công");
      setIsRegister(false);
      navigate("/");
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Đã có lỗi xảy ra, Vui lòng thử lại"
      );
      setIsRegister(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <Spin spinning={isRegister}>
          <div className="banner">
            <div className="img">
              <div className="bg-login"></div>
              <div className="form-login">
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "3.4rem",
                    margin: "4rem 0 2rem 0",
                  }}
                >
                  LATinterface
                </span>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "1.6rem",
                  }}
                >
                  Đặt lịch hẹn làm đẹp
                </span>
                <p>Đăng ký</p>
                <form onSubmit={handleSubmit}>
                  <div className="w-full flex gap-x-2">
                    <div className="w-full ">
                      <div className="input">
                        <label htmlFor="">Tên tài khoản</label>
                        <input
                          placeholder="Nhập tài khoản..."
                          name="username"
                          required
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Điền email</label>
                        <input
                          placeholder="Nhập email..."
                          name="email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="input">
                        <label htmlFor="">Mật khẩu</label>
                        <input
                          placeholder="Nhập mật khẩu..."
                          name="password"
                          type="password"
                          required
                        />
                      </div>

                      <div className="input">
                        <label htmlFor="">Nhập lại khẩu</label>
                        <input
                          placeholder="Nhập mật khẩu..."
                          name="confirmPassWord"
                          type="password"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="input">
                        <label htmlFor="">Họ tên</label>
                        <input
                          placeholder="Nhập Họ tên..."
                          name="fullname"
                          required
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Số điện thoại</label>
                        <input
                          placeholder="Nhập Số điện thoại..."
                          name="phoneNumber"
                          required
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Tên Địa chỉ</label>
                        <input
                          placeholder="Nhập Địa chỉ..."
                          name="address"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="input" style={{ textAlign: "center" }}>
                    <button className="btn">Đăng ký</button>
                  </div>
                </form>
                <div
                  className="input"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      marginBottom: "2.5rem",
                      fontSize: "1.4rem",
                    }}
                  >
                    Bạn đã có tài khoản ? &nbsp;
                  </p>
                  <NavLink className="login-rg" to="/">
                    Đăng nhập ngay.
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default Register;
