import { Form, Input, Radio, Select } from "antd";
import React from "react";

const BookingForm = ({
  form,
  service,
  handleFinish,
  employeeOpts,
  timeRange,
  handleClose,
}) => {
  return (
    <Form form={form} onFinish={handleFinish} className="py-10">
      <div className="w-full flex justify-center items-start gap-x-7">
        <div className="w-full">
          <label>Dịch vụ</label>
          <Form.Item
            required
            name={"service"}
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
          >
            <Input
              placeholder=""
              className="h-20"
              value={service?.service_name}
              disabled
            />
          </Form.Item>
          <label>Chọn nhân viên</label>

          <Form.Item
            required
            name={"employee"}
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
          >
            <Select
              style={{ height: "50px" }}
              className="select_custom"
              options={employeeOpts}
              placeholder="Chọn nhân viên"
            />
          </Form.Item>
          <label>Chọn thời gian</label>
          <Form.Item
            required
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
            name={"time"}
          >
            <Radio.Group
              options={timeRange}
              optionType="button"
              buttonStyle="outline"
            />
          </Form.Item>
          <label>CSKH</label>
          <Form.Item
            label=""
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
            name={"area"}
          >
            <Select
              style={{ height: "50px" }}
              className="select_custom"
              options={[
                {
                  label: "Tại nhà",
                  value: "Tại nhà",
                },
                {
                  label: "Đến cơ sở",
                  value: "Đến cơ sở",
                },
              ]}
              placeholder="Chọn cơ sở"
            />
          </Form.Item>
        </div>
        <div className="w-full">
          <label>Họ tên khách hàng</label>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
            name={"fullname"}
          >
            <Input placeholder="Họ tên khách hàng" className="h-20" />
          </Form.Item>
          <label>Email</label>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
            name={"email"}
          >
            <Input placeholder="phone" className="h-20" />
          </Form.Item>
          <label>Số điện thoại</label>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
            name={"phoneNumber"}
          >
            <Input placeholder="Số điện thoại" className="h-20" />
          </Form.Item>
          <label>Địa chỉ</label>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng chọn trường này" }]}
            name={"address"}
          >
            <Input placeholder="Địa chỉ" className="h-20" />
          </Form.Item>
        </div>
      </div>
      <div className="space-x-6 flex justify-end">
        <button
          onClick={handleClose}
          type="button"
          className="px-6 py-3 border border-gray-300 rounded"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-6 py-3 border border-green-500 rounded text-green-500"
        >
          Thanh toán
        </button>
      </div>
    </Form>
  );
};

export default BookingForm;
