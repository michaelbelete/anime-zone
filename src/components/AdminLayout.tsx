import Link from "next/link";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
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
    children, title
}: AdminLayoutProps) => {

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items: MenuItem[] = [getItem("Home", "1", <HomeOutlined />)];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SideBar
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
                    <h1 style={{ color: "#fff", fontSize: "25px" }}>{collapsed ? 'AZ' : 'AnimeZone'}</h1>
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </SideBar>
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    <h1 style={{ padding: "20px 0px", fontSize: "30px" }}>{title}</h1>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    AnimeZone © 2023 Created by{" "}
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
