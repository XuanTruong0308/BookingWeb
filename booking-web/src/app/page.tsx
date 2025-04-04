import React from 'react';
import { Button, Card, Row, Col, Typography, Space } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-header text-center py-16 bg-primary text-white">
        <Title level={1}>Welcome to Beauty Booking</Title>
        <Paragraph>Your one-stop platform for booking beauty services.</Paragraph>
        <Space>
          <Link href="/services">
            <Button type="primary" size="large">Explore Services</Button>
          </Link>
          <Link href="/bookings/new">
            <Button size="large" ghost>Book Now</Button>
          </Link>
        </Space>
      </header>

      {/* Services Section */}
      <section className="services-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center">Our Services</Title>
          <Row gutter={[16, 16]} className="mt-8">
            <Col xs={24} sm={12} lg={6}>
              <Card title="Makeup" hoverable>Professional makeup services for all occasions.</Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Dress Rental" hoverable>Wide range of dresses for rent.</Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Photography" hoverable>Capture your special moments.</Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card title="Special Combos" hoverable>Exclusive service packages.</Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section py-16">
        <div className="container mx-auto px-4 text-center">
          <Title level={2}>Book Your Appointment</Title>
          <Paragraph>Select your service, time, location, and specialist.</Paragraph>
          <Link href="/bookings/new">
            <Button type="primary" size="large">Book Now</Button>
          </Link>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center">Customer Feedback</Title>
          <Paragraph className="text-center">See what our customers are saying about us!</Paragraph>
          <Row gutter={[16, 16]} className="mt-8">
            <Col xs={24} sm={12} lg={8}>
              <Card>"Amazing service! Highly recommend."</Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card>"The staff was very professional and friendly."</Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card>"Great experience, will book again!"</Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer py-8 bg-primary text-white text-center">
        <Paragraph>Contact us: Hotline, Chat, FAQ</Paragraph>
        <Paragraph>© 2023 Beauty Booking. All rights reserved.</Paragraph>
      </footer>
    </div>
  );
}
