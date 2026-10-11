import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  Boxes,
  Headset,
  LayoutGrid,
  PackageSearch,
  ShieldCheck,
  Snowflake,
  Thermometer,
  Truck,
  Warehouse,
} from 'lucide-react'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
] as const

export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Temperature-Controlled Storage',
    description:
      'Maintain suitable storage conditions for temperature-sensitive products, day after day.',
    icon: Thermometer,
  },
  {
    title: 'Refrigerated Warehousing',
    description: 'Secure and organized warehouse space for perishable inventory.',
    icon: Warehouse,
  },
  {
    title: 'Inventory Management',
    description: 'Efficient stock organization, monitoring, and tracking that keeps your records clear.',
    icon: PackageSearch,
  },
  {
    title: 'Storage & Logistics Support',
    description: 'Flexible storage and distribution coordination that adapts to your schedule.',
    icon: Truck,
  },
]

export const facilityCapabilities = [
  {
    title: 'Refrigerated storage rooms',
    description: 'Insulated chambers built to hold a steady storage environment.',
    icon: Snowflake,
  },
  {
    title: 'Organized storage areas',
    description: 'Racking and clearly laid-out aisles for orderly, easy-to-find inventory.',
    icon: LayoutGrid,
  },
  {
    title: 'Industrial refrigeration equipment',
    description: 'Dedicated plant and evaporator systems that support continuous cooling.',
    icon: Thermometer,
  },
] as const

export const reasons = [
  {
    title: 'Reliable temperature management',
    description: 'Consistent cooling and monitoring that protects product quality.',
    icon: Thermometer,
  },
  {
    title: 'Secure storage environment',
    description: 'Controlled access and careful handling for every pallet we store.',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible storage arrangements',
    description: 'Space and terms that can be adjusted as your volumes change.',
    icon: Boxes,
  },
  {
    title: 'Organized inventory handling',
    description: 'Structured receiving, placement, and dispatch of your stock.',
    icon: PackageSearch,
  },
  {
    title: 'Professional customer support',
    description: 'A clear point of contact for planning, questions, and updates.',
    icon: Headset,
  },
  {
    title: 'Quality-focused practices',
    description: 'Disciplined routines that keep storage clean, orderly, and dependable.',
    icon: BadgeCheck,
  },
] as const

export const productCategories = [
  {
    title: 'Fruits & Vegetables',
    image: '/images/product-fruits-vegetables.jpg',
    alt: 'Crates of fresh produce stacked on pallets inside a cold room',
  },
  {
    title: 'Dairy Products',
    image: '/images/product-dairy.jpg',
    alt: 'Dairy cases and cheese stacked on pallets in a refrigerated room',
  },
  {
    title: 'Meat & Poultry',
    image: '/images/product-meat-poultry.jpg',
    alt: 'Palletized packaged meat and poultry in a sanitary cold storage chamber',
  },
  {
    title: 'Seafood',
    image: '/images/product-seafood.jpg',
    alt: 'Chilled seafood packed in insulated boxes in a cold storage area',
  },
  {
    title: 'Other Temperature-Sensitive Goods',
    image: '/images/product-temperature-sensitive.jpg',
    alt: 'Sealed cartons organized on racking in a temperature-controlled aisle',
  },
] as const

export const storageTypes = [
  'Temperature-controlled storage',
  'Refrigerated warehousing',
  'Inventory management',
  'Storage & logistics support',
  'Not sure yet',
] as const
