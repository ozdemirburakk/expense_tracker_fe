import { Button, Form, Input, Modal, Select, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { SketchPicker } from "react-color";
type Mode = "new" | "edit";


const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};

function Categories() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },

    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>

        <Modal
          title={mode === "new" ? "Create New Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item label="Input">
            <Input
              name="name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="Select">
            <Select
              defaultValue={"expense"}
              onChange={e => setForm({ ...form, type: e })}
            >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Color">
            <SketchPicker
              onChange={(color) => setForm({ ...form, color: color.hex })}
            />
          </Form.Item>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </React.Fragment>
  );
}

export default Categories;
