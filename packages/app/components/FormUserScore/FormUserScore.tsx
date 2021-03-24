import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  Typography,
} from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const rules = [{ required: true, message: "Required" }];

// @todo Add loading state.
// @todo Clearn form state after successful submit.
export const FormUserScore = () => {
  const handleFinish = async (values: any) => {
    fetch("http://localhost:3000/api/score/create", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        score: values.score,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(() => message.success("Score Submitted"))
      .catch((error) => message.error(error.toString()));
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Enter Your Score
      </Typography.Title>
      <Divider />
      <Form onFinish={handleFinish} {...layout}>
        <Form.Item label="Name" rules={rules} name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Score" rules={rules} name="score">
          <InputNumber max={10} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit Your Score
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};