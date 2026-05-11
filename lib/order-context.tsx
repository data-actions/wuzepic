'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type FrameSize = 'small' | 'medium' | 'large'
export type FrameColor = 'classic-black' | 'natural-oak' | 'elegant-white' | 'premium-yellow' | 'premium-blue'
export type FrameStyle = FrameColor

export interface FrameSizeOption {
  id: FrameSize
  name: string
  dimensions: string
}

export interface FrameOption {
  id: FrameColor
  name: string
  category: 'Standard' | 'Premium'
  color: string
  borderWidth: number
}

export interface FramePricing {
  small: number
  medium: number
  large: number
}

export const framePricing: Record<'standard' | 'premium', FramePricing> = {
  standard: {
    small: 29,
    medium: 49,
    large: 79,
  },
  premium: {
    small: 49,
    medium: 69,
    large: 99,
  },
}

export const frameSizeOptions: FrameSizeOption[] = [
  {
    id: 'small',
    name: 'Small',
    dimensions: '8 x 10',
  },
  {
    id: 'medium',
    name: 'Medium',
    dimensions: '11 x 14',
  },
  {
    id: 'large',
    name: 'Large',
    dimensions: '18 x 22',
  },
]

export const frameOptions: FrameOption[] = [
  {
    id: 'classic-black',
    name: 'Classic Black',
    category: 'Standard',
    color: '#1a1a1a',
    borderWidth: 16,
  },
  {
    id: 'natural-oak',
    name: 'Natural Oak',
    category: 'Standard',
    color: '#c4a574',
    borderWidth: 20,
  },
  {
    id: 'elegant-white',
    name: 'Elegant White',
    category: 'Standard',
    color: '#f5f5f5',
    borderWidth: 16,
  },
  {
    id: 'premium-yellow',
    name: 'Premium Yellow',
    category: 'Premium',
    color: '#fecf08',
    borderWidth: 24,
  },
  {
    id: 'premium-blue',
    name: 'Premium Blue',
    category: 'Premium',
    color: '#172651',
    borderWidth: 24,
  },
]

export type PhotoSource = 'personal' | 'official'

export interface OrderState {
  photos: string[]
  photoSource: PhotoSource
  selectedFrameSize: FrameSize | null
  selectedFrame: FrameStyle | null
  logoUpload: string | null
  textRight: string
  selectedDate: Date | null
  photoScale: number
  shipping: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    phone: string
  }
  giftWrap: boolean
  giftMessage: string
  fanClubSignup: boolean
}

interface OrderContextType {
  order: OrderState
  addPhoto: (photo: string) => void
  removePhoto: (index: number) => void
  setPhotoSource: (source: PhotoSource) => void
  setSelectedFrameSize: (size: FrameSize | null) => void
  setSelectedFrame: (frame: FrameStyle | null) => void
  setLogoUpload: (logo: string | null) => void
  setTextRight: (text: string) => void
  setSelectedDate: (date: Date | null) => void
  setPhotoScale: (scale: number) => void
  setShipping: (shipping: OrderState['shipping']) => void
  setGiftWrap: (giftWrap: boolean) => void
  setGiftMessage: (message: string) => void
  setFanClubSignup: (signup: boolean) => void
  resetOrder: () => void
  getTotalPrice: () => number
}

const initialOrder: OrderState = {
  photos: [],
  photoSource: 'personal',
  selectedFrameSize: 'medium',
  selectedFrame: null,
  logoUpload: null,
  textRight: '',
  selectedDate: null,
  photoScale: 1,
  shipping: {
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  },
  giftWrap: false,
  giftMessage: '',
  fanClubSignup: false,
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderState>(initialOrder)

  const addPhoto = (photo: string) => {
    setOrder((prev) => ({ ...prev, photos: [photo] }))
  }

  const removePhoto = (index: number) => {
    setOrder((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const setPhotoSource = (source: PhotoSource) => {
    setOrder((prev) => ({ ...prev, photoSource: source, photos: [] }))
  }

  const setSelectedFrameSize = (size: FrameSize | null) => {
    setOrder((prev) => ({ ...prev, selectedFrameSize: size }))
  }

  const setSelectedFrame = (frame: FrameStyle | null) => {
    setOrder((prev) => ({ ...prev, selectedFrame: frame }))
  }

  const setLogoUpload = (logo: string | null) => {
    setOrder((prev) => ({ ...prev, logoUpload: logo }))
  }

  const setTextRight = (text: string) => {
    setOrder((prev) => ({ ...prev, textRight: text }))
  }

  const setSelectedDate = (date: Date | null) => {
    setOrder((prev) => ({ ...prev, selectedDate: date }))
  }

  const setPhotoScale = (scale: number) => {
    setOrder((prev) => ({ ...prev, photoScale: scale }))
  }

  const setShipping = (shipping: OrderState['shipping']) => {
    setOrder((prev) => ({ ...prev, shipping }))
  }

  const setGiftWrap = (giftWrap: boolean) => {
    setOrder((prev) => ({ ...prev, giftWrap }))
  }

  const setGiftMessage = (message: string) => {
    setOrder((prev) => ({ ...prev, giftMessage: message }))
  }

  const setFanClubSignup = (signup: boolean) => {
    setOrder((prev) => ({ ...prev, fanClubSignup: signup }))
  }

  const resetOrder = () => {
    setOrder(initialOrder)
  }

  const getTotalPrice = () => {
    let framePrice = 0
    
    if (order.selectedFrame && order.selectedFrameSize) {
      const frame = frameOptions.find((f) => f.id === order.selectedFrame)
      const category = frame?.category === 'Premium' ? 'premium' : 'standard'
      framePrice = framePricing[category][order.selectedFrameSize]
    }
    
    const giftWrapPrice = order.giftWrap ? 5.99 : 0
    const fanClubPrice = order.fanClubSignup ? 99.0 : 0
    return framePrice + giftWrapPrice + fanClubPrice
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        addPhoto,
        removePhoto,
        setPhotoSource,
        setSelectedFrameSize,
        setSelectedFrame,
        setLogoUpload,
        setTextRight,
        setSelectedDate,
        setPhotoScale,
        setShipping,
        setGiftWrap,
        setGiftMessage,
        setFanClubSignup,
        resetOrder,
        getTotalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}
