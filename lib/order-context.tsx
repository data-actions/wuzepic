'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type FrameStyle = 'classic-black' | 'natural-oak' | 'elegant-white' | 'vintage-gold' | 'modern-walnut'

export interface FrameOption {
  id: FrameStyle
  name: string
  description: string
  price: number
  color: string
  borderWidth: number
}

export const frameOptions: FrameOption[] = [
  {
    id: 'classic-black',
    name: 'Classic Black',
    description: 'Timeless matte black finish',
    price: 29.99,
    color: '#1a1a1a',
    borderWidth: 16,
  },
  {
    id: 'natural-oak',
    name: 'Natural Oak',
    description: 'Warm natural wood grain',
    price: 39.99,
    color: '#c4a574',
    borderWidth: 20,
  },
  {
    id: 'elegant-white',
    name: 'Elegant White',
    description: 'Clean minimalist design',
    price: 29.99,
    color: '#f5f5f5',
    borderWidth: 16,
  },
  {
    id: 'vintage-gold',
    name: 'Vintage Gold',
    description: 'Classic ornate gold frame',
    price: 49.99,
    color: '#d4af37',
    borderWidth: 24,
  },
  {
    id: 'modern-walnut',
    name: 'Modern Walnut',
    description: 'Rich dark wood finish',
    price: 44.99,
    color: '#5d432c',
    borderWidth: 18,
  },
]

export type PhotoSource = 'personal' | 'official'

export interface OrderState {
  photos: string[]
  photoSource: PhotoSource
  selectedFrame: FrameStyle | null
  logoUpload: string | null
  textLeft: string
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
  setSelectedFrame: (frame: FrameStyle | null) => void
  setLogoUpload: (logo: string | null) => void
  setTextLeft: (text: string) => void
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
  selectedFrame: null,
  logoUpload: null,
  textLeft: '',
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

  const setSelectedFrame = (frame: FrameStyle | null) => {
    setOrder((prev) => ({ ...prev, selectedFrame: frame }))
  }

  const setLogoUpload = (logo: string | null) => {
    setOrder((prev) => ({ ...prev, logoUpload: logo }))
  }

  const setTextLeft = (text: string) => {
    setOrder((prev) => ({ ...prev, textLeft: text }))
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
    const frame = frameOptions.find((f) => f.id === order.selectedFrame)
    const framePrice = frame ? frame.price : 0
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
        setSelectedFrame,
        setLogoUpload,
        setTextLeft,
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
