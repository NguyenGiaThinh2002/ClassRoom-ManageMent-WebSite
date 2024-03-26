import React, { useState, useRef, useEffect } from 'react'
import { Row , Col } from 'antd'
import Header from '../../components/header/Header'
import SideBar from '../../components/sidebar/SideBar'
import Body from '../../components/body/Body'
import '../home/home.css'
export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const [open]
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  
  
  return (
    <div className='home'>
    <Row span={24}>
      <Col span={24}>
        <Header isOpen={isSidebarOpen} onClose={toggleSidebar}></Header>
      </Col>
      <Col span={24} className='home-container'>
        <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar}></SideBar>
        <Body isOpen={isSidebarOpen} ></Body>
      </Col>
      <Col span={24}>
      </Col>
    </Row>
    <Row>

    </Row>
    {/* <Col span={24} style={{ flex: '1' }}>
        <Header isOpen={isSidebarOpen} onClose={toggleSidebar}></Header>
        <Row>
          <Col span={3}>
            <SideBar isOpen={isSidebarOpen}></SideBar>
          </Col>
          <Col span={21}>
            <Body isOpen={isSidebarOpen}></Body>
          </Col>
        </Row>
      </Col> */}
    </div>
  )
}
