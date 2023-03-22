import Link from "next/link";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type AdminLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const { Header, Content, Footer, Sider: SideBar } = Layout;

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
}: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items: MenuItem[] = [getItem("Home", "1", <HomeOutlined />)];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar
        trigger={null}
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 100,
            margin: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#fff", fontSize: "25px" }}>
            Anime<span style={{ color: "yellow" }}>Zone</span>
          </h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </SideBar>
      <Layout className="site-layout">
        <Header style={{ padding: "0px 20px", background: colorBgContainer }}>
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
            style={{ cursor: "pointer", fontSize: "20px" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content style={{ margin: "0 16px", padding: "10px" }}>
          <h1 style={{ padding: "20px 0px", fontSize: "30px" }}>{title}</h1>
          <div
            style={{
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", marginTop: "20px" }}>
          AnimeZone © 2023 Created by&nbsp;
          <Link
            href="https://www.linkedin.com/in/michael-belete-8600a3176/"
            target="_blank"
          >
            Michael Belete
          </Link>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
