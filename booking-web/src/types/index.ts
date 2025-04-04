// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'partner' | 'client';
  avatar?: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  status: 'active' | 'inactive' | 'pending';
  image?: string;
}

// Booking Types
export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  commission?: number;
}

// Chat Types
export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface QuickReply {
  id: string;
  content: string;
  category: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'booking' | 'message' | 'review';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  data?: any;
}

// Review Types
export interface Review {
  id: string;
  serviceId: string;
  customerId: string;
  customerName: string;
  rating: number;
  content: string;
  timestamp: string;
  reply?: string;
}

// Partner Types
export interface Partner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  bio?: string;
  stats?: {
    totalBookings: number;
    averageRating: number;
    totalRevenue: number;
    totalCustomers: number;
  };
}