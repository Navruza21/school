import React, { useContext, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { FaJournalWhills } from "react-icons/fa";
import {
  Button,
  Divider,
  Layout as LayoutAnt,
  Menu,
  Typography,
  theme,
} from "antd";
import { RouterContext } from "../../App";
import { RiParentFill } from "react-icons/ri";
const { Header, Sider, Content } = LayoutAnt;

export function Layout({ children }: { children: React.ReactNode }) {
  const { activePage, setActivePage } = useContext(RouterContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const labelSidebar = (label: string) => (
    <span style={{ fontWeight: "bold", fontSize: "16px" }}>{label}</span>
  );
  return (
    <LayoutAnt>
      <Sider
        style={{ minHeight: "100vh", paddingTop: "20px" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        {/* <div className="flex flex-col justify-center align-middle items-center text-left ">
          <div className="flex text-left w-[180px]">
            <Typography
              style={{
                color: "#8d959e",
                fontSize: "23px",
                fontWeight: "bold",
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              School
            </Typography>
          </div>
          <Divider
            style={{
              color: "#727272",
              backgroundColor: "#727272",
              maxWidth: "180px",
              minWidth: "180px",
              margin: "15px",
            }}
          />
        </div> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Dashboard"]}
          style={{
            // paddingTop: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
            setActivePage(key);
          }}
          items={[
            {
              key: "Dashboard",
              icon: <LuLayoutDashboard />,
              label: labelSidebar("Dashboard"),
            },
            {
              key: "Classes",
              icon: <MdGroups style={{}} />,
              label: labelSidebar("Classes"),
            },
            {
              key: "Teachers",
              icon: <FaChalkboardTeacher />,
              label: labelSidebar("Teachers"),
            },
            {
              key: "Students",
              icon: <PiStudent />,
              label: labelSidebar("Students"),
            },
            {
              key: "Jurnal",
              icon: <FaJournalWhills />,
              label: labelSidebar("Jurnal"),
            },
            {
              key: "Schedules",
              icon: <GrSchedules />,
              label: labelSidebar("Schedules"),
            },
            {
              key: "Parents",
              icon: <RiParentFill />,
              label: labelSidebar("Parents"),
            },
          ]}
        />
      </Sider>
      <LayoutAnt>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </LayoutAnt>
    </LayoutAnt>
  );
}
