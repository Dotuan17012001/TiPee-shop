import { Button, Divider, Form, Input, message, notification } from "antd";
import "../register/register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/apiService";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const {email, password} = values;
    setIsRegister(true);
    const res = await loginUser(email, password);
    console.log("check", res)
    setIsRegister(false);
    if (res?.data) {
      localStorage.setItem('access_token',res.data.access_token)
      dispatch(doLoginAction(res.data.user))
      message.success("Đăng nhập thành công!");
      navigate("/");
    }else{
      notification.error({
        message: `Có lỗi xảy ra`,
        description:
          res.message && res.message.length > 0 ? res.message : 'Có lỗi',
        duration: 3,
      });
    }
    
  };

  return (
    <div className="register-page">
    <main className="main">
        <div className="container">
            <section className="wrapper">
                <div className="heading">
                    <h2 className="text text-large">Đăng nhập Tài Khoản</h2>
                    <Divider />
                </div>
                <Form
                    name="basic"
                    // style={{ maxWidth: 600, margin: '0 auto' }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    
                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }} //whole column
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                    // wrapperCol={{ offset: 6, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit" loading={isRegister}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Divider>Or</Divider>
                    <p className="text text-normal">Chưa có tài khoản ?
                        <span>
                            <Link to='/register' > Đăng ký </Link>
                        </span>
                    </p>
                </Form>
            </section>
        </div>
    </main>
</div>
  );
};

export default LoginPage;
